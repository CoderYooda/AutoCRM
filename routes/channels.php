<?php

use App\Broadcasting\CompanyChannel;

Broadcast::routes(['middleware' => ['web', 'auth']]);

Broadcast::channel('company_message.{company}', CompanyChannel::class);

Broadcast::channel('system_message.{user_id}', function() {
    return true;
});
