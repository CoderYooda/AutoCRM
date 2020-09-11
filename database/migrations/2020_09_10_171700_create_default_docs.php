<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDefaultDocs extends Migration
{
    private $table = 'documents_types';

    private $docs = [
        ['name' => 'Счёт на оплату'],
        ['name' => 'Универсальный передаточный документ'],
        ['name' => 'Торг 16'],
        ['name' => 'Заказ клиента'],
        ['name' => 'Приходный кассовый ордер'],
        ['name' => 'Расходный кассовый ордер']
    ];

    private $classes = [
        'Счёт на оплату'                      => ['documents.invoice-for-payment', 'selectShipment', 'shipment-score'],
        'Универсальный передаточный документ' => ['documents.upd', 'selectShipment', 'shipment-score'],
        'Торг 16'                             => ['documents.defective-act', 'selectProduct', 'defective-act'],
        'Заказ клиента'                       => ['documents.client-order', 'selectClientOrder', 'client-order'],
        'Приходный кассовый ордер'            => ['documents.in-warrant', 'selectWarrant', 'in-warrant'],
        'Расходный кассовый ордер'            => ['documents.out-warrant', 'selectWarrant', 'out-warrant']
    ];

    public function up()
    {
        foreach ($this->docs as $doc) {

            $name = $doc['name'];

            DB::table($this->table)->insertOrIgnore($doc);

            DB::table('documents_types')->where('name', $name)->update([
                'view'  => $this->classes[$name][0],
                'print' => $this->classes[$name][2],
                'dialog' => $this->classes[$name][1],
            ]);
        }
    }

    public function down()
    {
        DB::table($this->table)->delete();
    }
}
