<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBergProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Берг',
            'url' => 'https://berg.ru/',
            'key' => 'berg',
            'category_id' => 0
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key',
            'placeholder' => 'API-ключ',
            'service_key' => 'berg',
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
        \App\Models\Service::where('key', 'berg')->delete();
        \App\Models\ServiceField::where('service_key', 'berg')->delete();
    }
}
