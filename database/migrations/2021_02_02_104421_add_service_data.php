<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddServiceData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\ServiceField::where([
            'name' => 'api_key',
            'service_key' => 'favoritparts',
        ])->delete();

        \App\Models\ServiceField::create([
            'name' => 'api_key1',
            'placeholder' => 'Первый API-ключ',
            'service_key' => 'favoritparts',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key2',
            'placeholder' => 'Второй API-ключ',
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
