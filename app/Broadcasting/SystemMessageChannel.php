<?php

namespace App\Broadcasting;

use App\Models\User;

class SystemMessageChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function join(User $user, int $sys_mess_id)
    {
        return true || false;
    }
}
