<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditCashboxTable extends Migration
{
    public function up()
    {
        Schema::table('cashboxes', function (Blueprint $table) {
            $table->decimal('balance', 12, 2)->change();
        });
    }

    public function down()
    {
        Schema::table('cashboxes', function (Blueprint $table) {
            $table->integer('balance')->change();
        });
    }
}
