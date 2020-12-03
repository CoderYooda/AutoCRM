<?php

use App\Models\Order;
//Broadcast::routes(["prefix" => "api", 'middleware' => ['auth:api', 'SocketAuth']]);
Broadcast::routes(['middleware' => ['auth:api']]);

Broadcast::channel('system_message.{user_id}', function() {
    return true;
});
Broadcast::channel('company.{company_id}', function() {
    return true;
});

