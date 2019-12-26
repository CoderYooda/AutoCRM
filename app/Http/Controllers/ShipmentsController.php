<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Validator;
use App\Models\Article;
use Auth;

class ShipmentsController extends Controller
{
    public static function shipmentDialog($request)
    {
        $tag = 'shipmentDialog';

        if($request['shipment_id']){
            $shipment = Shipment::where('id', (int)$request['shipment_id'])->first();
            $tag .= $shipment->id;
        } else {
            $shipment = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view('shipments.dialog.form_shipment', compact( 'shipment','request'))->render()
        ]);
    }

    public function delete($id)
    {
        $shipment = Shipment::where('id', $id)->first();

        foreach($shipment->articles()->get() as $article){
            $store = $shipment->store()->first();
            $store->increaseArticleCount($article->id, $shipment->getArticlesCountById($article->id));
        }

        #Добавляем к балансу контрагента
        $shipment->partner()->first()->subtraction($shipment->itogo);

        $shipment->articles()->sync(null);

        $shipment->delete();
        $this->status = 200;
        $this->message = 'Продажа удален';

        return response()->json([
            'id' => $shipment->id,
            'message' => $this->message
        ], 200);
    }

    public function fresh($id, Request $request)
    {
        $shipment = Shipment::where('id', (int)$id)->first();
        $stores = Store::owned()->get();
        $request['fresh'] = true;
        $class = 'shipmentDialog' . $id;
        $inner = true;
        $content = view('shipments.dialog.form_shipment', compact( 'shipment', 'stores', 'class', 'inner', 'request'))
            ->render();

        return response()->json([
            'html' => $content,
            'target' => 'shipmentDialog' . $id,
        ], 200);
    }

    public function store(Request $request)
    {
        $shipment = Shipment::firstOrNew(['id' => $request['id']]);

        $validation = Validator::make($request->all(), self::validateRules());

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
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($shipment->exists){
            $shipmentWasExisted = true;
            $this->message = 'Продажа обновлена';
            #Отнимаем с баланса контрагента
            $shipment->partner()->first()->addition($shipment->itogo);
        } else {
            $shipmentWasExisted = false;
            $shipment->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Продажа сохранена';
        }

        $shipment->fill($request->only($shipment->fields));
        $shipment->summ = 0;
        $shipment->balance = 0;
        $shipment->itogo = 0;
        $shipment->save();

        ##########################################################################


//dd($shipment->articles()->get());
        $store = $shipment->store()->first();

        if($shipmentWasExisted){
            foreach($shipment->articles()->get() as $article){

                $store->increaseArticleCount($article->id, $article->pivot->count);
            }
        }

        if(count($request['products'])){
            # Собираем товары в массив id шников из Request`a
            $plucked_articles = [];
            foreach($request['products'] as $product) {
                $plucked_articles[] = $product['id'];
            }
            # Синхронизируем товары к складу
            $store->articles()->syncWithoutDetaching($plucked_articles, false);
        }

        //$store = Store::where('id', $request['store_id'])->first();
        $shipment_data = [];
        foreach($request['products'] as $product) {

            $store->decreaseArticleCount($product['id'], $product['count']);

            $vcount = $product['count'];
            $vprice = $product['price'];
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

        $shipment->save();

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

    public function getShipmentProducts($id){
        $shipment = Shipment::where('id', $id)->first();

        return response()->json([
            'products' => $shipment->getArticles()]);
    }

    public static function getShipments($request)
    {
        $shipments = Shipment::owned()
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

        return $shipments;
    }

    private static function validateRules()
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:1000000', 'min:0'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00'],
        ];

        return $rules;
    }

    public function events(Request $request){
        $client_orders = Shipment::owned()
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
