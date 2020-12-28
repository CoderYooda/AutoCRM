<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

namespace App\Traits;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;


trait LoginUser
{
    use RedirectsUsers, ThrottlesLogins;
    /**
     * Handle a Authenticates the User.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
//    public function login(Request $request)
//    {
//        $this->validateLogin($request);
//
//        if ($this->attemptLogin($request)) {
//            return $this->successfulLogin($request);
//        }
//        return $this->failedLogin($request);
//    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            'phone' => 'required',
            'password' => 'required',
        ]);
    }
    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        //Try with email AND username fields
        if (Auth::attempt([
                'phone' => $request['username'],
                'password' => $request['password']
            ],$request->has('remember'))
            ){
            return true;
        }
        return false;
    }

    protected function incrementLoginAttempts(Request $request)
    {
        $this->limiter()->hit(
            $this->throttleKey($request), $this->decayMinutes() * 60
        );
    }

    /**
     * This is executed when the user successfully logs in
     *
     * @var Request $request
     * @return Reponse
     */
    protected function successfulLogin(Request $request){
        return redirect($this->redirectTo);
    }

    /**
     * This is executed when the user fails to log in
     *
     * @var Request $request
     * @return Reponse
     */
    protected function failedLogin(Request $request){
        return redirect()->back()->withErrors(['password' => 'You entered the wrong username or password']);
    }

}
