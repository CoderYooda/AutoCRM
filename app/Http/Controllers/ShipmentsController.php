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

        $shipment->delete();
        $this->status = 200;
        $this->message = 'Продажа удален';

        return response()->json([
            'id' => $shipment->id,
            'message' => $this->message
        ], 200);
    }

    public function store(Request $request){

        $shipment = Shipment::firstOrNew(['id' => $request['id']]);

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
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($shipment->exists){
            $this->message = 'Продажа обновлена';
        } else {
            $shipment->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Продажа сохранена';
        }
        $shipment->fill($request->only($shipment->fields));
        $shipment->summ = 0;
        $shipment->balance = 0;
        $shipment->itogo = 0;
        $shipment->save();

        //$store = Store::where('id', $request['store_id'])->first();
        foreach($request['products'] as $id => $product) {

            $vcount = $product['count'];
            $vprice = $product['price'];

            $vtotal = $vprice * $vcount;

            $shipment->summ += $vtotal;
            $actor_product = Article::where('id', $product['id'])->first();

            $article_shipment = $shipment->articles()->where('article_id', $product['id'])->count();

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


            if($article_shipment > 0){
                $shipment->articles()->updateExistingPivot($product['id'], $pivot_data);
            } else {
                $shipment->articles()->save($actor_product, $pivot_data);
            }

            //$store->articles()->updateExistingPivot($actor_product->id, ['count' => $count]);
        }

        $shipment->articles()->sync(array_column($request['products'], 'id'));

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

        $shipment->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'event' => 'ShipmentStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getShipmentProducts($id){
        $shipment = Shipment::where('id', $id)->first();

        return response()->json([
            'products' => $shipment->articles()->get()]);
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
