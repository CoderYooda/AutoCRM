<?php

use Illuminate\Http\Request;

Route::get('/', function () {
    abort(404, 'Not found');
});
