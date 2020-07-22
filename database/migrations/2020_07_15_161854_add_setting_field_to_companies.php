<?php

use App\Models\Company;
use App\Models\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettingFieldToCompanies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach(Company::all() as $company) {
            Setting::create(['name' => 'Источник цены', 'company_id' => $company->id, 'model' => 'PriceSource',  'type' => 'select', 'key' => 'price_source', 'value' => 'retail']);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Setting::where('name', 'Источник цены')->delete();
    }
}