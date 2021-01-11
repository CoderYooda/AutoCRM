<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class StoreImportIteration implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $percent = 0;
    protected $user_id = null;

    public function __construct($percent, $user_id)
    {
        $this->percent = $percent;
        $this->user_id = $user_id;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('system_message.' . $this->user_id);
    }

    public function broadcastWith()
    {
        return ['percent' => $this->percent];
    }
}
