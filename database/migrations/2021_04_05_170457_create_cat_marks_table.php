<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cat_marks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('type_id')->unsigned();
            $table->string('image')->nullable();
            $table->string('url')->nullable();
            $table->string('value')->nullable();
            $table->string('full_name')->nullable();
            $table->string('short_name')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->boolean('SKD')->default(false);
            $table->boolean('archival')->default(false);
            $table->boolean('vin')->default(false);
            $table->boolean('engine')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_marks');
    }
}
