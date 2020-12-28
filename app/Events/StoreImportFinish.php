<?php

namespace App\Events;

use App\Models\ImportHistory;
use Carbon\Carbon;
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
        $last_imports = ImportHistory::with('partner', 'store')
            ->where('company_id', $this->params['company_id'])
            ->where('created_at', '>', Carbon::now()->addDays(-14))
            ->get();

        return [
            'info' => $this->info,
            'html' => view(get_template() . '.settings.elements.import_history', compact('last_imports'))->render()
        ];
    }
}
