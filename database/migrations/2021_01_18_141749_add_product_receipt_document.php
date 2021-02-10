<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductReceiptDocument extends Migration
{
    protected $name = 'Товарный чек';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\DocumentType::create([
            'name' => $this->name,
            'view' => 'documents.product-receipt',
            'print' => 'product-receipt',
            'dialog' => 'selectShipment'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Models\DocumentType::where('name', $this->name)->delete();
    }
}
