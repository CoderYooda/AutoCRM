<?php

namespace App\Http\Controllers;

use App\Models\ClientOrder;
use App\Models\Partner;
use App\Models\Store;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\Article;
use Auth;

class ClientOrdersController extends Controller
{
    public static function clientorderDialog($request)
    {
        $tag = 'clientorderDialog';

        if($request['client_order_id']){
            $client_order = ClientOrder::where('id', (int)$request['client_order_id'])->first();

            $client_order->articles = $client_order->articles()->get();

            foreach($client_order->articles as $article){


                $article->instock = $article->getCountInStoreId($client_order->store_id);
                if($article->instock >= $article->pivot->count){
                    $article->complited = true;
                } else {
                    $article->complited = false;
                }
            }
            $total_complited = true;

            foreach($client_order->articles as $article){
                if(!$article->complited){
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
            'html' => view('client_orders.dialog.form_client_order', compact( 'client_order', 'stores',  'request'))->render()
        ]);
    }

    public function delete($id)
    {
        $client_order = ClientOrder::where('id', $id)->first();

        if($client_order == null){
            return response()->json([
                'message' => 'Ошибка системы'
            ], 422);
        }

        $client_order->delete();
        $this->status = 200;
        $type = 'success';
        $this->message = 'Продажа удалена';
        return response()->json([
            'id' => $client_order->id,
            'type' => $type,
            'message' => $this->message
        ], 200);
    }

    public function fresh($id, Request $request)
    {
        $client_order = ClientOrder::where('id', (int)$id)->first();

        $client_order->articles = $client_order->articles()->get();

        foreach($client_order->articles as $article){
            $article->instock = $article->getCountInStoreId($client_order->store_id);
            if($article->instock >= $article->pivot->count){
                $article->complited = true;
            } else {
                $article->complited = false;
            }
        }

        $total_complited = true;

        foreach($client_order->articles as $article){
            if(!$article->complited){
                $total_complited = false;
            }
        }

        $client_order->total_complited = $total_complited;

        $request['fresh'] = true;
        $class = 'clientorderDialog' . $id;
        $content = view('client_orders.dialog.form_client_order', compact( 'client_order', 'stores', 'class', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'clientorderDialog' . $id,
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), self::validateRules($request));

        $request['phone'] = str_replace(array('(', ')', ' ', '-'), '', $request['phone']);

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }
        $client_order = ClientOrder::firstOrNew(['id' => $request['id']]);

        if($request['inpercents'] === null || $request['inpercents'] === false || $request['inpercents'] === 0){$request['inpercents'] = false;} else {
            $request['inpercents'] = true;
        }

        if($request['inpercents']){
            if((int)$request['discount'] >= 100){
                $request['discount'] = 100;
            }
            if((int)$request['discount'] <= 0){
                $request['discount'] = 0;
            }
        }

        if($request['do_date'] == null){
            $request['do_date'] = Carbon::now();
        }



        if($client_order->exists){
            $store = $client_order->store()->first();
            #Прибавляем к балансу предидущего партнера
            $client_order->partner()->first()
                ->addition($client_order->itogo);

            $this->message = 'Заказ обновлен';
            $wasExisted = true;

            #Производим действия со складом в зависимости статуса заказа


            #Возвращаем на склад все товары из заказа
            if($client_order->status === 'complete') {
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

        $store = $client_order->store()->first();

        # Собираем товары в массив id шников из Request`a
        $plucked_articles = [];
        foreach($request['products'] as $id => $products) {
            if($id !== 'new'){
                $plucked_articles[] = $id;
            }
        }
        # Синхронизируем товары к складу
        $store->articles()->syncWithoutDetaching($plucked_articles, false);
        $client_order_data = [];

        #### Проверка на дубли
        $messages = [];
        if(isset($request['products']['new'])){
            foreach($request['products']['new'] as $id => $product) {

                if ($id === 'new') {
                    $stock_supplier = Supplier::owned()->where('name', $product['new_supplier_name'])->first();
                    if($stock_supplier){
                        $art = ProductController::checkArticleUnique(null, $product['article'], $stock_supplier->id);
                        if($art !== null && $art) {
                            $article_errors[0] = '';
                            $supplier_errors[0] = '';
                            $messages['products.' . $product['id'] . '.article'] = $article_errors;
                            $messages['products.' . $product['id'] . '.new_supplier_name'] = $supplier_errors;
                        }
                    }
                }
            }
        }
        if(count($messages) > 0){
            return response()->json([
                'messages' => $messages
            ], 422);
        }

        #Сохраняем быстрые товары
        if(isset($request['products']['new'])){
            foreach($request['products']['new'] as $id => $product) {
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
                    $actor_product->name = $product['name'];
                    $actor_product->save();
                }
                $store = $client_order->store()->first();
                $pivot_data = [
                    'store_id' => $store->id,
                    'article_id' => (int)$actor_product->id,
                    'client_order_id' => $client_order->id,
                    'count' => (int)$vcount,
                    'price' => (double)$vprice,
                    'total' => (double)$vtotal
                ];
                $client_order_data[] = $pivot_data;
            }
        }


        foreach($request['products'] as $id => $product) {
            if ($id !== 'new') {

                //$store->decreaseArticleCount($id, $product['count']);

                $vcount = $product['count'];
                $vprice = $product['price'];
                $vtotal = $vprice * $vcount;
                $client_order->summ += $vtotal;
                $pivot_data = [
                    'article_id' => (int)$product['id'],
                    'client_order_id' => $client_order->id,
                    'count' => (int)$vcount,
                    'price' => (double)$vprice,
                    'total' => (double)$vtotal
                ];
                $client_order_data[] = $pivot_data;
            }
        }

        #Удаление всех отношений и запись новых (кастомный sync)
        $client_order->syncArticles($client_order->id, $client_order_data);

        if($request['inpercents']){
            $client_order->itogo = $client_order->summ - ($client_order->summ / 100 * $request['discount']);
        } else {
            if($request['discount'] >= $client_order->summ){
                $request['discount'] = $client_order->summ;
            }
            if($request['discount'] <= 0){
                $request['discount'] = 0;
            }
            $client_order->discount = $request['discount'];
            $client_order->itogo = $client_order->summ - $request['discount'];
        }

        $client_order->save();

        #Отнимаем со склада товары из заказа
        if($client_order->status === 'complete'){
            foreach($client_order->articles()->get() as $article){
                $store = $client_order->store()->first();
                $store->decreaseArticleCount($article->id, $article->pivot->count);
            }
        }

        $client_order->partner()->first()
            ->subtraction($client_order->itogo);






        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $client_order->id,
                'event' => 'clientOrderStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getClientOrdersProducts($id){
        $client_order = ClientOrder::where('id', $id)->first();
        return response()->json([
            'products' => $client_order->articles()->get()]);
    }

    public static function getClientOrders($request)
    {
        $client_orders = ClientOrder::owned()
            ->orderBy('created_at', 'DESC')
            ->where(function($q) use ($request){
                if(isset($request['date_start']) && $request['date_start'] != 'null' && $request['date_start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['date_start']));
                }
                if(isset($request['date_end']) && $request['date_end'] != 'null' && $request['date_end'] != ''){
                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
                }
            })
            ->where(function($q) use ($request){
                if(isset($request['search']) && $request['search'] !== 'null') {
                    if (mb_strlen($request['search']) === 1) {
                        $q->whereHas('partner', function ($q) use ($request) {
                            $q->where('fio', 'LIKE', $request['search'] . '%' )
                                ->orWhere('companyName', 'LIKE', $request['search'] . '%');
                        });
                    } else {
                        $q->whereHas('partner', function ($q) use ($request) {
                            $q->where('fio', 'LIKE', '%' . $request['search'] . '%')
                                ->orWhere('companyName', 'LIKE', '%' . $request['search'] . '%')
                                ->orWhereHas('phones', function ($query) use ($request) {
                                    $query->where('number', 'LIKE', '%' . $request['search'] . '%');
                                });
                        });
                    }
                }
            })
            ->paginate(16);

        return $client_orders;
    }

    public static function getSingleClientOrder($request)
    {
        $client_order = ClientOrder::owned()->where(function($q) use ($request) {
            if(isset($request['id']) && $request['id'] !== 'null') {
                $q->where('id', $request['id'] );
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


    private static function validateRules($request)
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:1000000', 'min:0'],
            'products' => ['required_without:quick_products'],
            'phone' => ['required'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00'],

            'products.new.*.price' => ['numeric', 'between:1,1000000.00'],
            'products.new.*.count' => ['integer', 'min:1', 'max:9999'],
            'products.new.*.name' => ['required', 'min:4', 'string', 'max:255'],
            'products.new.*.article' => ['required', 'string', 'max:64'],
            'products.new.*.new_supplier_name' => ['required', 'string', 'max:64'],

        ];

        return $rules;
    }

    public function events(Request $request){
        $client_orders = ClientOrder::owned()
            ->where(function($q) use ($request){
                if(isset($request['start']) && $request['start'] != 'null' && $request['start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['start']));
                }
                if(isset($request['end']) && $request['end'] != 'null' && $request['end'] != ''){
                    $q->where('do_date', '<=', Carbon::parse($request['end']));
                }
            })->get();
        $events = [];
        foreach($client_orders as $order){
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
