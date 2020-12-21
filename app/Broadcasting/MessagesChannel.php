<?php

namespace App\Broadcasting;

use App\Models\User;

class MessagesChannel
{
    public function __construct()
    {
        //
    }

    public function join(User $user, int $task_id)
    {
        return true || false;
    }
}
