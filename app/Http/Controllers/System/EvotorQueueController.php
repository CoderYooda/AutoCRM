<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\System\EvotorQueue;

class EvotorQueueController extends Controller
{
    public static function pushToQueue($cashbox_id, $warrant_id)
    {
        $queue = EvotorQueue::firstOrNew(['cashbox_id' => $cashbox_id, 'warrant_id' => $warrant_id]);
        if(!$queue->exists()){
            $queue->cashbox_id = $cashbox_id;
            $queue->warrant_id = $warrant_id;
            return $queue->save() ? $queue : false;
        } else {
            return false;
        }
    }

    public static function getQueueItem(){

    }
}
