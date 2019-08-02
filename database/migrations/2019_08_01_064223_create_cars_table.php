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
            $table->bigInteger('mark_id')->unsigned()->comment('Привязка к марке');
            $table->bigInteger('model_id')->unsigned()->comment('Привязка к модели');
            $table->char('comment')->comment('Комментарий');
            $table->integer('year')->comment('Год');
            $table->char('vin', 17)->comment('Вин номер');
            $table->char('gosNumber', 6)->comment('Гос номер');
            $table->char('region', 3)->comment('Регион');
            $table->char('bodyNumber')->comment('Номер кузова');
            $table->char('engineNumber')->comment('Номер двигателя');
            $table->char('engineSize')->comment('Объёем двигателя');
            $table->char('axleNumber')->comment('Номер оси');
            $table->char('pts')->comment('Номер ПТС');
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
