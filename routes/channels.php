<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::routes(['middleware' => ['web', 'auth']]);
Broadcast::channel('system_message.1', \App\Broadcasting\SystemMessageChannel::class);

Broadcast::channel('system_message', function(\App\Models\User $user, int $task_id) {
    return true || false;
});
