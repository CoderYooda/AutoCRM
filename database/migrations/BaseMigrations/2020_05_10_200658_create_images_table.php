<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mime')->nullable()->comment('МИМ тип');
            $table->string('size')->nullable()->comment('Размер');
            $table->string('filename')->nullable()->comment('Имя файла с расширением');
            $table->integer('rank')->unsigned()->nullable()->comment('Позиция');
            $table->string('url')->comment('URL строка');
            $table->string('thumb_url')->nullable()->comment('Путь до thumb');
            $table->string('hash')->nullable();
            $table->integer('uploader_id')->unsigned()->comment('Кем загружено');
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
        Schema::dropIfExists('images');
    }
}
