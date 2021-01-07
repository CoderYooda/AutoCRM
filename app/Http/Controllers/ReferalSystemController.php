<?php

namespace App\Http\Controllers;

use App\Http\Requests\Partner\ReferalPartnerRequest;
use App\Models\Referal;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ReferalSystemController extends Controller
{
    public static function referalPartnerDialog(Request $request)
    {

        $tag = 'referalPartnerDialog';

        $id = $request['refer_id'] ?? null;
        $referal = $id ? User::where('id', $id)->whereHas(
            'roles', function($q){
            $q->where('name', 'Реферальный партнёр');
        })->get() : null;

        $view = view(get_template() . '.referal.dialog.form_referal', compact('referal', 'request'))
            ->with('class', $tag)
            ->with('refer', $request['refer'])
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view
        ];

        return response()->json($response);
    }

    public function store(ReferalPartnerRequest $request)
    {
        DB::transaction(function () use($request) {
            $user = User::create([
                'name' => $request['name'],
                'phone' => $request['phone'],
                'company_id' => 1,
                'password' => Hash::make($request['password']),
            ]);

            $role = Role::where('name', 'Реферальный партнёр')->first();

            $refer = new Referal();
            $refer->user_id = $user->id;
            $refer->fill($request->only($refer->fields));
            $refer->save();

            $user->assignRole($role);
            if ($request['send_sms']) {
                SmsController::sendSMS($request['phone'], 'Вы стали участником партнерской программы BBCRM. Логин - ' . $request['phone'] . ', пароль - ' . $request['password']);
            }
        });
        return response()->json([
            'event' => 'ReferStored',
        ], 200);


    }
}