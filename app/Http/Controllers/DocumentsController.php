<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Refund;
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
            'shipment-upd' => 'documents.upd',
            'defective-act' => 'documents.defective-act',
            'cheque' => 'cheques.'
        ];

        $view_name = $names[$request->doc];

        if($request->doc == 'cheque') {

            $types = [
                'simple',
                'barcode',
                'label',
                'thermal-printer29',
                'thermal-printer58'
            ];

            $view_name .= $types[$request->id];
        }

        $view = view($view_name, compact('request'))
            ->with('company', Auth::user()->company);

        if($request->doc == 'cheque') {

            $products = Article::with('supplier')->whereIn('id', $request->data['ids'])->get();

            $count_type = $request->data['count_type'];
            $count = $request->data['count'];

            $full_count = 0;

            foreach ($products as $product) {
                $product->price = correct_price($product->getPrice());
                $product->count = $count_type == 0 ? $count : $product->getEntrancesCount();

                $full_count += $product->count;
            }

            $view->with('products', $products)
                ->with('full_count', $full_count);
        }
        else if($request->doc == 'out-warrant' || $request->doc == 'in-warrant') {
            $view->with('warrant', Warrant::find($request->id));
        }
        else if($request->doc == 'defective-act') {
            $view->with('refund', Refund::find($request->id));
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

            $view->with('products', Article::whereIn('id', array_keys($sorted_products))->get())
                ->with('sorted_products', $sorted_products)
                ->with('shipment', Shipment::with('company')->find($request->id));
        }

        return $view;
    }
}
