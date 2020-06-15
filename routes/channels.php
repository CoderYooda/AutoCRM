<?php

Broadcast::routes(['middleware' => ['web', 'auth']]);

Broadcast::channel('system_message.{user_id}', function() {
    return true;
});
