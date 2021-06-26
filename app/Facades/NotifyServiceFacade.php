<?php
/**
 * Created by PhpStorm.
 * User: daddy
 * Date: 23.06.2021
 * Time: 13:22
 */

namespace App\Facades;


use Illuminate\Support\Facades\Facade;

class NotifyServiceFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'notify.service';
    }
}
