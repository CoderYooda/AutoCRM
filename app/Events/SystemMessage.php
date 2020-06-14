<?php

namespace App\Events;

use App\Broadcasting\SystemMessageChannel;
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

    protected  $message;
    protected  $user;

    public function __construct(SM $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('system_message.' . $this->message->reciever_id);
    }

    public function broadcastWith()
    {
        $message = $this->message;
        return [
            'view' => view(env('DEFAULT_THEME', 'classic') . '.system.message.message', compact('message'))->render()
        ];
    }

//    public function broadcastWith()
//    {
//        return [
//            'view' => view('classic.tasks.system_message.index')->render()
//        ];
//    }
}
