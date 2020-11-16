<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /** @var Order */
    protected $orders_count = 0;
    protected $user_id = null;

    public function __construct(int $user_id, int $count)
    {
        $this->orders_count = $count;
        $this->user_id = $user_id;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('system_message.'.$this->user_id);
    }

    public function broadcastWith()
    {
        return [
            'orders_count' => $this->orders_count
        ];
    }
}
