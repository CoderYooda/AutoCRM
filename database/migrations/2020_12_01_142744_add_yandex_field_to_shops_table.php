<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddYandexFieldToShopsTable extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {

            $table->string('payment_type')->nullable()->after('tinkoff_id');
            $table->renameColumn('tinkoff_id', 'payment_id');
            $table->renameColumn('tinkoff_url', 'payment_url');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {

            $table->dropColumn('payment_type');

            $table->renameColumn('payment_id', 'tinkoff_id');
            $table->renameColumn('payment_url', 'tinkoff_url');
        });
    }
}
