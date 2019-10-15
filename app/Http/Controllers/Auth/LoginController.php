<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function attemptLogin(Request $request)
    {
        //Try with email AND username fields
        if (Auth::attempt([
            'phone' => $request['phone'],
            'password' => $request['password']
        ],$request->has('remember'))
        ){
            return true;
        }
        return false;
    }

    protected function validateLogin(Request $request)
    {
        $request['phone'] = str_replace(array('(', ')', ' ', '-', '+'), '', $request['phone']);
        $request->validate([
            'phone' => ['required', 'regex:/[0-9]{10}/', 'digits:11'],
            'password' => 'required|string',
        ]);
    }

    public function username()
    {
        return 'phone';
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);

        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            if($request->expectsJson()){
                $request->session()->regenerate();
                $this->clearLoginAttempts($request);
                return response()->json([
                    'status' => 'success'
                ]);
            }
            return $this->sendLoginResponse($request);
        }

        $this->incrementLoginAttempts($request);


        return $this->sendFailedLoginResponse($request);
    }

    public function showLoginForm(Request $request){
        if($request->expectsJson()){
            $content = view('auth.ajax_login');
            return response()->json([
                'html' => $content->render()
            ]);
        } else {
            return view('auth.login');
        }

    }
}
