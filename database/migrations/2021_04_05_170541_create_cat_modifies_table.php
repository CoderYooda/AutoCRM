<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatModifiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cat_modifies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('model_id')->unsigned();
            $table->string('cat_id')->nullable();
            $table->string('catalogId')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->text('region')->nullable();
            $table->string('year')->nullable();
            $table->string('steering')->nullable();
            $table->string('steeringId')->nullable();
            $table->string('bodyType')->nullable();
            $table->string('engine')->nullable();
            $table->text('transmission')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_modifies');
    }
}
