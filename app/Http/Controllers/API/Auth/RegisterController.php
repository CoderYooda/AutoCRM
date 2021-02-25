<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingsController;
use App\Models\Cashbox;
use App\Models\Company;
use App\Models\Partner;
use App\Models\SMS;
use App\Models\SmsConfirmation;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\System\SmsController;
use Illuminate\Support\Facades\Hash;

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
        //SmsController::sendTo($data['phone']);
        return Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:5', 'max:255'],
            'surname' => ['required', 'string', 'min:5', 'max:255'],
            'patronymic' => ['required', 'string', 'min:5', 'max:255'],
            'phone' => ['required', 'regex:/[0-9]{10}/', 'digits:11', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    public function register(Request $request)
    {
        $validation = $this->validator($request);

        if($validation->fails()){
            if(request()->expectsJson()){
                return response()->json(['messages' => $validation->errors()],422);
            }
        }
        $confirmed = $request['sms_code'] !== null ? SmsController::confirmSms($request) : false;

        if(!$confirmed){
            # Если телефон не подтвержден

            if($this->isSmsBlocked($request)){
                # Если телефон заблокирован

                return response()->json([
                    'status' => 'error',
                    'service_message' => 'Слишком частая отправка сообщений. Телефон заблокирован'
                ],422);
            } else {
                # Если телефон не заблокирован
                $sms = $this->sendConfirmSms($request['phone']);
                return response()->json([
                    'needSmsConfirm' => true,
                ],422);
            }
        } else {
            # Если телефон подтвержден

            //event(new Registered($user = $this->create($request->all())));

            $user = $this->create($request->all());
            $this->guard()->login($user);

//            $redirect = '/';
//            $this->registered($request, $user) ?: $redirect = $this->redirectPath();

            return response()->json(['token' => $user->api_token, 'user' => $user],200);
        }

//        if(SmsController::smsConfirmed($request)){
//            event(new Registered($user = $this->create($request->all())));
//            $this->guard()->login($user);
//            return $this->registered($request, $user) ?: redirect($this->redirectPath());
//        } else{
//            return redirect()->back()->with('sms', ['SMS не было подтвеждено']);
//        }
    }
    private function sendConfirmSms($phone)
    {
        $confirm_code = rand(10000, 99999);
        $smsru = new SMS(env('SMS_RU_CODE'));
        $data = new \stdClass();
        $data->to = $phone;
        $data->text = $confirm_code;
        $data->from = 'BB-CRM';
        $data->test = 0;
        $sms = $smsru->send_one($data);
        if ($sms->status == "OK") {
            $sms_confirmation = SmsConfirmation::firstOrNew(['ip' => request()->ip(), 'phone' => $phone]);

            if ($sms_confirmation->exists) {
                $sms_confirmation->attempts = $sms_confirmation->attempts + 1;
                if ($sms_confirmation->attempts > 3) {
                    $sms_confirmation->isblocked = true;
                }
            }

            $sms_confirmation->phone = $phone;
            $sms_confirmation->code = $confirm_code;
            $sms_confirmation->status = $sms->status;
            $sms_confirmation->status_code = $sms->status_code;
            $sms_confirmation->sms_id = $sms->sms_id;
            $sms_confirmation->cost = $sms->cost;
            $sms_confirmation->ip = request()->ip();

            $sms_confirmation->save();
        }
        return $sms;
    }

    private function isSmsConfirmed($request)
    {
        $sms = SmsConfirmation::where('ip', $request->ip())->where('phone', $request['phone'])->first();

        return $sms != null && $sms->confirmed;
    }

    private function isSmsBlocked($request){
        $sms = SmsConfirmation::where('ip', $request->ip())->where('phone', $request['phone'])->first();
        return $sms != null && $sms->isblocked;
    }

    protected function create(array $data)
    {
//        $name = explode( ' ', $data['name'] );

//        if(count($name) >= 2){
//            $name = $name[1];
//        } else {
//            $name = $data['name'];
//        }

        $user = User::create([
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
        $partner->fio = $data['surname'] . ' ' . $data['name'] . ' ' . $data['patronymic'];
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
