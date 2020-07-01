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

            $selected_products = json_decode($request->data);

            $sorted_products = [
                'total_price' => 0,
                'total_nds' => 0,
            ];

            foreach($selected_products as $product) {
                $sorted_products[$product->id] = [
                    'count' => $product->count,
                    'price' => $product->price
                ];

                $sorted_products['total_price'] += $product->price * $product->count;
                $sorted_products['total_nds'] += ($product->price * $product->count) / 100 * 20;
            }

            $view->with('company', Auth::user()->company);
            $view->with('products', Article::whereIn('id', array_keys($sorted_products))->get());
            $view->with('sorted_products', $sorted_products);
        }

        return $view;
    }
}
