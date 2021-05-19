<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProfitLigaProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Профит Лига',
            'url' => 'https://pr-lg.ru/',
            'key' => 'profitliga',
            'category_id' => 0
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key',
            'placeholder' => 'API-ключ',
            'service_key' => 'profitliga',
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
        \App\Models\Service::where('key', 'profitliga')->delete();
        \App\Models\ServiceField::where('service_key', 'profitliga')->delete();
    }
}
