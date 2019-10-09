<?php

namespace App\Http\Controllers;

use App\Models\ClientOrder;
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

        $client_order->delete();
        $this->status = 200;
        $this->message = 'Продажа удален';

        return response()->json([
            'id' => $client_order->id,
            'message' => $this->message
        ], 200);
    }

    public function store(Request $request){

        $client_order = ClientOrder::firstOrNew(['id' => $request['id']]);

//        if($entrance->locked){
//            return response()->json([
//                'system_message' => view('messages.locked_error')->render(),
//            ], 422);
//        }

        $validation = Validator::make($request->all(), self::validateRules($request));

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

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($client_order->exists){
            $this->message = 'Продажа обновлена';
        } else {
            $client_order->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Продажа сохранена';
        }
        $client_order->fill($request->only($client_order->fields));
        $client_order->summ = 0;
        $client_order->balance = 0;
        $client_order->itogo = 0;
        $client_order->save();

        //$store = Store::where('id', $request['store_id'])->first();
        foreach($request['products'] as $id => $product) {

            $vcount = $product['count'];
            $vprice = $product['price'];

            $vtotal = $vprice * $vcount;

            $client_order->summ += $vtotal;
            $actor_product = Article::where('id', $product['id'])->first();

            $article_client_order = $client_order->articles()->where('article_id', $product['id'])->count();

            ### Пересчёт кол-ва с учетом предидущего поступления #######################################
//            $store->articles()->syncWithoutDetaching($actor_product->id);
//            $beforeCount = $entrance->getArticlesCountById($actor_product->id);
//            $count = (int)$store->getArticlesCountById($actor_product->id) - (int)$beforeCount + (int)$vcount;
            //$count - Текущее кол-во на складе в наличии
            #############################################################################################

            $pivot_data = [
                'store_id' => 1,
                'count' => $vcount,
                'price' => $vprice,
                'total' => $vtotal
            ];


            if($article_client_order > 0){
                $client_order->articles()->updateExistingPivot($product['id'], $pivot_data);
            } else {
                $client_order->articles()->save($actor_product, $pivot_data);
            }

            //$store->articles()->updateExistingPivot($actor_product->id, ['count' => $count]);
        }

        $client_order->articles()->sync(array_column($request['products'], 'id'));

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
            //$client_order->itogo = $client_order->summ - $request['discount'];
        }

        $client_order->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
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

    private static function validateRules($request)
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:1000000', 'min:0'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'max:9999'],
            'products.*.price' => ['integer', 'max:999999'],
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
