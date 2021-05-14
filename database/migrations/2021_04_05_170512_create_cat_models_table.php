<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cat_models', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('type_id')->unsigned();
            $table->bigInteger('mark_id')->unsigned();
            $table->string('image')->nullable();
            $table->string('model')->nullable();
            $table->boolean('archival')->default(false);
            $table->string('name')->nullable();
            $table->string('brand_short_name')->nullable();
            $table->string('short_name')->nullable();
            $table->string('modification')->nullable();
            $table->string('name_with_mark')->nullable();
            $table->integer('index')->nullable();
            $table->string('relevance')->nullable();
            $table->string('modif')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_models');
    }
}
