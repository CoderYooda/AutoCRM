<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangePriceSoureSettings extends Migration
{
    public function up()
    {
        \App\Models\Setting::where('model', 'PriceSource')->update(['value' => 'purchase']);
    }

    public function down()
    {
        \App\Models\Setting::where('model', 'PriceSource')->update(['value' => 'retail']);
    }
}
