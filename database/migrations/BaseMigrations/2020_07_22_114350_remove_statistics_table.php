<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveStatisticsTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('statistics');
    }

    public function down()
    {
        Schema::create('statistics', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('company_id');
            $table->decimal('expenses');

            $table->dateTime('created_at');
        });
    }
}
