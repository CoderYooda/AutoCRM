<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\PasswordRequest;
use App\Models\Partner;
use App\Models\Payment;
use App\Models\SalarySchema;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Contracts\Auth\Authenticatable as SystemAuth;
use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = 'Пользователь';
        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }

        if(empty($request['id'])){
            $request['id'] = Auth::user()->partner->id;
        }

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'profile';
        }

        $classname = $request['active_tab'] . 'Tab';
        $user = self::getUser($request);

        if(!$user){
            abort(404);
        }
        $content = self::$classname($request, $user);

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

    public function whoami(){
        return Auth::check() ? Auth::user() : abort(403);
    }

    public function edit(Request $request)
    {
        $page = 'Редактирование пользователя';
        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }

        $editmode = true;

        if(empty($request['id'])){
            $request['id'] = Auth::user()->partner->id;
        }

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'profile';
        }

        $classname = $request['active_tab'] . 'Tab';

        $user = self::getUser($request);

        if(!$user){
            abort(404);
        }

        $content = view(get_template() . '.user.tabs.profile', compact('request', 'editmode', 'user'));

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

    public function passwordEdit(Request $request)
    {
        $page = 'Смена пароля';

        if(empty($request['id'])){
            $request['id'] = Auth::user()->partner->id;
        }

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'profile';
        }

        $classname = $request['active_tab'] . 'Tab';

        $user = self::getUser($request);

        if(!$user){
            abort(404);
        }

        $content = view(get_template() . '.user.tabs.password', compact('request',  'user'));

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

    public function passwordStore(PasswordRequest $request)
    {
        $user = Auth::user();
        if(Hash::check($request->old_password, $user->password)){
            $user->password = bcrypt($request->password);
            $user->save();
            return response()->json([
                'type' => 'success',
                'messages' => 'Пароль обновлен',
                'redirect' => '/user'
            ], 200);
        } else {
            return response()->json([
                'type' => 'error',
                'messages' => ['old_password' => ['Пароль не верен']]
            ], 422);
        }
    }



    public static function profileTab($request, $user)
    {
        return view(get_template() . '.user.tabs.profile', compact('request', 'user'));
    }

    public static function schemeTab($request)
    {
        return view(get_template() . '.user.tabs.scheme', compact('request'));
    }

    public static function premiumTab($request)
    {
        return view(get_template() . '.user.tabs.premium', compact('request'));
    }

    public static function payoutTab($request)
    {
        return view(get_template() . '.user.tabs.payout', compact('request'));
    }

    public static function salesTab($request)
    {
        return view(get_template() . '.user.tabs.sales', compact('request'));
    }

    public static function vehiclesTab($request)
    {
        return view(get_template() . '.user.tabs.vehicles', compact('request'))
            ->with('vehicles', Auth::user()->partner->vehicles);
    }

    public static function serviceTab($request)
    {
        $payments = Payment::owned()->where('type', 'pay_to_store')->orderBy('id', 'DESC')->get();

        foreach ($payments as $payment){
            $payment->freshStatus();
        }

        return view(get_template() . '.user.tabs.service', compact('request', 'payments'));
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
        $partner = Partner::owned()->with('passport')->where(function($q) use ($request){
            $q->where('id', $request['id']);
        })->first();
        return $partner;
    }

    public function getChannel(){ //Выделение канала для сокет вещания

        //dd(Auth::check());

        if(Auth::check()){
            $user = Auth::user();

            $channels = [
                'app_base_channel:company_' . $user->company()->first()->id . '_channel',
                'app_base_channel:user_' . $user->id . '_channel'
            ];
            return response()->json([
                'channels' => $channels
            ]);
        } else {
            return response()->json([
                'channels' => []
            ]);
        }

    }

    public static function headerUser(){
        return view('template.interface.user.head')->render();
    }

    public static function getAllUsersList()
    {
        if(!Gate::allows('Суперадмин')){
            return PermissionController::closedResponse('Вам запрещено это действие.');
        } else {
            $users = User::all();
            $list = view(get_template() . '.system.admin_userlist', compact('users'))->render();
            return $list;
        }
    }

    public function authByUser(Request $request){
        $user = User::find($request->id);
        Auth::loginUsingId($user->id, TRUE);
        Session::flush();
    }
}
