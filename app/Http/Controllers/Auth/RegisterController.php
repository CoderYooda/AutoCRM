<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\SettingsController;
use App\Models\Cashbox;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Store;
use App\Models\User;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Models\Company;
use App\Http\Controllers\SmsController;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CashboxController;
use App\Http\Requests\CashboxRequest;

class RegisterController extends Controller
{
    use RegistersUsers;

    protected $redirectTo = '/';

    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function validator($request)
    {
        $request['phone'] = str_replace(array('(', ')', ' ', '-', '+'), '', $request['phone']);
        $request['phone'] = 7 . substr($request['phone'],1);
        $request['name'] = $request['fio'];
        //SmsController::sendTo($data['phone']);
        return Validator::make($request->all(), [
            'fio' => ['required', 'string', 'min:5', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'regex:/[0-9]{10}/', 'digits:11', 'unique:users'],
//            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    public function redirectTo(){
        return '/';
    }

    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $validation = $this->validator($request);

        if($request->expectsJson()){
            if($validation->fails()){
                if(request()->expectsJson()){
                    return response()->json(['messages' => $validation->errors()],422);
                }
            }
            if(!SmsController::smsConfirmed($request)){
                if(SmsController::isSmsBlocked($request)){
                    return response()->json([
                        'status' => 'error',
                        'service_message' => 'Слишком частая отправка сообщений. Телефон заблокирован'
                    ],422);
                } else {
                    $sms = SmsController::sendTo($request['phone']);
                    return response()->json([
                        'sms' => $sms,
                        'phone' => $request['phone']
                    ],200);
                }
            } else {
                event(new Registered($user = $this->create($request->all())));
                $this->guard()->login($user);

                $redirect = '/';
                $this->registered($request, $user) ?: $redirect = $this->redirectPath();

                return response()->json(['redirect' => $redirect],200);
            }
        } else {
            $validation->validate();
        }

        if(SmsController::smsConfirmed($request)){
            event(new Registered($user = $this->create($request->all())));
            $this->guard()->login($user);
            return $this->registered($request, $user) ?: redirect($this->redirectPath());
        } else{
            return redirect()->back()->with('sms', ['SMS не было подтвеждено']);
        }
    }

    public function smsRetry(Request $request){
        SmsController::smsRetry($request['sms_id']);
    }

    protected function create(array $data)
    {

        $name = explode( ' ', $data['name'] );

        if(count($name) >= 2){
            $name = $name[1];
        } else {
            $name = $data['name'];
        }

        $user = User::create([
            'name' => $name,
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
        ]);

        $company = new Company();
        $company->name = 'Новая компания';
        $company->payed_days = Carbon::now()->timestamp + (86400 * 14);
        $company->save();

        $user->company()->associate($company);
        $user->save();

        $roles = RoleController::createStartRoles($company);
	    $user->assignRole($roles['main']);
        SettingsController::createCompanySettingsPack($company, $roles['default']);

        $store = new Store();
        $store->company_id = $company->id;
        $store->type = 'casual';
        $store->locked = 0;
        $store->name = 'Мой магазин';
        $store->save();

        $user->current_store = $store->id;
        $user->save();

        $cashbox = new Cashbox();
        $cashbox->company_id = $company->id;
        $cashbox->manager_id = $user->id;
        $cashbox->name = 'Основная касса';
        $cashbox->balance = 0.00;
        $cashbox->save();

        $partner = new Partner();
        $partner->type = 0;
        $partner->user_id = $user->id;
        $partner->category_id = 5; //Сотрудник
        $partner->fio = $data['fio'];
        $partner->company_id = $company->id;
        $partner->store_id = $store->id;
        $phones_str = '';
        foreach($partner->phones as $phone){
            $phones_str .= $phone->number;
        }
        $partner->save();

        Company::flushEventListeners();

        Artisan::call('categories:init', ['company' => $company->id]);

        return $user;
    }

}
