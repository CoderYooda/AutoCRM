<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAnalyticsShopFields extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('yandex_metrics')->nullable();
            $table->string('yandex_verification')->nullable();
            $table->string('google_analytics')->nullable();
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('yandex_metrics');
            $table->dropColumn('yandex_verification');
            $table->dropColumn('google_analytics');
        });
    }
}
