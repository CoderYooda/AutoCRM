<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class StoreImportFinish implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $params = [];
    protected $info = [];

    public function __construct(array $params, array $info)
    {
        $this->params = $params;
        $this->info = $info;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('system_message.' . $this->params['user_id']);
    }

    public function broadcastWith()
    {
        return ['info' => $this->info];
    }
}
