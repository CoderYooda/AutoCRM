<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentsRequest;
use App\Models\ClientOrder;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Article;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;

class ShipmentsController extends Controller
{
    public static function shipmentDialog(Request $request)
    {
        $tag = 'shipmentDialog';

        $clientorder = null;
        if($request->clientorder_id) {
            $clientorder = ClientOrder::owned()->where('id', (int)$request->clientorder_id)->first();
            if(!$clientorder){
                return response()->json(['type' => 'error', 'message' => 'ошибка зависимости заказа',], 200);
            }
        }

        $preselect_articles = $clientorder ? $clientorder->notShippedArticles : null;
        if($preselect_articles != null){
            foreach ($preselect_articles as $article){
                $article->pivot->count = $clientorder->getAvailableToShippingArticlesCount($article->id);
            }
        }

        if($request['shipment_id']){
            $shipment = Shipment::where('id', (int)$request['shipment_id'])->first();
            $tag .= $shipment->id;
        } else {
            $shipment = null;
        }


        if($clientorder){

            $shipment = new Shipment();
            $shipment->id = null;
            $shipment->partner = $clientorder->partner;
            $shipment->summ = 111;
            $shipment->itogo = 222;
            $shipment->clientorder_id = $clientorder->id;
            $shipment->articles = $preselect_articles;

            $itogo = 0;
            foreach($shipment->articles as $article){
                $total_of_article =  $article->pivot->count * $article->pivot->price;
                $itogo += $total_of_article;
                $article->pivot->total = $total_of_article;
            }
            $shipment->summ = $itogo;
            $shipment->itogo = $itogo;

        }

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.shipments.dialog.form_shipment', compact( 'shipment', 'request'))->render()
        ]);
    }

    public static function selectShipmentDialog($request)
    {
        return self::selectShipmentInner($request);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectShipmentInner($request);
    }

    private static function selectShipmentInner($request){
        $class = 'selectShipmentDialog';
//        $request['category_id'] = $request['category_id'] ? $request['category_id'] : self::$root_category;
        $shipments = Shipment::where(function($q) use ($request){

            $q->whereHas('partner', function($q) use ($request){
                $q->where('fio', 'LIKE', '%' . $request['string'] .'%')
                    ->orWhere('companyName', 'LIKE', '%' . $request['string'] .'%')
                    ->orWhereHas('phones', function ($query) use ($request) {
                        $query->where('number', 'LIKE', '%' . $request['string'] .'%');
                    });
                });
            })
            ->whereHas('articles', function($q){
                $q->where('refunded_count', 0);
            })
            ->where('company_id', Auth::user()->company()->first()->id)
            ->orderBy('created_at', 'DESC')
            ->limit(30)
            ->get();

        $view = $request['inner'] ? 'select_shipment_inner' : 'select_shipment';

        $content = view(env('DEFAULT_THEME', 'classic') . '.shipments.dialog.' . $view, compact('shipments','class', 'request'))->render();
        return response()->json([
            'tag' => 'selectShipmentDialog',
            'html' => $content
        ]);
    }


    public function select(Shipment $shipment, Request $request)
    {
        $products = $shipment->notRefundedArticles()->get();
        if(!$shipment){
            return response()->json([
                'message' => 'Продажа не найдена, возможно она была удалёна',
            ], 422);
        }
        return response()->json([
            'id' => $shipment->id,
            'items_html' => view(env('DEFAULT_THEME', 'classic') . '.refund.dialog.products_element', compact('products', 'request'))->render(),
            'items' => $products,
            'partner' => $shipment->partner->outputName(),
            'balance' => $shipment->partner->balance,
            'name' => $shipment->outputName()
        ]);
    }

    public function getSideInfo(Request $request){

        $shipment = Shipment::where('id', $request['id'])->first();
        $partner = $shipment->partner()->first();
        $comment = $shipment->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(env('DEFAULT_THEME', 'classic') . '.shipments.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function tableData(Request $request)
    {
        $shipments = ShipmentsController::getShipments($request);
        foreach($shipments as $shipment){
            $shipment->date = $shipment->created_at->format('d.m.Y/H:i');
        }
        return response()->json($shipments);
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять продажи');
        $returnIds = null;
        if($id == 'array'){
            $shipments = Shipment::whereIn('id', $request['ids'])->get();
            $this->message = 'Продажи удалены';

            $returnIds = $shipments->pluck('id');
            foreach($shipments as $shipment){
                if($shipment->delete()){
                    $articles = $shipment->articles()->get();
                    foreach($articles as $article){
                        $store = $shipment->store()->first();
                        $store->increaseArticleCount($article->id, $shipment->getArticlesCountById($article->id));
                    }
                    #Добавляем к балансу контрагента
                    $shipment->partner()->first()->subtraction($shipment->itogo);
                    if($shipment->clientOrder){
                        foreach($shipment->articles as $article){
                            $shipment->clientOrder->decreaseShippedCount($article->id, (int)$article->pivot->count);
                        }
                    }
                    $shipment->articles()->sync(null);
                    UA::makeUserAction($shipment, 'delete');
                }
            }
        } else {
            $shipment = Shipment::where('id', $id)->first();
            $returnIds = $shipment->id;

            $articles = $shipment->articles()->get();

            foreach($articles as $article){
                $store = $shipment->store()->first();
                $store->increaseArticleCount($article->id, $shipment->getArticlesCountById($article->id));
            }
            #Добавляем к балансу контрагента
            $shipment->partner()->first()->subtraction($shipment->itogo);
            if($shipment->clientOrder){
                foreach($shipment->articles as $article){
                    $shipment->clientOrder->decreaseShippedCount($article->id, (int)$article->pivot->count);
                }
            }
            $shipment->articles()->sync(null);
            $shipment->delete();
            $this->status = 200;
            $this->message = 'Продажа удалена';
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message,
            'event' => 'ShipmentStored',
        ], 200);

    }

    public function fresh(Shipment $shipment, Request $request)
    {
        $stores = Store::owned()->get();
        $request['fresh'] = true;
        $request['refer'] = is_array($request['refer'] ) ? null : $request['refer'];
        $class = 'shipmentDialog' . $shipment->id;
        $inner = true;
        $content = view(env('DEFAULT_THEME', 'classic') . '.shipments.dialog.form_shipment', compact( 'shipment', 'stores', 'class', 'inner', 'request'))
            ->render();

        return response()->json([
            'html' => $content,
            'target' => 'shipmentDialog' . $shipment->id
        ], 200);
    }

    public function store(ShipmentsRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать продажи' : 'Создавать продажи');

        $shipment = Shipment::firstOrNew(['id' => $request['id']]);

        if($request['inpercents'] === null || $request['inpercents'] === false || $request['inpercents'] === 0 || $request['inpercents'] === '0'){$request['inpercents'] = false;} else {
            $request['inpercents'] = true;
        }

        //TODO добавить в валидатор проверку и выводить ошибку мб?
        if($request['inpercents']){
            if((int)$request['discount'] >= 100){
                $request['discount'] = 100;
            }
            if((int)$request['discount'] <= 0){
                $request['discount'] = 0;
            }
        }

        if($shipment->exists){
            $shipmentWasExisted = true;
            $this->message = 'Продажа обновлена';
            #Отнимаем с баланса контрагента
            $shipment->partner()->first()->addition($shipment->itogo);
            $wasExisted = true;
        } else {
            $shipmentWasExisted = false;
            $shipment->company_id = Auth::user()->company()->first()->id;
            $shipment->manager_id = Auth::user()->partner()->first()->id;
            $this->message = 'Продажа сохранена';
            $wasExisted = false;
        }

        $shipment->fill($request->only($shipment->fields));
        $shipment->summ = 0;
        $shipment->balance = 0;
        $shipment->itogo = 0;
        $shipment->save();
        UA::makeUserAction($shipment, $wasExisted ? 'fresh' : 'create');
        ##########################################################################

        $store = $shipment->store()->first();

        if($shipmentWasExisted){
            $articles = $shipment->articles()->get();
            foreach($articles as $article){
                $store->increaseArticleCount($article->id, $article->pivot->count);
                if($shipment->clientOrder){
                    $shipment->clientOrder->decreaseShippedCount($article->id, $article->pivot->count);
                }
            }
        }

        if(count($request['products']))
        {
            //TODO check
            $ids = collect($request['products'])->pluck('id');
            # Синхронизируем товары к складу
            $store->articles()->syncWithoutDetaching($ids, false);
        }

        $shipment_data = [];

        if($shipment->clientOrder){
            foreach($request['products'] as $product) {
                if($product['count'] > $shipment->clientOrder->getAvailableToShippingArticlesCount($product['id'])){
                    $name = 'products.' . $product['id'] . '.count';
                    return response()->json([
                        'messages' => [$name => ['Кол - во не может быть больше чем в заказе']]
                    ], 422);
                }
            }
        }

        foreach($request['products'] as $product) {

            $store->decreaseArticleCount($product['id'], $product['count']);

            $vcount = $product['count'];
            if($shipment->clientOrder) {
                $vprice = $shipment->clientOrder->getProductPriceFromClientOrder($product['id']);
            } else {
                $vprice = (double)$product['price'];
            }
            $vtotal = $vprice * $vcount;
            $shipment->summ += $vtotal;
            $pivot_data = [
                'article_id' => (int)$product['id'],
                'shipment_id' => $shipment->id,
                'count' => (int)$vcount,
                'midprice' => $store->getMidPriceById((int)$product['id']),
                'price' => (double)$vprice,
                'total' => (double)$vtotal,
                'status' => 'given'
            ];

            if(!$shipmentWasExisted){
                $pivot_data['midprice'] = $store->getMidPriceById($product['id']);
            }

            $shipment_data[] = $pivot_data;
        }
        #Удаление всех отношений и запись новых (кастомный sync)
        //dd($shipment_data);
        $shipment->syncArticles($shipment->id, $shipment_data);


        if($request['inpercents']){
            $shipment->itogo = $shipment->summ - ($shipment->summ / 100 * $request['discount']);
        } else {
            if($request['discount'] >= $shipment->summ){
                $request['discount'] = $shipment->summ;
            }
            if($request['discount'] <= 0){
                $request['discount'] = 0;
            }
            $shipment->discount = $request['discount'];
            $shipment->itogo = $shipment->summ - $request['discount'];
        }

        #Добавляем к балансу контрагента
        $shipment->partner()->first()->subtraction($shipment->itogo);

        if($request['created_at']){
            $shipment->created_at = $request['created_at'];
        }

        $shipment->save();

        if($shipment->clientOrder){
            foreach($shipment->articles as $article){
                $shipment->clientOrder->increaseShippedCount($article->id, $article->pivot->count);
            }
        }

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $shipment->id,
                'event' => 'ShipmentStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    //TODO check
    public function getShipmentProducts(Shipment $shipment){

        return response()->json([
            'products' => $shipment->getArticles()]);
    }

    public static function getShipments($request)
    {
        $size = isset($request['size']) ? $request['size'] : 30;

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
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        $shipments =
            Shipment::withoutGlobalScopes()->select(DB::raw('
                shipments.*, shipments.created_at as date, IF(partners.isfl = 1, partners.fio,partners.companyName) as partner, CONCAT(shipments.discount, IF(shipments.inpercents = 1, \' %\',\' ₽\')) as discount, shipments.summ as price, shipments.itogo as total
            '))
                ->leftJoin('partners',  'partners.id', '=', 'shipments.partner_id')
                ->where('shipments.company_id', Auth::user()->company()->first()->id)
                ->when($request['provider'] != null, function($query) use ($request) {
                    $query->whereIn('shipments.partner_id', $request['provider']);
                })
                ->when($request['dates_range'] != null, function($query) use ($request) {
                    $query->whereBetween('shipments.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
                })
                ->groupBy('shipments.id')
                ->orderBy($field, $dir)
                ->paginate($size);

//        select shipments.id, shipments.created_at, IF(partners.isfl = 1, partners.fio,partners.companyName) as partner, shipments.discount, shipments.summ as price, shipments.itogo as total
//        from shipments
//        left join `partners` on `partners`.`id` = `shipments`.`partner_id`
//        and `shipments`.`company_id` = 2
//        group by `shipments`.`id`
//        order by `created_at` desc

        return $shipments;
    }

    public function events(Request $request)
    {
        $client_orders = Shipment::where(function(Builder $q) use ($request) {
                if(isset($request['start']) && $request['start'] != 'null' && $request['start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['start']));
                }
                if(isset($request['end']) && $request['end'] != 'null' && $request['end'] != ''){
                    $q->where('do_date', '<=', Carbon::parse($request['end']));
                }
            })
            ->get();

        $events = [];

        foreach($client_orders as $order) {
            $events[] = [
                'title' => 'Продажа №' . $order->id,
                'start' => $order->do_date,
                'end' => $order->do_date,
                'color' =>'#4caf50',
                'extendedProps' => [
                    'modal' => 'shipmentDialog',
                    'alias' => 'shipment_id',
                    'id' => $order->id
                ]
            ];
        }

        return response($events);
    }
}
