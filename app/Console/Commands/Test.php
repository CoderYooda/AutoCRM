<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\DecoderController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\SystemMessage as SM;
use App\Events\SystemMessage;

class Test extends Command
{
    protected $signature = 'system:message {message}';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $system_message = new SM();
        $system_message->type = 'test';
        $system_message->message = $this->argument('message');
        $system_message->save();

        event(new SystemMessage($system_message)); // Это для примера. Отправка сообщения всем активным пользователям канала
        ///broadcast(new SystemMessage($system_message))->toOthers(); // Отправляю сообщение всем, кроме текущего пользователя
    }
}
