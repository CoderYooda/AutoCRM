<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\SettingsController;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Store;
use App\Models\User;
use App\Http\Controllers\Controller;
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
                $sms = SmsController::sendTo($request['phone']);
                return response()->json([
                    'sms' => $sms,
                    'phone' => $request['phone']
                ],200);
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
        $company->payed_days = 14;
        $company->save();

        $user->company()->associate($company);
        $user->save();
        $role = RoleController::createStartRoles($company);
	    $user->assignRole($role);

//	    #Создаём первую кассу###########################################################
//        $cashbox = new CashboxController();
//        $fake_request = new CashboxRequest();
//        $fake_request['name'] = 'Основная касса';
//        $fake_request['manager_id'] = $user->id;
//        $fake_request['company_id'] = $company->id;
//        $cashbox->store($fake_request);
//	    SettingsController::createCompanySettingsPack($company, $role);
//	    #Конец##########################################################################
	    
        $store = new Store();
        $store->company_id = $company->id;
        $store->type = 'casual';
        $store->locked = 0;
        $store->name = 'Мой магазин';
        $store->save();

        $partner = new Partner();
        $partner->isfl = true;
        $partner->user_id = $user->id;
        $partner->category_id = 5; //Сотрудник
        $partner->fio = $data['fio'];
        $partner->company_id = $company->id;
        $partner->store_id = $store->id;
        $partner->save();

        Company::flushEventListeners();

        Artisan::call('categories:init', ['company' => $company->id]);

        return $user;
    }

}
