<?php

namespace App\Http\Controllers;

use App\DocumentType;
use App\Http\Requests\Documents\StoreRequest;
use App\Models\Article;
use App\Models\ClientOrder;
use App\Models\Document;
use App\Models\Refund;
use App\Models\Shipment;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use stdClass;

class DocumentController extends Controller
{
    public function store(StoreRequest $request)
    {


        return response()->json([
            'type' => 'success',
            'message' => 'Документ успешно создан.'
        ]);
    }

    public static function dialog(Request $request)
    {
        $class = 'documentDialog';

        $documents = DocumentType::all();

        $view = view(get_template() . '.documents.dialog.form_document', compact('request', 'class', 'documents'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $size = $request['size'] ?? 30;

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }

        if($field === null && $dir === null){
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        if($request['client'] == null){
            $request['client'] = [];
        }

        return Document::where('company_id', Auth::user()->company_id)
            ->when($request['client'] != null, function($query) use ($request) {
                $query->whereIn('partner_id', $request['client']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->when($field && $dir, function ($query) use ($field, $dir) {
                $query->orderBy($field, $dir);
            })
            ->paginate($size);
    }

    public function document(Request $request)
    {
        $names = [
            'out-warrant' => [
                'view' => 'documents.out-warrant',
                'id' => 6,
                'class' => Warrant::class
            ],
            'in-warrant' => [
                'view' => 'documents.in-warrant',
                'id' => 5,
                'class' => Warrant::class
            ],
            'client-order' => [
                'view' => 'documents.client-order',
                'id' => 4,
                'class' => ClientOrder::class
            ],
            'shipment-score' => [
                'view' => 'documents.invoice-for-payment',
                'id' => 1,
                'class' => Shipment::class
            ],
            'shipment-upd' => [
                'view' => 'documents.upd',
                'id' => 2,
                'class' => Shipment::class
            ],
            'defective-act' => [
                'view' => 'documents.defective-act',
                'id' => 7,
                'class' => stdClass::class
            ],
            'cheque' => ['view' => 'cheques.'],
            'statistic-result' => ['view' => 'documents.statistic-result']
        ];

        $view_name = $names[$request->doc]['view'];

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

        if(isset($names[$request->doc]['id'])) {

            $document_data = $names[$request->doc];

            $user = Auth::user();

            $document = Document::create([
                'company_id' => $user->company_id,
                'name' => DocumentType::find($document_data['id'])->name,
                'manager_id' => $user->id,
                'documentable_id' => $request['id'],
                'documentable_type' => $document_data['class'],
                'data' => json_encode($request->all()),
            ]);

            $barcode = '9991' . sprintf('%09d', $document->id);

            $document->update(['barcode' => $barcode]);
        }

        return $view;
    }
}
