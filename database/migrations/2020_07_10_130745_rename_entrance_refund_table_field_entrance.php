<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameEntranceRefundTableFieldEntrance extends Migration
{
    public function up()
    {
        Schema::table('article_entrance_refund', function (Blueprint $table) {
            $table->renameColumn('entrance_id', 'entrance_refund_id');
        });
    }

    public function down()
    {
        Schema::table('article_entrance_refund', function (Blueprint $table) {
            $table->renameColumn('entrance_refund_id', 'entrance_id');
        });
    }
}
