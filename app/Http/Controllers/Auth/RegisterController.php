<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Models\Company;
use App\Http\Controllers\SmsController;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

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
            'fio' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'regex:/[0-9]{10}/', 'digits:11', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    public function redirectTo(){
        return '/';
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
                return response()->json(['sms' => $sms],200);
            }
        } else {
            $validation->validate();
        }
        if(SmsController::smsConfirmed($request)){
            event(new Registered($user = $this->create($request->all())));
            $this->guard()->login($user);
            return $this->registered($request, $user) ?: redirect($this->redirectPath());
        } else{
            return false;
        }
    }

    protected function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
        ]);

        $company = new Company();
        $company->name = 'Новая компания';
        $company->save();

        $user->company()->associate($company);
        $user->save();
        return $user;
    }

}
