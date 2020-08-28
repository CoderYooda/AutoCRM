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
use PhpParser\Comment\Doc;
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

        if(isset($request['sorters'])) {
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }

        if($field === null && $dir === null) {
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        $document_filter = DocumentType::find($request['document_filter']);

        $documents = Document::with('manager')->where('company_id', Auth::user()->company_id)
            ->when($request['accountable'] != null, function($query) use ($request) {
                $query->whereIn('manager_id', $request['accountable']);
            })
            ->when($request->search, function ($query) use($request) {
                $query->where('barcode', $request->search);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->when($document_filter != null, function ($query) use($document_filter) {
                $query->where('name', $document_filter->name);
            })
            ->when($field && $dir, function ($query) use ($field, $dir) {
                $query->orderBy($field, $dir);
            })
            ->paginate($size);

        foreach ($documents as $key => $document) {
            $documents[$key]['manager_name'] = $document->manager->fio;
        }

        return response()->json(['data' => $documents]);
    }

    public function getPartnerSideInfo(Request $request)
    {
        $document = Document::find($request->id);

        return response()->json([
            'info' => view(get_template() . '.documents.contact-card', compact( 'document','request'))->render(),
        ], 200);
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

        $company = Auth::user()->company;

        $view = view($view_name);

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

            $shipment = Shipment::with('company', 'partner')->find($request->id);

            $data = [];

            //Документ
            $data['id'] = $request->id;
            $data['created_at'] = $shipment->created_at->format('d.m.Y');

            $data['manager_name'] = Auth::user()->partner->official_name;

            //Компания
            $data['company_name'] = $company->official_name;
            $data['legal_address'] = $company->legal_address;
            $data['inn'] = $company->inn;
            $data['kpp'] = $company->kpp;
            $data['is_company'] = $company->is_company;
            $data['owner'] = $company->owner;
            $data['auditor'] = $company->auditor;
            $data['bank'] = $company->bank;
            $data['cs'] = $company->cs;
            $data['rs'] = $company->rs;

            //Партнёр
            $data['partner_name'] = $shipment->partner->official_name;
            $data['partner_address'] =  $shipment->partner->type != 2 ? $shipment->partner->address : $shipment->partner->ur_address;
            $data['partner_inn'] = $shipment->partner->inn;
            $data['partner_kpp'] = $shipment->partner->kpp;
            $data['partner_type'] = $shipment->partner->type;
            $data['partner_cut_surname'] = $shipment->partner->cur_surname;

            //Продукты
            $data['products'] = json_decode($request->data, true);

            $products = Article::whereIn('id', array_column($data['products'], 'id'))->get();

            $data['products']['price_without_nds'] = 0;
            $data['products']['price_with_nds'] = 0;
            $data['products']['nds'] = 0;

            foreach($data['products'] as $key => $product) {

                if(!isset($product['id'])) continue;

                $db_product = $products->where('id', $product['id'])->first();

                $data['products'][$key]['name'] = $db_product->name;
                $data['products'][$key]['article'] = $db_product->article;

                $data['products'][$key]['price_with_nds'] = $product['price'];
                $data['products'][$key]['price_without_nds'] = $product['price'] - ($product['price'] / 100 * 20);
                $data['products'][$key]['nds'] = ($product['price'] / 100 * 20);

                $total_price = ($product['price'] * $product['count']);
                $nds = ($total_price / 100 * 20);

                $data['products']['price_without_nds'] += $total_price - $nds;
                $data['products']['price_with_nds'] += $total_price;
                $data['products']['nds'] += $nds;
            }

            $data['view'] = $view_name;

            $view->with('data', $data);
        }

        if(isset($names[$request->doc]['id'])) {

            $document_data = $names[$request->doc];

            $partner = Auth::user()->partner;

            $document = Document::create([
                'company_id' => $partner->company->id,
                'name' => DocumentType::find($document_data['id'])->name,
                'manager_id' => $partner->id,
                'documentable_id' => $request['id'],
                'documentable_type' => $document_data['class'],
                'data' => json_encode($view->getData())
            ]);

            $barcode = '9991' . sprintf('%09d', $document->id);

            $document->update(['barcode' => $barcode]);
        }

        return $view;
    }

    public function show(Document $document)
    {
        $data = json_decode($document['data'], true);

        $view_name = $data['data']['view'];

        return view($view_name)->with('data', $data['data']);
    }
}
