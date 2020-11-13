<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientOrdersRequest;
use App\Mail\Shop\RoadOrder;
use App\Mail\Shop\WaitOrder;
use App\Models\ClientOrder;
use App\Models\Order;
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
use Illuminate\Support\Facades\Mail;

class ClientOrdersController extends Controller
{
    public static function clientorderDialog(Request $request)
    {
        $co_id = $request['client_order_id'] ?? $request['clientorder_id'];

        $client_order = ClientOrder::find($co_id);

        $tag = 'clientorderDialog' . ($client_order->id ?? '');

        $items = $client_order ? $client_order->articles->load('supplier') : collect();

        foreach ($items as $key => $item) {
            $items[$key]['pivot_id'] = $item['pivot']['id'];
            $items[$key]['product_id'] = $item['id'];
//            $items[$key]['name'] = $item['name'];
//            $items[$key]['article'] = $item['article'];
            $items[$key]['supplier_name'] = $item->supplier->name;
//            $items[$key]['count'] = $item['count'];
//            $items[$key]['price'] = $item['price'];
//            $items[$key]['total'] = $item['total'];
            $items[$key]['store_count'] = $item->getCountInCurrentStore();
            $items[$key]['shipped_count'] = $item['shipped_count'];
        }

        $items = $items->toArray();

        $prefs = [
            'index' => 'ordinal',
            'use_nds' => false,
            'can_add_items' => true,
            'nds' => 0,
            'freeze' => false,
            'nds_included' => false
        ];

        $view = view(get_template() . '.client_orders.dialog.form_client_order', compact('client_order', 'request'))
            ->with('class', $tag)
            ->with('prefs', json_encode($prefs))
            ->with('items', json_encode($items))
            ->with('statuses', Order::$statuses);
        return response()->json([
            'tag' => $tag,
            'html' => $view->render()
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
        $request['clientorder_id'] = $client_order->id;
        $request['inner'] = 1;

        return self::clientorderDialog($request);
    }

    public function store(ClientOrdersRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать заказ клиента' : 'Создавать заказ клиента');

        return DB::transaction(function () use($request) {
            $request['phone'] = str_replace(['(', ')', ' ', '-'], '', $request['phone']);

            /** @var ClientOrder $client_order */
            $client_order = ClientOrder::firstOrNew(['id' => $request['id']]);

            if($request->shipping && $client_order->status < 2) {
                return response()->json([
                    'system_message' => ['В данный момент отгрузка недоступна.']
                ], 422);
            }

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

            if($client_order->order) {

                if($request->status == Order::WAIT_PICKUP_STATUS && $client_order->order->status != Order::WAIT_PICKUP_STATUS) {
                    Mail::to($client_order->order->email)->send(new WaitOrder($client_order->order));
                }

                if($request->status == Order::DELIVERY_STATUS && $client_order->order->status != Order::DELIVERY_STATUS) {
                    Mail::to($client_order->order->email)->send(new RoadOrder($client_order->order));
                }

                $client_order->order->update(['status' => $request->status]);
            }

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

            $rp = array_reverse($request['products'], true);

            $client_order->articles()->sync([]);

            foreach ($rp as $index => $product) {

                $product_id = $product['product_id'];
                $count = $product['count'];
                $price = (double)$product['price'];

                if(isset($product['pivot_id'])) {

                    $pivot_id = $product['pivot_id'];

                    if ($count < $client_order->getShippedCountByPivotId($pivot_id)) {
                        $name = 'products.' . $index . '.count';
                        return response()->json([
                            'messages' => [$name => ['Отгружено более ' . $count . ' товаров, декремент невозможен']]
                        ], 422);
                    }

                    if($client_order && $client_order->getShippedCountByPivotId($pivot_id)){
                        $price = $client_order->getProductPriceFromClientOrderByPivotId($pivot_id);
                    }
                }

                $total = $price * $count;
                $client_order->summ += $total;

                $pivot_data = [
                    'store_id' => null,
                    'count' => (int)$count,
                    'price' => (double)$price,
                    'total' => (double)$total,
                    'shipped_count' => isset($product['pivot_id']) ? $client_order->getShippedCountByPivotId($pivot_id) : 0
                ];

                $client_order->articles()->attach($product_id, $pivot_data);
            }

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

            return response()->json([
                'message' => $this->message,
                'id' => $client_order->id,
                'event' => 'ClientOrderStored',
            ], 200);
        });
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
            SELECT client_orders.*, IF(partners.type = 0, partners.fio, partners.companyName) as partner, CONCAT(client_orders.discount, IF(client_orders.inpercents = 1, \' %\',\' ₽\')) as discount_formatted
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

        foreach ($client_orders as $key => $client_order) {
            $client_orders[$key]['status'] = Order::$statuses[$client_order->status];
        }

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
