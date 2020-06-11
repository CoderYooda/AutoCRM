<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use App\Events\SystemMessage as SM;

class SystemMessage extends Command
{

    protected $signature = 'system:message {message}';

    protected $description = 'Отправка системного сообщения';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Вызов события, пока просто выбирая первого пользователя
        $user = User::first();

        $system_message = new \App\Models\SystemMessage();
        $system_message->user_id = 1;
        $system_message->type = 'test';
        $system_message->message = $this->argument('message');
        $system_message->save();

        event(new SM($system_message, $user)); // Это для примера. Отправка сообщения всем активным пользователям канала
        broadcast(new SM($system_message, $user))->toOthers(); // Отправляю сообщение всем, кроме текущего пользователя
    }
}
