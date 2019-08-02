<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('category_id')->unsigned()->comment('Привязка к категории');
            $table->bigInteger('creator_id')->unsigned()->comment('Привязка к пользователю');
            $table->bigInteger('supplier_id')->unsigned()->comment('Привязка к производителю');
            $table->bigInteger('measurement_id')->unsigned()->comment('Привязка к типу измерений');
            $table->char('article')->comment('Артикул детали');
            $table->char('oem')->comment('OEM детали');
            $table->char('storeCode')->comment('Внутренний номер склада');
            $table->char('barcode')->comment('Штрих код');
            $table->char('name')->comment('Наименование');
            $table->integer('count')->comment('Кол-во на складе');
            $table->integer('blockedCount')->comment('Зарезервировано в заказе');
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
        Schema::dropIfExists('articles');
    }
}
