<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentsTable extends Migration
{
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->on('companies')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('manager_id');
            $table->foreign('manager_id')->on('users')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('documentable_id');
            $table->string('documentable_type');

            $table->text('data');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
