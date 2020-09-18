<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditSettingFifoName extends Migration
{
    public function up()
    {
        DB::table('settings')
            ->where('name', 'Способ расчета себестоимости товаров')
            ->update(['name' => 'Способ ведения складского учёта']);
    }

    public function down()
    {
        DB::table('settings')
            ->where('name', 'Способ ведения складского учёта')
            ->update(['name' => 'Способ расчета себестоимости товаров']);
    }
}
