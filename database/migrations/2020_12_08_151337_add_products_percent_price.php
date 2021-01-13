<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductsPercentPrice extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->decimal('markup', 12, 2)->default(0.0);
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('markup');
        });
    }
}
