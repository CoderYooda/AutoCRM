<?php

namespace App\Http\Controllers\API;

use App\Models\Warrant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use stdClass;

class EvotorController extends Controller
{
    public function longPulling(){
        $user = User::find(15);
        $warrants = Warrant::orderBy('id','DESC')->where('company_id', $user->company_id)->get();
        $warrants_resp = collect();
        foreach ($warrants as $warrant){
            $w = new stdClass();
            $w->id = $warrant->id;
            $w->isIncoming = $warrant->isIncoming ? 'true' : 'false';
            $w->name = $warrant->isIncoming ? "Приходный ордер № " . $warrant->id : "Расходный ордер № " . $warrant->id;
            $w->summ = $warrant->summ;
            $w->date = $warrant->created_at->diffForHumans();

            $w->created_at = $warrant->created_at->format('m.d.Y H:i');
            $w->partner = $warrant->partner->outputName();
            $w->partner_id = $warrant->partner->id;
            $w->cashbox = $warrant->cashbox->name;
            $w->cashbox_id = $warrant->cashbox->id;
            $w->dds = $warrant->ddsarticle->name;
            $w->dds_id = $warrant->ddsarticle->id;
            $w->comment = $warrant->comment;
            $w->reason = $warrant->reason;
            $warrants_resp->push($w);
        }
        return response()->json(['warrants' => $warrants_resp], 200);
    }
}
