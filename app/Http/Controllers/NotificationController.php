<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public static function headerNotifications(){
        return view('template.interface.notifications.head');
    }
}
