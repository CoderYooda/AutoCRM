<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\System\EvotorQueueController;
use App\Models\System\EvotorQueue;
use App\Models\Warrant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
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

    public function getWarrantToPrint($id){
        $user = User::find(2);
        $warrant = Warrant::whereId($id)->where('company_id', $user->company_id)->first();

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
        
        if($warrant->payable->inpercents){
            $percent = $warrant->payable->discount;
        } else {
            $percent = $warrant->payable->discount * 100 / $warrant->payable->summ;
        }

        $warrant->disc = $percent;
        $articles = $warrant->payable->articles;
        foreach($articles as $article){
            $article->price = $article->pivot->price;
            $article->count = $article->pivot->count;
        }

        $warrant->items = $articles;

        return response()->json(['warrant' => $warrant], 200);
    }
}
