<?php

namespace App\Events;

use App\Models\Setting;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SettingsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected  $setting;

    public function __construct(Setting $setting)
    {
        $this->setting = $setting;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('company.' . $this->setting->company_id);
    }

    public function broadcastWith()
    {
        $setting = $this->setting;
        return [
            'setting' => $setting
        ];
    }
}
