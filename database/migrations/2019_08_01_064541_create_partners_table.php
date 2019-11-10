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
            $table->bigInteger('user_id')->unsigned()->nullable()->comment('Привязка к пользователю');
            $table->bigInteger('category_id')->unsigned()->comment('Привязка к категории');
            $table->bigInteger('store_id')->unsigned()->nullable()->comment('Привязка к складу');
            $table->boolean('isfl')->comment('физическое лицо?');
            $table->double('balance')->default(0)->comment('Баланс');
            $table->char('fio')->nullable()->comment('ФИО');
            $table->date('birthday')->nullable()->comment('Дата рождения');
            $table->char('address')->nullable()->comment('Адрес');
            $table->char('email')->nullable()->comment('Почтовый адрес');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->char('barcode')->nullable()->comment('штрих-код');
            $table->char('companyName')->nullable()->comment('Наименование организации');
            $table->char('ur_address')->nullable()->comment('Юридический адрес');
            $table->char('fact_address')->nullable()->comment('Фактический адрес');
            $table->char('inn')->nullable()->comment('ИНН');
            $table->char('ogrn')->nullable()->comment('ОГРН');
            $table->char('bank')->nullable()->comment('Банк');
            $table->char('bik')->nullable()->comment('БИК');
            $table->char('kpp')->nullable()->comment('КПП');
            $table->timestamps();
            $table->softDeletes();
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
