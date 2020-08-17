<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEmptySettingsToCompanies extends Migration
{
    public function up()
    {
        foreach (\App\Models\Company::all() as $company) {
            Setting::updateOrCreate(['name' => 'Способ расчета себестоимости товаров', 'company_id' => $company->id], ['model' => 'RRC',  'type' => 'select', 'key' => 'rrc_name', 'value' => 'fifo']);
            Setting::updateOrCreate(['name' => 'Источник цены', 'company_id' => $company->id], ['model' => 'PriceSource',  'type' => 'select', 'key' => 'price_source', 'value' => 'retail']);
        }
    }

    public function down()
    {

    }
}
