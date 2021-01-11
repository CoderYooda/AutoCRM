<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Session;

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
    protected $redirectTo = '/store';

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

    public function password()
    {
        return 'password';
    }

    public function redirectTo()
    {
        if(Auth::user()->roles->first() && Auth::user()->roles->first()->name == 'Суперадмин') {
            return '/admin';
        }
        if(Auth::user()->roles->first() && Auth::user()->roles->first()->name == 'Партнёр') {
            return '/member';
        }
        return '/store';
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);
        $user = User::where('phone', $request['phone'])->first();

        if($user && $user->banned_at != null){
            return redirect()->back()->with('banned', ['Выша учетная запись была заблокирована']);
        }

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
        } else {
            $this->incrementLoginAttempts($request);
            if($user){
                throw ValidationException::withMessages([
                    $this->password() => [trans('auth.wrong_pass')],
                ]);
            } else {
                return $this->sendFailedLoginResponse($request);
            }
        }
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

    public function authenticated(Request $request, $user)
    {
        if(!$user->current_store && isset($user->partner)) {
            $user->update(['current_store' => $this->partner->store_id]);
        }
    }

}
