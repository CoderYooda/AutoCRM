<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Partner;
use App\Models\SalarySchema;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Pagination\Paginator;
use Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = 'Пользователь';
        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'profile';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);


        $target = HC::selectTarget();
        if($request->expectsJson() && $request['search'] === NULL){
            return response()->json([
                'target' => $target,
                'page' => $page,
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }

    }

    public static function profileTab($request)
    {
        return view('user.tabs.profile', compact('request'));
    }

    public static function schemeTab($request)
    {
        return view('user.tabs.scheme', compact('request'));
    }

    public static function premiumTab($request)
    {
        return view('user.tabs.premium', compact('request'));
    }

    public static function payoutTab($request)
    {
        return view('user.tabs.payout', compact('request'));
    }

    public static function salesTab($request)
    {
        return view('user.tabs.sales', compact('request'));
    }

    public function saveSalarySchemaToUser(Request $request)
    {
        $user = Partner::where('id', $request['partner_id'])->first();

        if($request['schema'] != null){
            $data = [];
            foreach($request['schema'] as $schema){
                $data[$schema['id']] = [ 'value' =>  $schema['value']];
            }
            $user->salarySchemas()->sync($data);
        }
    }



    public static function getUser($request)
    {
        $user = Partner::owned()->with('passport')->where(function($q) use ($request){
            $q->where('id', $request['id']);
        })->first();
        return $user;
    }

    public function getChannel(){ //Выделение канала для сокет вещания
            $user = Auth::user();
            $channels = [
                'app_base_channel:company_' . $user->company()->first()->id . '_channel',
                'app_base_channel:user_' . $user->id . '_channel'
            ];
            return response()->json([
                'channels' => $channels
            ]);

    }

    public static function headerUser(){
        return view('template.interface.user.head')->render();
    }
}
