<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAutoeuroService extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'category_id' => 0,
            'name' => 'АВТО-ЕВРО',
            'url' => 'https://shop.autoeuro.ru/',
            'key' => 'autoeuro'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key',
            'placeholder' => 'API ключ',
            'service_key' => 'autoeuro',
            'type' => 'text'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Models\Service::where('key', 'autoeuro')->delete();
        \App\Models\ServiceField::where('service_key', 'autoeuro')->delete();
    }
}
