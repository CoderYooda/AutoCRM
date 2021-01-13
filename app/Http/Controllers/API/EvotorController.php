<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\System\EvotorQueueController;
use App\Models\Cashbox;
use App\Models\System\EvotorQueue;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use stdClass;

class EvotorController extends Controller
{
    public function longPulling(){
        $pull_seconds = 0;
        while ($pull_seconds < 10){
            $queue = self::checkQueueElem();
            if($queue != null){
                $warrant = Warrant::where('id', $queue->warrant_id)->first();
                $queue->sended = true;
                $queue->save();
                return response()->json(['warrants' => $warrant], 200);
            }
            sleep(1);
            $pull_seconds++;
        }
        return response()->json(['warrants' => 'null'], 200);
    }

    private static function checkQueueElem()
    {
        return EvotorQueue::where('complited', '!=', true)->where('complited', false)->first();
    }

    public function getWarrantItems($id){
        $warrant = Warrant::find($id);
        if($warrant->payable){
            $products = $warrant->payable->products;

            foreach($products as $product){
                $product->count = $product->pivot->count;
                $product->price = $product->pivot->price;
            }
        }
        return response()->json(['articles' => $products], 200);
    }

    public function setWarrantPayed(Request $request){

        if($request['cashbox_uuid'] == 'demo1234'){
            return response()->json([], 200);
        }
        $cashbox = Cashbox::where('cashbox_uuid', $request['cashbox_uuid'])->first();

        $warrant = Warrant::find($request['warrant_id']);

        if($warrant->cashbox_id == $cashbox->id){
            $warrant->payed_by = 'evotor';
            $warrant->payed_at = Carbon::now();
            $warrant->saveQuietly();
        }

        return response()->json([], 200);
    }

    public function getWarrantToPrint($uuid){

        if($uuid == 'demo1234'){
            $warrants = Warrant::where('isIncoming', 1)
                ->orderByDesc('id')->limit(20)
                ->whereIn('payable_type', ['App\Models\Shipment', 'App\Models\ClientOrder'])
                ->get();
        } else {
            $warrants = Warrant::whereHas('cashbox', function($q) use ($uuid){
                $q->where('cashbox_uuid', $uuid);
            })->where('payed_at', null)
                ->where('isIncoming', 1)
                ->whereIn('payable_type', ['App\Models\Shipment', 'App\Models\ClientOrder'])
                ->orderByDesc('id')->limit(20)
                ->get();
        }

        $warrants_arr = [];

        foreach($warrants as $warrant){
            if(!$warrant->payable || $warrant->cashbox()->first() == null){
                break;
            }

            try{
                $warrant->isIncoming = $warrant->isIncoming ? 'true' : 'false';
                $warrant->name = $warrant->isIncoming ? "Приходный ордер № " . $warrant->id : "Расходный ордер № " . $warrant->id;
                $warrant->date = $warrant->created_at->diffForHumans();
                //$warrant->created_at = $warrant->created_at->format('m.d.Y H:i');
                $warrant->partner = $warrant->partner()->first()->outputName();
                $warrant->partner_id = $warrant->partner()->first()->id;
                $warrant->cashbox = $warrant->cashbox()->first()->name;
                $warrant->cashbox_id = $warrant->cashbox()->first()->id;
                $warrant->dds = $warrant->ddsarticle->name;
                $warrant->dds_id = $warrant->ddsarticle->id;
                #Payments
                $warrant->payment = 0;

                if($warrant->payable){
                    if($warrant->payable->summ == null){
                        $percent = 0;
                    } else {
                        if($warrant->payable->inpercents){
                            $percent = $warrant->payable->discount;
                        } else {
                            $percent = $warrant->payable->discount * 100 / $warrant->payable->summ;
                        }
                    }
                    $warrant->disc = $percent;
                    $products = $warrant->payable->products;
                    $products_collection = collect();
                    foreach($products as $article){
                        $temp_product = new stdClass();
                        $temp_product->price = $article->pivot->price;
                        $temp_product->count = $article->pivot->count;
                        $products_collection->push($temp_product);
                    }

                    $warrant->items = $products_collection;//$articles_collection;
                } else {
                    $warrant->disc = 0;
                    $warrant->items = [];
                }

                $warrants_arr[] = $warrant;
            }catch(Exception $e){

            }



        }
        return response()->json(['warrants' => $warrants_arr], 200);
    }

//    public function getWarrantToPrint($id){
//        $user = User::find(2);
//        $warrant = Warrant::whereId($id)->where('company_id', $user->company_id)->first();
//
//        $warrant->isIncoming = $warrant->isIncoming ? 'true' : 'false';
//        $warrant->name = $warrant->isIncoming ? "Приходный ордер № " . $warrant->id : "Расходный ордер № " . $warrant->id;
//        $warrant->date = $warrant->created_at->diffForHumans();
//        //$warrant->created_at = $warrant->created_at->format('m.d.Y H:i');
//        $warrant->partner = $warrant->partner()->first()->outputName();
//        $warrant->partner_id = $warrant->partner()->first()->id;
//        $warrant->cashbox = $warrant->cashbox()->first()->name;
//        $warrant->cashbox_id = $warrant->cashbox()->first()->id;
//        $warrant->dds = $warrant->ddsarticle->name;
//        $warrant->dds_id = $warrant->ddsarticle->id;
//        #Payments
//        $warrant->payment = 0;
//
//        if($warrant->payable->inpercents){
//            $percent = $warrant->payable->discount;
//        } else {
//            $percent = $warrant->payable->discount * 100 / $warrant->payable->summ;
//        }
//
//        $warrant->disc = $percent;
//        $articles = $warrant->payable->products;
//        foreach($articles as $article){
//            $article->price = $article->pivot->price;
//            $article->count = $article->pivot->count;
//        }
//
//        $warrant->items = $articles;
//
//        return response()->json(['warrant' => $warrant], 200);
//    }
}
