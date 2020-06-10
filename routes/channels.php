<?php

Broadcast::routes(['middleware' => ['web', 'auth']]);

//Broadcast::channel('App.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});

Broadcast::channel('chat.1', function() {
    return true;
});