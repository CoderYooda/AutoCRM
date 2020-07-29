<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentsRequest;
use App\Models\ClientOrder;
use App\Models\Refund;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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
            'html' => view(get_template() . '.shipments.dialog.form_shipment', compact( 'shipment', 'request'))->render()
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

    private static function selectShipmentInner($request)
    {
        $class = 'selectShipmentDialog';
        $query = Shipment::where('company_id', Auth::user()->company->id)
            ->when($request['string'], function ($q) use ($request) {
                $q->where('foundstring', 'LIKE', '%' . str_replace(["-","!","?",".", ""],  "", trim($request['string'])) . '%');
            })
            ->orderBy('created_at', 'DESC')
            ->limit(30);

        if($request['hide_paid']) {
            $query->whereHas('articles', function (Builder $query) {
                $query->whereRaw('count != refunded_count');
            });
        }

        $shipments = $query->get();

        $view = $request['inner'] ? 'select_shipment_inner' : 'select_shipment';

        $content = view(get_template() . '.shipments.dialog.' . $view, compact('shipments','class', 'request'))->render();
        return response()->json([
            'tag' => 'selectShipmentDialog',
            'html' => $content
        ]);
    }

    public function select(Shipment $shipment, Request $request)
    {
        $products = $shipment->load('refunds', 'refunds.articles')->notRefundedArticles()->get();

        $refunded_count = [];

        foreach ($shipment->refunds as $refund) {

            foreach ($refund->articles as $product) {
                $refunded_count[$product->id] = $product->pivot->count;
            }
        }

        if(!$shipment){
            return response()->json([
                'message' => 'Продажа не найдена, возможно она была удалёна',
            ], 422);
        }

        return response()->json([
            'id' => $shipment->id,
            'items_html' => view(get_template() . '.refund.dialog.products_element', compact('products', 'refunded_count', 'request'))->render(),
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
                'info' => view(get_template() . '.shipments.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function tableData(Request $request)
    {
        $shipments = ShipmentsController::getShipments($request);

        return response()->json(['data' => $shipments]);
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
                        $store = $shipment->store;
                        $store->increaseArticleCount($article->id, $shipment->getArticlesCountById($article->id));
                    }
                    #Добавляем к балансу контакта
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
                $store = $shipment->store;
                $store->increaseArticleCount($article->id, $shipment->getArticlesCountById($article->id));
            }
            #Добавляем к балансу контакта
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
        $content = view(get_template() . '.shipments.dialog.form_shipment', compact( 'shipment', 'stores', 'class', 'inner', 'request'))
            ->render();

        return response()->json([
            'html' => $content,
            'target' => 'shipmentDialog' . $shipment->id
        ], 200);
    }

    public function store(ShipmentsRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать продажи' : 'Создавать продажи');

        $request['inpercents'] = !($request['inpercents'] === null || $request['inpercents'] === false || $request['inpercents'] === 0 || $request['inpercents'] === '0');

        if($request['inpercents']){
            if((int)$request['discount'] > 100) {
                $request['discount'] = 100;
            }
            if((int)$request['discount'] <= 0){
                $request['discount'] = 0;
            }
        }

        $shipment = Shipment::firstOrNew(['id' => $request['id']]);

        #Проверка наличия данного количества на складе
        $products = Article::whereIn('id', array_keys($request['products']))->get();

        $errors = [];

        foreach($products as $product) {

            $count = $request['products'][$product->id]['count'];
            $shipment_count = $shipment->articles->find($product->id)->pivot->count ?? 0;

            if($product->getEntrancesCount($count) < ($count - $shipment_count)) {
                $name = 'products.' . $product->id . '.count';

                $errors[$name] = ['В наличие нет такого количества.'];
            }
        }

        if(count($errors)) {
            return response()->json([
                'messages' => $errors
            ], 422);
        }

        if($shipment->exists){
            $this->message = 'Продажа обновлена';
            #Отнимаем с баланса контакта
            $shipment->partner->addition($shipment->itogo);
        } else {
            $shipment->company_id = Auth::user()->company->id;
            $shipment->manager_id = Auth::user()->partner->id;
            $this->message = 'Продажа сохранена';
        }

        $shipment->fill($request->only($shipment->fields));
        $shipment->summ = 0;
        $shipment->balance = 0;
        $shipment->itogo = 0;
        $shipment->save();

        UA::makeUserAction($shipment, $shipment->wasRecentlyCreated ? 'create' : 'store');
        ##########################################################################

        $store = $shipment->store;

        if(!$shipment->wasRecentlyCreated) {
            foreach($shipment->articles as $article){
                $store->increaseArticleCount($article->id, $article->pivot->count);
                if($shipment->clientOrder){
                    $shipment->clientOrder->decreaseShippedCount($article->id, $article->pivot->count);
                }
            }
        }

        # Синхронизируем товары к складу
        if(count($request['products'])) {
            $store->articles()->syncWithoutDetaching(array_keys($request['products']), false);
        }

        #Возвращаем товар в поступления для перезаписи
        if(count($shipment->entrances)) {

            $entrances_pivot = DB::table('shipment_entrance')->where('shipment_id', $shipment->id)->get();

            foreach ($entrances_pivot as $entrance_pivot) {

                DB::table('article_entrance')->where([
                    'entrance_id' => $entrance_pivot->entrance_id,
                    'article_id' => $entrance_pivot->article_id
                ])
                ->decrement('released_count', $entrance_pivot->count);
            }
        }

        #Заполняем связующую таблицу shipment_entrance и резервируем товар в article_entrance
        foreach ($products as $product) {

            $count = $request['products'][$product->id]['count'];

            $entrances_id = $product->incrementToEntrance($count);

            foreach ($entrances_id as $entrance_id => $count) {
                DB::table('shipment_entrance')->insert([
                    'shipment_id' => $shipment->id,
                    'entrance_id' => $entrance_id,
                    'article_id' => $product->id,
                    'count' => $count
                ]);
            }
        }

        #Убавляем количество на складе

        $shipment_data = [];

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
                'price' => (double)$vprice,
                'total' => (double)$vtotal,
                'status' => 'given'
            ];

            $shipment_data[] = $pivot_data;
        }

        #Удаление всех отношений и запись новых (кастомный sync)
        $shipment->syncArticles($shipment->id, $shipment_data);

        if($request['inpercents']){
            $shipment->itogo = $shipment->summ - ($shipment->summ / 100 * $request['discount']);
        } else {
            if($request['discount'] >= $shipment->summ){
                $request['discount'] = $shipment->summ;
            }
            $shipment->discount = $request['discount'];
            $shipment->itogo = $shipment->summ - $request['discount'];
        }

        #Добавляем к балансу контакта
        $shipment->partner->subtraction($shipment->itogo);

        $shipment->foundstring = str_replace(["-","!","?",".", ""],  "", trim($shipment->id . $shipment->partner->foundstring));

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
    public function getShipmentProducts(Shipment $shipment)
    {
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
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        $shipments =
            Shipment::withoutGlobalScopes()->select(DB::raw('
                shipments.*, shipments.created_at as date, IF(partners.type != 2, partners.fio,partners.companyName) as partner, CONCAT(shipments.discount, IF(shipments.inpercents = 1, \' %\',\' ₽\')) as discount, shipments.summ as price, shipments.itogo as total
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

//        select shipments.id, shipments.created_at, IF(partners.type != 2, partners.fio,partners.companyName) as partner, shipments.discount, shipments.summ as price, shipments.itogo as total
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
