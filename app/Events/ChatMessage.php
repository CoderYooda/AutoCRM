<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChatMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $sm;

    public function __construct(\App\Models\SystemMessage $sm)
    {
        $this->sm = $sm;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return [
            "chat." . $this->sm->reciever_id
        ];
        //return new PrivateChannel('chat.1');
    }

    public function broadcastWith()
    {
        return [
            'view' => view('classic.tasks.system_message.index')->render()
        ];
    }
}
