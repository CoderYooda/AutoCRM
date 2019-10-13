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

class SystemMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(SM $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return ['base_channel'];
    }

    public function broadcastAs()
    {
        return 'user_' . $this->message->reciever_id . '_channel';
    }
}
