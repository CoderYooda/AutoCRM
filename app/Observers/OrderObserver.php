<?php

namespace App\Observers;

use App\Events\OrderUpdated;
use App\Events\SystemMessage;
use App\Models\Order;
use App\Models\SystemMessage as SM;
use App\Models\User;

class OrderObserver
{
    public function updated(Order $order)
    {
        $users = User::where('company_id', $order->company_id)->get();
        $orders_count = Order::where('company_id', $order->company_id)->where('status', 0)->count();
        foreach($users as $user){
            event(
                new OrderUpdated($user->id, $orders_count)
            );
        }
    }
}
