<?php

namespace App\Observers;

use App\Events\SystemMessage;
use App\Models\Order;
use App\Models\SystemMessage as SM;
use App\Models\User;

class OrderObserver
{
    public function updated(Order $order)
    {

    }
}
