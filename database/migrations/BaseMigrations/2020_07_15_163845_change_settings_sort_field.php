<?php

use App\Models\Company;
use App\Models\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeSettingsSortField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Setting::where('name', 'Источник цены')->update(['sort' => 3]);
        Setting::where('name', 'Способ расчета себестоимости товаров')->update(['sort' => 4]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach (Company::all() as $company) {
            foreach ($company->settings as $index => $setting) {
                $setting->update(['sort' => $index]);
            }
        }
    }
}
