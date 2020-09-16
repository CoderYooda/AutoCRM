<?php

use App\Models\Company;
use App\Models\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettingsShopForCompanies extends Migration
{
    protected $name = 'Интернет магазин';

    public function up()
    {
        foreach(Company::all() as $company) {
            Setting::create(['name' => $this->name, 'company_id' => $company->id, 'model' => 'ShopEnabled',  'type' => 'select', 'key' => 'shop_enabled', 'value' => '0']);
        }
    }
    public function down()
    {
        Setting::where('name', $this->name)->delete();
    }
}
