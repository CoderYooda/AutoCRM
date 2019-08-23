<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('mark_id')->nullable()->unsigned()->comment('Привязка к марке');
            $table->bigInteger('model_id')->nullable()->unsigned()->comment('Привязка к модели');
            $table->bigInteger('partner_id')->nullable()->unsigned()->comment('Привязка к партнеру');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->integer('year')->nullable()->comment('Год');
            $table->char('vin', 17)->nullable()->comment('Вин номер');
            $table->char('gosNumber', 6)->nullable()->comment('Гос номер');
            $table->char('region', 3)->nullable()->comment('Регион');
            $table->char('bodyNumber')->nullable()->comment('Номер кузова');
            $table->char('engineNumber')->nullable()->comment('Номер двигателя');
            $table->char('engineSize')->nullable()->comment('Объёем двигателя');
            $table->char('axleNumber')->nullable()->comment('Номер оси');
            $table->char('pts')->nullable()->comment('Номер ПТС');
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
        Schema::dropIfExists('cars');
    }
}
