<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDdsArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dds_articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('category_id')->unsigned()->nullable()->comment('Привязка к категории');
            $table->bigInteger('company_id')->unsigned()->nullable()->comment('Привязка к компании');
            $table->bigInteger('dds_types_id')->unsigned()->nullable()->comment('Привязка к виду ддс');
            $table->boolean('locked')->default(false)->comment('Замок');
            $table->char('name')->comment('Наименование');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dds_articles');
    }
}
