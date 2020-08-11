<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Shipment;
use App\Models\Warrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentsController extends Controller
{
    public function document(Request $request)
    {
        $names = [
            'out-warrant' => 'documents.out-warrant',
            'in-warrant' => 'documents.in-warrant',
            'client-order' => 'documents.client-order',
            'provider-order' => 'documents.provider-order',
            'statistic-result' => 'documents.statistic-result',
            'shipment-score' => 'documents.invoice-for-payment',
            'shipment-upd' => 'documents.upd'
        ];

        $view = view($names[$request->doc], compact('request'));

        if($request->doc == 'out-warrant' || $request->doc == 'in-warrant') {

            $view->with('company', Auth::user()->company)
                ->with('warrant', Warrant::find($request->id));
        }
        else if($request->doc == 'shipment-upd' || $request->doc == 'shipment-score') {

            $selected_products = json_decode($request->data);

            $sorted_products = [
                'price_without_nds' => 0,
                'price_with_nds' => 0,
                'nds' => 0
            ];

            foreach($selected_products as $product) {
                $sorted_products[$product->id] = [
                    'count' => $product->count,
                    'price_with_nds' => $product->price,
                    'price_without_nds' => $product->price - ($product->price / 100 * 20),
                    'nds' => ($product->price / 100 * 20)
                ];

                $total_price = ($product->price * $product->count);
                $nds = ($total_price / 100 * 20);

                $sorted_products['price_without_nds'] += $total_price - $nds;
                $sorted_products['price_with_nds'] += $total_price;
                $sorted_products['nds'] += $nds;
            }

            $view->with('company', Auth::user()->company)
                ->with('products', Article::whereIn('id', array_keys($sorted_products))->get())
                ->with('sorted_products', $sorted_products)
                ->with('shipment', Shipment::with('company')->find($request->id));
        }

        return $view;
    }
}
