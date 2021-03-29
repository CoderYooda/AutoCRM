<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeFavoritpartsProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\ServiceField::where('service_key', 'favoritparts')->delete();

        \App\Models\ServiceField::create([
            'name' => 'api_key',
            'placeholder' => 'Api-ключ',
            'service_key' => 'favoritparts',
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
        //
    }
}
