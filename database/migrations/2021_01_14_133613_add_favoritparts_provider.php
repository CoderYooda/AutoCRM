<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFavoritpartsProvider extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Фаворит Автозапчасти',
            'url' => 'https://favorit-parts.ru/',
            'key' => 'favoritparts',
            'category_id' => 0
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Models\Service::where('key', 'favoritpart')->delete();
        \App\Models\ServiceField::where('service_key', 'favoritpart')->delete();
    }
}
