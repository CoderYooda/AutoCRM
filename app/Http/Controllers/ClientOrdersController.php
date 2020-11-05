<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientOrdersRequest;
use App\Models\ClientOrder;
use App\Models\Partner;
use App\Models\Store;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use App\Models\Article;
use App\Http\Controllers\UserActionsController as UA;
use Auth;

class ClientOrdersController extends Controller
{
    public static function clientorderDialog($request)
    {
        $tag = 'clientorderDialog';

        if ($request['client_order_id'] || $request['clientorder_id']) {

            $co_id = isset($request['client_order_id']) ? $request['client_order_id'] : $request['clientorder_id'];

            $client_order = ClientOrder::find((int)$co_id);

            $tag .= $client_order->id;
        } else {
            $client_order = null;
        }

        $articles = [];
        if($client_order){
            $articles = $client_order->articles;
            foreach($articles as $article){
                $article->supplier_name = $article->supplier->name;
                $article->store_count = $article->getCountInCurrentStore();
            }
        }

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.client_orders.dialog.form_client_order', compact('client_order', 'request', 'articles'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $client_orders = ClientOrdersController::getClientOrders($request);

        return response()->json(['data' => $client_orders]);
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять заказ клиента');
        $returnIds = null;
        if ($id == 'array') {
            $client_orders = ClientOrder::whereIn('id', $request['ids']);
            $this->message = 'Продажи удалены';
            $returnIds = $client_orders->get()->pluck('id');
            foreach ($client_orders->get() as $client_order) {
                $client_order->delete();
                UA::makeUserAction($client_order, 'delete');
            }
        } else {
            $client_order = ClientOrder::where('id', $id)->first();
            $this->message = 'Продажа удалена';
            $returnIds = $client_order->id;
            $client_order->delete();
            UA::makeUserAction($client_order, 'delete');
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], 200);
    }

    public function fresh(ClientOrder $client_order, Request $request)
    {
        $client_order->articles = $client_order->articles()->get();

        foreach ($client_order->articles as $article) {
            $article->instock = $article->getCountInStoreId($client_order->store_id);

            $article->complited = ($article->instock >= $article->pivot->count) ? true : false;
        }

        $request['fresh'] = true;
        $class = 'clientorderDialog' . $client_order->id;

        $articles = [];
        if($client_order){
            $articles = $client_order->articles;
            foreach($articles as $article){
                $article->supplier_name = $article->supplier->name;
                $article->store_count = $article->getCountInCurrentStore();
            }
        }

        $content = view(get_template() . '.client_orders.dialog.form_client_order', compact('client_order', 'class', 'request', 'articles'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'clientorderDialog' . $client_order->id,
        ], 200);
    }

    public function store(ClientOrdersRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать заказ клиента' : 'Создавать заказ клиента');

        $request['phone'] = str_replace(array('(', ')', ' ', '-'), '', $request['phone']);
        $client_order = ClientOrder::firstOrNew(['id' => $request['id']]);

        if($client_order && $client_order->isShipped){
            return response()->json([
                'system_message' => ['Действия с заказом запрещены, заказ был отгружен']
            ], 422);
        }

        #Проверка на удаленные товары (Если отгрузки были, а человек пытается удалить отгруженные товары из заказа)
        if( $client_order->IsAnyProductShipped()) {
            $has_missed_article = false;
            foreach ($client_order->getShippedArticlesIds() as $id) {
                $has_missed_article = collect(array_column($request->products, 'id'))->contains($id) ? false : true;
                if ($has_missed_article) {
                    break;
                }
            }
            if($has_missed_article) {
                return response()->json([
                    'system_message' => ['Удаление отгруженного товара невозможно']
                ], 422);
            }
        }
        #Конец проверки


        if($client_order->IsAllProductsShipped()){
            $client_order->status = 'complete';
        }

        if ($request['inpercents'] === null || $request['inpercents'] === false || $request['inpercents'] === 0 || $request['inpercents'] === '0') {
            $request['inpercents'] = false;
        } else {
            $request['inpercents'] = true;
        }

        if ($request['inpercents']) {
            if ((int)$request['discount'] >= 100) {
                $request['discount'] = 100;
            }
            if ((int)$request['discount'] <= 0) {
                $request['discount'] = 0;
            }
        }

        if ($request['do_date'] == null) {
            $request['do_date'] = Carbon::now();
        }

        if ($client_order->exists) {
            $this->message = 'Заказ обновлен';
            $wasExisted = true;
            #Возвращаем на склад все товары из заказа
//            if ($client_order->status === 'complete') {
//                foreach ($client_order->articles()->get() as $article) {
//                    $store = $client_order->store()->first();
//                    $store->increaseArticleCount($article->id, $article->pivot->count);
//                }
//            }

        } else {
            $client_order->company_id = Auth::user()->company->id;
            $client_order->manager_id = Auth::user()->partner->id;
            $this->message = 'Заказ сохранен';
            $wasExisted = false;
        }


        $client_order->fill($request->only($client_order->fields));
        $client_order->store_id = Auth::user()->getStoreFirst()->id;
        $client_order->summ = 0;
        $client_order->balance = 0;
        $client_order->itogo = 0;
        $client_order->save();

        UA::makeUserAction($client_order, $wasExisted ? 'fresh' : 'create');
        $store = $client_order->store()->first();

        # Собираем товары в массив id шников из Request`a
        $plucked_articles = [];
        foreach ($request['products'] as $id => $products) {
            if ($id !== 'new') {
                $plucked_articles[] = $id;
            }
        }

        # Синхронизируем товары к складу
        $store->articles()->syncWithoutDetaching($plucked_articles, false);

        $client_order_data = [];

        $rp = array_reverse($request['products'], true);

        foreach ($rp as $id => $product) {
                $vcount = $product['count'];

                if($vcount < $client_order->getShippedCount($id)){
                    $name = 'products.' . $product['id'] . '.count';
                    return response()->json([
                        'messages' => [$name => ['Отгружено более ' . $vcount . ' товаров, декремент невозможен']]
                    ], 422);
                }

            if($client_order && $client_order->getShippedCount($id)){
                $vprice = $client_order->getProductPriceFromClientOrder($id);
            } else {
                $vprice = (double)$product['price'];
            }

            $vtotal = $vprice * $vcount;
            $client_order->summ += $vtotal;
            $pivot_data = [
                'store_id' => $client_order->store()->first()->id,
                'article_id' => (int)$id,
                'client_order_id' => $client_order->id,
                'count' => (int)$vcount,
                'price' => (double)$vprice,
                'total' => (double)$vtotal,
                'shipped_count' => $client_order->getShippedCount($id)
            ];
            $client_order_data[] = $pivot_data;
        }
        #Удаление всех отношений и запись новых (кастомный sync)
        $client_order->syncArticles($client_order->id, $client_order_data);

        if ($request['inpercents']) {
            $client_order->itogo = $client_order->summ - ($client_order->summ / 100 * $request['discount']);
        } else {
            if ($request['discount'] >= $client_order->summ) {
                $request['discount'] = $client_order->summ;
            }
            if ($request['discount'] <= 0) {
                $request['discount'] = 0;
            }
            $client_order->discount = $request['discount'];
            $client_order->itogo = $client_order->summ - $request['discount'];
        }

        $client_order->save();

        #Отнимаем со склада товары из заказа

//        $client_order->partner()->first()
//            ->subtraction($client_order->itogo);

        if($request->shipping){
            $response = $client_order->makeShipped();
            $client_order->setShiped();
            return response()->json($response['data'], $response['status']);
        }
        if ($request->expectsJson()) {
            return response()->json([
                'message' => $this->message,
                'id' => $client_order->id,
                'event' => 'ClientOrderStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

//    public function makeShipped(Request $request){
//        $client_order = ClientOrder::owned()->find($request->id);
//
//
//        return response()->json($response['data'], $response['status']);
//    }

    public function load(Request $request)
    {

    }

    public static function selectDialog(Request $request)
    {
        $clientOrders = ClientOrder::owned()
            ->when($request->search, function (Builder $query) use($request) {
                $query->where('id', 'like', "%{$request->search}%");
            })
            ->paginate(15);

        $tag = 'selectClientOrderDialog';

        $isInner = $request->has('page') || $request->has('search');

        $view_name = get_template() . '.client_orders.dialog.' . ($isInner ? 'select_client_order_inner' : 'select_client_order');

        $view = view($view_name, compact('clientOrders', 'request'))
            ->with('class', $tag);

        return response()->json([
            'html' => $view->render(),
            'tag' => $tag
        ]);
    }

    public function getClientOrdersProducts(ClientOrder $clientOrder)
    {
        return response()->json(['products' => $clientOrder->articles]);
    }

    public static function getClientOrders($request)
    {

        $size = 30;
        if (isset($request['size'])) {
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if (isset($request['sorters'])) {
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }
        if ($field === null && $dir === null) {
            $field = 'created_at';
            $dir = 'DESC';
        }

        if ($request['provider'] == null) {
            $request['provider'] = [];
        }

        if ($request['accountable'] == null) {
            $request['accountable'] = [];
        }

        $client_orders = ClientOrder::select(DB::raw('
            client_orders.*, client_orders.created_at as date, client_orders.id as coid
        '))
            ->from(DB::raw('(
            SELECT client_orders.*, IF(partners.type = 0, partners.fio, partners.companyName) as partner, CONCAT(client_orders.discount, IF(client_orders.inpercents = 1, \' %\',\' ₽\')) as discount_formatted,
            (CASE
                WHEN client_orders.status = "active" THEN "Активен"
                WHEN client_orders.status = "canceled" THEN "Отменен"
                WHEN client_orders.status = "full" THEN "Укомплектован"
                WHEN client_orders.status = "complete" THEN "Выполнен"
                ELSE "Статус не определён"
            END) AS status_formatted
            FROM client_orders
            left join partners on partners.id = client_orders.partner_id
            GROUP BY client_orders.id)
             client_orders
        '))
            ->when($request['provider'] != [], function ($query) use ($request) {
                $query->whereIn('partner_id', $request['provider']);
            })
            ->when($request['clientorder_status'] != null, function ($query) use ($request) {
                $query->where('status', $request['clientorder_status']);
            })
            ->when($request['accountable'] != [], function ($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['accountable']);
            })
            ->when($request['client'] != [], function ($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['client']);
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('client_orders.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->where('client_orders.company_id', Auth::user()->company()->first()->id)
            ->groupBy('client_orders.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);

        return $client_orders;
    }

    public function getSideInfo(Request $request)
    {
        $client_order = ClientOrder::owned()->where('id', $request['id'])->first();
        $partner = $client_order->partner()->first();
        $comment = $client_order->comment;
        if ($request->expectsJson()) {
            return response()->json([
                'info' => view(get_template() . '.client_orders.contact-card', compact('partner', 'request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

//    public function delete($id)
//    {
//        $client_order = ClientOrder::where('id', $id)->first();
//
//        $client_order->delete();
//        $this->status = 200;
//        $this->message = 'Заказ клиента удален';
//
//        return response()->json([
//            'id' => $client_order->id,
//            'message' => $this->message
//        ], $this->status);
//    }

    public function events(Request $request)
    {
        $client_orders = ClientOrder::owned()
            ->where(function ($q) use ($request) {
                if (isset($request['start']) && $request['start'] != 'null' && $request['start'] != '') {
                    $q->where('do_date', '>=', Carbon::parse($request['start']));
                }
                if (isset($request['end']) && $request['end'] != 'null' && $request['end'] != '') {
                    $q->where('do_date', '<=', Carbon::parse($request['end']));
                }
            })->get();
        $events = [];
        foreach ($client_orders as $order) {
            $events[] = [
                'title' => 'Заказ клиента #' . $order->id,
                'start' => $order->do_date,
                'end' => $order->do_date,
                'color' => '#ff9800',
                'extendedProps' => [
                    'modal' => 'clientorderDialog',
                    'alias' => 'client_order_id',
                    'id' => $order->id
                ]
            ];
        }

        return response($events);
    }
}
