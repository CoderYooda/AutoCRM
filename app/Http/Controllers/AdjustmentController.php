<?php

namespace App\Http\Controllers;

use App\Models\Adjustment;
use Illuminate\Http\Request;

class AdjustmentController extends Controller
{
    public static function clientorderDialog($request)
    {
        $tag = 'adjustmentDialog';

        if($request['client_order_id']){
            $client_order = Adjustment::where('id', (int)$request['client_order_id'])->first();
            $tag .= $client_order->id;
        } else {
            $client_order = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view('client_orders.dialog.form_client_order', compact( 'client_order', 'stores',  'request'))->render()
        ]);
    }
}
