<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePartnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('user_id')->unsigned()->comment('Привязка к пользователю');
            $table->bigInteger('partnerType_id')->unsigned()->comment('Привязка к типу контрагента');
            $table->bigInteger('car_id')->unsigned()->comment('Привязка автомобиля');
            $table->bigInteger('passport_id')->unsigned()->comment('Связь с пасспортом');
            $table->boolean('isfl')->comment('физическое лицо?');
            $table->char('fio')->comment('ФИО');
            $table->date('birthday')->comment('Дата рождения');
            $table->char('address')->comment('Адрес');
            $table->char('email')->comment('Почтовый адрес');
            $table->char('comment')->comment('Комментарий');
            $table->char('companyName')->comment('Наименование организации');
            $table->char('ur_address')->comment('Юридический адрес');
            $table->char('fact_address')->comment('Фактический адрес');
            $table->char('inn')->comment('ИНН');
            $table->char('ogrn')->comment('ОГРН');
            $table->char('bank')->comment('Банк');
            $table->char('bik')->comment('БИК');
            $table->char('kpp')->comment('КПП');
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
        Schema::dropIfExists('partners');
    }
}
