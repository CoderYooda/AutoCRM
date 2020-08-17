<?php

use App\Models\Cashbox;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHashToCashbox extends Migration
{
    public function up()
    {
        Schema::table('cashboxes', function (Blueprint $table) {
            $table->string('cashbox_uuid')->nullable();
        });
        Schema::table('warrants', function (Blueprint $table) {
            $table->string('payed_by')->nullable();
            $table->string('payed_at')->nullable();
        });
        foreach (Cashbox::all() as $cashbox) {
            $cashbox->generateUuid();
        }
    }

    public function down()
    {
        Schema::table('cashboxes', function (Blueprint $table) {
            $table->dropColumn('cashbox_uuid');
        });
        Schema::table('warrants', function (Blueprint $table) {
            $table->dropColumn('payed_by');
            $table->dropColumn('payed_at');
        });
    }
}
