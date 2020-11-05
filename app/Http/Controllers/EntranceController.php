<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntranceRequest;
use App\Models\EntranceRefund;
use App\Models\ProviderOrder;
use App\Models\Store;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Entrance;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use App\Models\ArticleStock;
use Illuminate\Support\Facades\Gate;
use Auth;

class EntranceController extends Controller
{
    public static function entranceDialog($request)
    {
        $entrance = Entrance::find($request['entrance_id']);
        $class = 'entranceDialog' . ($entrance->id ?? '');

        $providerorder = $entrance->providerorder ?? null;

        $view = view(get_template() . '.entrance.dialog.form_entrance', compact('entrance', 'providerorder', 'request', 'class'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $entrances = self::getEntrances($request);

        return response()->json(['data' => $entrances]);
    }

    public function getEntranceProducts($id){
        $entrance = Entrance::where('id', $id)->first();

        return response()->json([
            'products' => $entrance->articles()->get()]);
    }

    public function store(EntranceRequest $request)
    {
        PermissionController::canByPregMatch( 'Создавать поступления');

        $user = Auth::user();

        $providerorder = ProviderOrder::find($request['providerorder_id']);

        //Проверка валидации
        $messages = [];

        $providerPivotProducts = DB::table('article_provider_orders')->whereIn('id', array_keys($request->products))->get();

        foreach($request['products'] as $pivot_id => $product) {

            $entrance_count = DB::table('article_entrance')->where('provider_pivot_id', $pivot_id)->sum('count');

            $provider_count = $providerPivotProducts->where('id', $pivot_id)->first()->count;

            $form_count = (int)$product['count'];

            if($entrance_count + $form_count > $provider_count){
                $messages['products[' . $pivot_id . '][count]'][] = 'Кол-во не может быть больше чем в заявке поставщику';
            }
        }

        if(count($messages)){
            return response()->json(['messages' => $messages], 422);
        }

        $entrance = Entrance::create([
            'manager_id' => $user->partner->id,
            'partner_id' => $providerorder->partner->id,
            'company_id' => $user->company_id,
            'comment' => $request->comment,
            'providerorder_id' => $providerorder->id,
            'invoice' => $request->invoice
        ]);

        foreach ($request->products as $pivot_id => $product) {

            $price = $providerorder->articles->find($product['id'])->pivot->price;

            $entrance->articles()->attach($product['id'], [
                'store_id' => $user->current_store,
                'company_id' => $entrance->company_id,
                'count' => $product['count'],
                'price' => $price,
                'provider_pivot_id' => $pivot_id
            ]);
        }

        #Добавляем к балансу контакта
        $entrance->providerorder->partner->addition($entrance->totalPrice);
        UA::makeUserAction($entrance,'create');

        $entrance->providerorder->updateIncomeStatus();

//        #Всё ли поступило?
//        $providerorder->checkEntered();

        #Ответ сервера
        return response()->json([
            'message' => 'Поступление было успешно создано.',
            'id' => $entrance->id,
            'event' => 'EntranceStored',
        ], 200);
    }

    public function fresh(Entrance $entrance, Request $request)
    {
        $inner = true;
        $class = 'entranceDialog' . $entrance->id;

        $content = view(get_template() . '.entrance.dialog.form_entrance', compact( 'entrance', 'class', 'inner'))
            ->with('providerorder', $entrance->providerorder)
            ->render();

        return response()->json([
            'html' => $content,
            'target' => $class,
        ], 200);
    }

    private static function calculatePivotArticleEntrance($request, $store, $product){
        ### Рассчет товара для поступления ##########################
        $data = [];

        $vcount = $product['count'];
        //$vprice = $product['price'];

        //$vtotal = $vprice * $vcount;
        $vnds = 0.00;

        $data = [
            'store_id' => $store->id,
            'count' => $product['count'],
            'price' => $product['price'],
            'company_id' => Auth::user()->company()->first()->id,
            //'total' => $vtotal,
        ];
        return $data;
    }

    public function select(Entrance $entrance, Request $request)
    {
        $products = null;

        if(!$entrance) {
            return response()->json([
                'message' => 'Поступление не найдено, возможно оно было удалёно',
            ], 422);
        }

        $view = null;

        if(strpos($request->refer, 'entranceRefundDialog') !== false) {

            $products = $entrance->articles;
            $entrance_refunded = $entrance->entrancerefunds->load('articles');

            $available_count = [];

            foreach ($entrance->articles as $product) {
                $available_count[$product->id] = $product->pivot->count - $product->pivot->released_count;
            }

            foreach ($entrance_refunded as $entrance_refund) {
                foreach ($entrance_refund->articles as $product) {
                    $available_count[$product->id] -= $product->pivot->count;
                }
            }
//
//            $view = view(get_template() . '.entrance_refunds.dialog.products_element', compact('entrance', 'available_count', 'products', 'request'))->render();
        }

        return response()->json([
            'id' => $entrance->id,
//            'items_html' => $view,
            'items' => $products,
            'partner' => $entrance->partner->outputName(),
            'partner_id' => $entrance->partner->id,
            'balance' => $entrance->partner->balance,
            'name' => $entrance->outputName()
        ]);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectEntranceDialog($request);
    }

    public static function selectEntranceDialog(Request $request)
    {
        $class = 'selectEntranceDialog';
        $query = Entrance::with('partner', 'articles', 'entrancerefunds', 'entrancerefunds.articles')
            ->where('company_id', Auth::user()->company->id)
            ->when($request['string'], function (Builder $q) use ($request) {
                $q->where('id', 'LIKE', '%' . str_replace(["-","!","?",".", ""],  "", trim($request['string'])) . '%');
            })
            ->whereHas('articles', function (Builder $query) {
                $query->whereRaw('released_count < count');
            })
            ->orderBy('created_at', 'DESC')
            ->limit(15);

        $entrances = $query->get();

        foreach ($entrances as $key => $entrance) {
            $refunded_count = 0;

            $entrance_refunded = $entrance->entrancerefunds;

            foreach ($entrance_refunded as $entrance_refund) {
                foreach ($entrance_refund->articles as $product) {
                    $refunded_count += $product->pivot->count;
                }
            }

            if($refunded_count == $entrance->articles->sum('pivot.count')) unset($entrances[$key]);
        }

        $view = $request['inner'] ? 'select_entrance_inner' : 'select_entrance';

        $content = view(get_template() . '.entrance.dialog.' . $view, compact('entrances','class', 'request'))->render();
        return response()->json([
            'tag' => 'selectEntranceDialog',
            'html' => $content
        ]);
    }

    public static function getEntrances($request){

        $size = 30;
        if(isset($request['size'])){
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }
        if($field === null &&  $dir === null){
            $field = 'created_at';
            $dir = 'DESC';
        }
        if($request['provider'] == null){
            $request['provider'] = [];
        }
        if($request['accountable'] == null){
            $request['accountable'] = [];
        }

        $entrances = Entrance::select(DB::raw('
            entrances.*, entrances.created_at as date, IF(partners.type != 2, partners.fio, partners.companyName) as partner, provider_orders.id as ordid
        '))
            ->from(DB::raw('(
            SELECT entrances.*, IF(partners.type != 2, partners.fio, partners.companyName) as manager
            FROM entrances
            left join partners on partners.id = entrances.partner_id
            GROUP BY entrances.id)
             entrances
        '))

            ->leftJoin('provider_orders',  'provider_orders.id', '=', 'entrances.providerorder_id')
            ->leftJoin('partners',  'partners.id', '=', 'provider_orders.partner_id')
            ->when($request['provider'] != [], function($query) use ($request) {
                $query->whereHas('providerorder', function($query) use ($request){
                    $query->whereIn('partner_id', $request['provider']);
                });
            })
            ->when($request['accountable'] != [], function($query) use ($request) {
                $query->whereIn('entrances.partner_id', $request['accountable']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('entrances.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->where('entrances.company_id', Auth::user()->company()->first()->id)
            ->groupBy('entrances.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);
            return $entrances;

    }

    public function getPartnerSideInfo(Request $request){

        $entrance = Entrance::owned()->where('id', $request['id'])->first();
        $provider_order = $entrance->providerorder()->first();
        $partner = $provider_order->partner()->first();
        $comment = $entrance->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(get_template() . '.entrance.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function events(Request $request){
        $entrances = Entrance::owned()
            ->where(function($q) use ($request){
                if(isset($request['start']) && $request['start'] != 'null' && $request['start'] != ''){
                    $q->where('created_at',  '>=',  Carbon::parse($request['start']));
                }
                if(isset($request['end']) && $request['end'] != 'null' && $request['end'] != ''){
                    $q->where('created_at', '<=', Carbon::parse($request['end']));
                }
            })->get();
        $events = [];
        foreach($entrances as $entrance){
            $events[] = [
                'title' => 'Поступление #' . $entrance->id,
                'start' => $entrance->created_at,
                'end' => $entrance->created_at,
                'color' => '#00bcd4',
                'extendedProps' => [
                    'modal' => 'entranceDialog',
                    'alias' => 'entrance_id',
                    'id' => $entrance->id
                ]
            ];
        }
        return response($events);
    }
}
