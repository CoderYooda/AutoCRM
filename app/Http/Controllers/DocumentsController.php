<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentsController extends Controller
{
    public function document(Request $request)
    {
        $names = [
            'out-warrant' => 'documents.out-warrant',
            'client-order' => 'documents.client-order',
            'provider-order' => 'documents.provider-order',
            'statistic-result' => 'documents.statistic-result',
            'shipment-score' => 'documents.invoice-for-payment',
            'shipment-upd' => 'documents.upd'
        ];

        $view = view($names[$request->doc], compact('request'));

        if($request->doc == 'shipment-upd') {
            $ids = collect(json_decode($request->data))->pluck('id');

            $view->with('company', Auth::user()->company);
            $view->with('products', Article::whereIn('id', $ids)->get());
        }

        return $view;
    }
}
