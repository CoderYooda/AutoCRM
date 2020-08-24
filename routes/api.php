<?php

use Illuminate\Http\Request;

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');

Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');
