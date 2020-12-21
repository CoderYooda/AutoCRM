<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClassFieldToDocumentType extends Migration
{
    public function up()
    {
        Schema::table('documents_types', function (Blueprint $table) {
            $table->string('view');
            $table->string('print');
            $table->string('dialog');
        });

        $classes = [
            1 => ['documents.invoice-for-payment', 'selectShipment', 'shipment-score'],
            2 => ['documents.upd', 'selectShipment', 'shipment-score'],
            3 => ['documents.defective-act', 'selectProduct', 'defective-act'],
            4 => ['documents.client-order', 'selectClientOrder', 'client-order'],
            5 => ['documents.in-warrant', 'selectWarrant', 'in-warrant'],
            6 => ['documents.out-warrant', 'selectWarrant', 'out-warrant']
        ];

        DB::table('documents_types')->where('id', 7)->delete();

        foreach ($classes as $key => $class) {
            DB::table('documents_types')->where('id', $key)->update(['view' => $class[0], 'print' => $class[2], 'dialog' => $class[1]]);
        }
    }

    public function down()
    {
        Schema::table('documents_types', function (Blueprint $table) {
            $table->dropColumn('view');
            $table->dropColumn('print');
            $table->dropColumn('dialog');
        });
    }
}
