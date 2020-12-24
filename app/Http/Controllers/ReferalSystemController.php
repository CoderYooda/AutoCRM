<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}
