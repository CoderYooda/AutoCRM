<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use App\Models\SystemMessage as SM;

class CompaniesStocksOfProduct
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected  $message;

    /**
     * Create a new event instance.
     *
     * @param SM $message
     */
    public function __construct(SM $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('system_message.' . $this->message->reciever_id);
    }

    public function broadcastWith()
    {
        $message = $this->message;
        return [
            'view' => view(get_template() . '.system.message.message', compact('message'))->render()
        ];
    }
}
