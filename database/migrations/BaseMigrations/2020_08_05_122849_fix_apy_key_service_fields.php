<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixApyKeyServiceFields extends Migration
{
    public function up()
    {
        \Illuminate\Support\Facades\DB::table('service_fields')->where('name', 'apy_key')->update(['name' => 'api_key']);
    }

    public function down()
    {
        //
    }
}
