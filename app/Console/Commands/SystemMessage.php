<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\User;
use Illuminate\Console\Command;
use App\Events\SystemMessage as SM;
use Auth;

class SystemMessage extends Command
{

    protected $signature = 'system:message {message} {reciever}';

    protected $description = 'Отправка системного сообщения';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Вызов события, пока просто выбирая первого пользователя

        $system_message = new \App\Models\SystemMessage();
        $system_message->user_id = 1;
        $system_message->type = 'success';
        $system_message->message = $this->argument('message');
        $system_message->reciever_id = $this->argument('reciever');
        $system_message->save();

        event(new SM($system_message));


        //broadcast(new SM($system_message, $user))->toOthers(); // Отправляю сообщение всем, кроме текущего пользователя
    }
}
