<?php

use App\Models\Company;
use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

class AddFifoLifoSettings extends Migration
{
    protected $name = 'Способ расчета себестоимости товаров';

    public function up()
    {
        foreach(Company::all() as $company) {
            Setting::create(['name' => $this->name, 'company_id' => $company->id, 'model' => 'RRC',  'type' => 'select', 'key' => 'rrc_name', 'value' => 'fifo']);
        }
    }

    public function down()
    {
        Setting::where('name', $this->name)->delete();
    }
}
