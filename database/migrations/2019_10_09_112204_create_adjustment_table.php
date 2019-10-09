<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdjustmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adjustment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 10, 2)->nullable()->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->nullable()->comment('Итоговая цена');
            $table->integer('discount')->nullable()->comment('Скидка');
            $table->boolean('inpercents')->nullable()->comment('В процентах?');
            $table->char('comment')->nullable()->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->nullable()->comment('Остаток в кассе после выполнения операции');
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
        Schema::dropIfExists('adjustment');
    }
}
