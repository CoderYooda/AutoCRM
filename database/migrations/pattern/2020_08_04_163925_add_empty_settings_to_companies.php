<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEmptySettingsToCompanies extends Migration
{
    public function up()
    {
        Setting::updateOrCreate(['name' => 'Способ расчета себестоимости товаров'], ['model' => 'RRC',  'type' => 'select', 'key' => 'rrc_name', 'value' => 'fifo']);
        Setting::updateOrCreate(['name' => 'Источник цены'], ['model' => 'PriceSource',  'type' => 'select', 'key' => 'price_source', 'value' => 'retail']);
    }

    public function down()
    {

    }
}
