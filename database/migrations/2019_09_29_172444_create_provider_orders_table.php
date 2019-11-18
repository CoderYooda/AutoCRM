<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProviderOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provider_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 10, 2)->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->comment('Итоговая цена');
            $table->integer('discount')->default(0)->comment('Скидка');
            $table->boolean('nds')->comment('ндс');
            $table->boolean('nds_included')->comment('ндс в стоимости?');
            $table->boolean('inpercents')->default(false)->comment('В процентах?');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
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
        Schema::dropIfExists('provider_orders');
    }
}
