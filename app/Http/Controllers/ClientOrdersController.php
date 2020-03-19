<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientOrdersRequest;
use App\Models\ClientOrder;
use App\Models\Partner;
use App\Models\Store;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\Article;
use App\Http\Controllers\UserActionsController as UA;
use Auth;

class ClientOrdersController extends Controller
{
    public static function clientorderDialog($request)
    {
        $tag = 'clientorderDialog';

        if ($request['client_order_id']) {
            $client_order = ClientOrder::where('id', (int)$request['client_order_id'])->first();

            $client_order->articles = $client_order->articles()->get();

            foreach ($client_order->articles as $article) {
                $article->instock = $article->getCountInStoreId($client_order->store_id);
                if ($article->instock >= $article->pivot->count) {
                    $article->complited = true;
                } else {
                    $article->complited = false;
                }
            }
            $total_complited = true;

            foreach ($client_order->articles as $article) {
                if (!$article->complited) {
                    $total_complited = false;
                }
            }

            $client_order->total_complited = $total_complited;

            $tag .= $client_order->id;
        } else {
            $client_order = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.form_client_order', compact('client_order', 'stores', 'request'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $client_orders = ClientOrdersController::getClientOrders($request);

        foreach ($client_orders as $client_order) {
            $client_order->date = $client_order->created_at->format('Y.m.d/H:i');
        }

        return response()->json($client_orders);
    }

    public function delete($id, Request $request)
    {
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


    public function fresh($id, Request $request)
    {
        $client_order = ClientOrder::where('id', (int)$id)->first();

        $client_order->articles = $client_order->articles()->get();

        foreach ($client_order->articles as $article) {
            $article->instock = $article->getCountInStoreId($client_order->store_id);
            if ($article->instock >= $article->pivot->count) {
                $article->complited = true;
            } else {
                $article->complited = false;
            }
        }

        $total_complited = true;

        foreach ($client_order->articles as $article) {
            if (!$article->complited) {
                $total_complited = false;
            }
        }

        $client_order->total_complited = $total_complited;

        $request['fresh'] = true;
        $class = 'clientorderDialog' . $id;
        $content = view(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.form_client_order', compact('client_order', 'stores', 'class', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'clientorderDialog' . $id,
        ], 200);
    }

    public function store(ClientOrdersRequest $request)
    {
        $request['phone'] = str_replace(array('(', ')', ' ', '-'), '', $request['phone']);
//        if ($request->fails()) {
//            $this->status = 422;
//            if ($request->expectsJson()) {
//                return response()->json(['messages' => $validation->errors()], $this->status);
//            }
//        }

        $client_order = ClientOrder::firstOrNew(['id' => $request['id']]);

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
            $store = $client_order->store()->first();
            #Прибавляем к балансу предидущего партнера
            $client_order->partner()->first()
                ->addition($client_order->itogo);

            $this->message = 'Заказ обновлен';
            $wasExisted = true;

            #Производим действия со складом в зависимости статуса заказа


            #Возвращаем на склад все товары из заказа
            if ($client_order->status === 'complete') {
                foreach ($client_order->articles()->get() as $article) {
                    $store = $client_order->store()->first();
                    $store->increaseArticleCount($article->id, $article->pivot->count);
                }
            }

        } else {
            $client_order->company_id = Auth::user()->company()->first()->id;
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

        #### Проверка на дубли
        $messages = [];
        if (isset($request['products']['new'])) {
            foreach ($request['products']['new'] as $id => $product) {

                if ($id === 'new') {
                    $stock_supplier = Supplier::owned()->where('name', $product['new_supplier_name'])->first();
                    if ($stock_supplier) {
                        $art = ProductController::checkArticleUnique(null, $product['article'], $stock_supplier->id);
                        if ($art !== null && $art) {
                            $article_errors[0] = '';
                            $supplier_errors[0] = '';
                            $messages['products.' . $product['id'] . '.article'] = $article_errors;
                            $messages['products.' . $product['id'] . '.new_supplier_name'] = $supplier_errors;
                        }
                    }
                }
            }
        }
        if (count($messages) > 0) {
            return response()->json([
                'messages' => $messages
            ], 422);
        }

        #Сохраняем быстрые товары
        if (isset($request['products']['new'])) {
            foreach ($request['products']['new'] as $id => $product) {
                $vcount = (int)$product['count'];
                $vprice = (double)$product['price'];
                $vtotal = $vprice * $vcount;
                $client_order->summ += $vtotal;
                $supplier = SupplierController::silent_store($product);
                //$article = ProductController::checkArticleUnique(null, $product['article'], $supplier->id);
                $actor_product = Article::firstOrNew([
                    'article' => $product['article'],
                    'supplier_id' => $supplier->id,
                    'company_id' => Auth::user()->company()->first()->id
                ]);
                if (!$actor_product->exists) {
                    $actor_product->category_id = 10;
                    $actor_product->creator_id = Auth::user()->id;
                    $actor_product->name = $product['name'];
                    $actor_product->save();

                    $prepared_article = mb_strtolower(str_replace(' ', '', $actor_product->article));
                    $prepared_supplier = mb_strtolower(str_replace(' ', '', $actor_product->supplier()->first()->name));
                    $prepared_name = mb_strtolower(str_replace(' ', '', $actor_product->name));
                    $prepared_barcode = mb_strtolower(str_replace(' ', '', $actor_product->barcode));

                    $actor_product->foundstring = $prepared_article . $prepared_supplier . $prepared_barcode . $prepared_name;
                    //
                    $actor_product->save();

                }
                $pivot_data = [
                    'store_id' => $client_order->store()->first()->id,
                    'article_id' => (int)$actor_product->id,
                    'client_order_id' => $client_order->id,
                    'count' => (int)$vcount,
                    'price' => (double)$vprice,
                    'total' => (double)$vtotal
                ];
                $client_order_data[] = $pivot_data;
            }
        }


        foreach ($request['products'] as $id => $product) {
            if ($id !== 'new') {

                //$store->decreaseArticleCount($id, $product['count']);

                $vcount = $product['count'];
                $vprice = $product['price'];
                $vtotal = $vprice * $vcount;
                $client_order->summ += $vtotal;
                $pivot_data = [
                    'store_id' => $client_order->store()->first()->id,
                    'article_id' => (int)$product['id'],
                    'client_order_id' => $client_order->id,
                    'count' => (int)$vcount,
                    'price' => (double)$vprice,
                    'total' => (double)$vtotal
                ];
                $client_order_data[] = $pivot_data;
            }
        }
        //dd($client_order_data);
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
        if ($client_order->status === 'complete') {
            foreach ($client_order->articles()->get() as $article) {
                $store = $client_order->store()->first();
                $store->decreaseArticleCount($article->id, $article->pivot->count);
            }
        }

        $client_order->partner()->first()
            ->subtraction($client_order->itogo);


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

    public function load(Request $request)
    {

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
            //dd(Carbon::parse($dates[0]));
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
            SELECT client_orders.*, IF(partners.isfl = 1, partners.fio, partners.companyName) as partner, CONCAT(client_orders.discount, IF(client_orders.inpercents = 1, \' %\',\' р\')) as discount_formatted,
            (CASE
                WHEN client_orders.status = "active" THEN "Активен"
                WHEN client_orders.status = "canceled" THEN "Отменен"
                WHEN client_orders.status = "full" THEN "Укомплектован"
                WHEN client_orders.status = "complete" THEN "Выполнен"
                ELSE 1
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
                'info' => view(env('DEFAULT_THEME', 'classic') . '.client_orders.contact-card', compact('partner', 'request'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact('comment', 'request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public static function getSingleClientOrder($request)
    {
        $client_order = ClientOrder::owned()->where(function ($q) use ($request) {
            if (isset($request['id']) && $request['id'] !== 'null') {
                $q->where('id', $request['id']);
            }
        })->first();

        return $client_order;
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
