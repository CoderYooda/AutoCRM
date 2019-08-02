<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FR;

class HelpController extends Controller
{
    public static function selectTarget()
    {
        $target = 'ajax-content';
        if(request('target') != NULL){
            $target = request('target');
        }
        return $target;
    }

    public static function setActive($path)
    {
        return FR::is($path . '*') ? 'active' :  '';
    }
}
