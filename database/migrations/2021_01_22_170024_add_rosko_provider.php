<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRoskoProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Росско',
            'url' => 'https://rossko.ru/',
            'key' => 'rossko',
            'category_id' => 0
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key1',
            'placeholder' => 'Первый API-ключ',
            'service_key' => 'rossko',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key2',
            'placeholder' => 'Второй API-ключ',
            'service_key' => 'rossko',
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
        \App\Models\Service::where('key', 'rossko')->delete();
        \App\Models\ServiceField::where('service_key', 'rossko')->delete();
    }
}
