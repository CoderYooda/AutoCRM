<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentTypesTable extends Migration
{
    public function up()
    {
        $table = 'documents_types';

        Schema::create($table, function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
        });

        DB::table($table)->insert([
            ['name' => 'Счёт на оплату'],
            ['name' => 'Универсальный передаточный документ'],
            ['name' => 'Торг 16'],
            ['name' => 'Заказ клиента'],
            ['name' => 'Приходный кассовый ордер'],
            ['name' => 'Расходный кассовый ордер'],
            ['name' => 'Дефектный акт']
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('documents_types');
    }
}
