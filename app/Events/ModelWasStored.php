<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ModelWasStored implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $company_id;
    protected $event;

    public function __construct($company_id, $event)
    {
        $this->company_id = $company_id;
        $this->event = $event;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('company_message.' . $this->company_id);
    }

    public function broadcastWith()
    {
        $data = [
            'company_id' => $this->company_id,
            'model' => $this->event
        ];

        if($this->event == 'OrderStored') {

            $data['count'] = Order::where([
                'company_id' => $this->company_id,
                'status' => 0
            ])
            ->count();
        }

        return $data;
    }
}
