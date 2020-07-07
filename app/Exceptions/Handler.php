<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Models\Exceptions;
use Auth;

class Handler extends ExceptionHandler
{

    protected $dontReport = [
        //
    ];

    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function report(Exception $exception)
    {
        $user = Auth::user();

        $exc = new Exceptions();
        $exc->message = $exception->getMessage();
        $exc->session = serialize(session()->all());
        if($user && $user !== null){
            $exc->company_id = $user->id;
            $exc->user_id = $user->company->id;
        }
        $exc->save();

        parent::report($exception);

    }

    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }
}
