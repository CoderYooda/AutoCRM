<?php

Broadcast::routes(['middleware' => ['web', 'auth']]);

Broadcast::channel('chat.1', function() {
    return true;
});
