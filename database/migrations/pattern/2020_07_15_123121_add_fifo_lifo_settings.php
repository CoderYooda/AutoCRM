<?php

use App\Models\Company;
use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

class AddFifoLifoSettings extends Migration
{
    protected $name = 'Способ расчета себестоимости товаров';

    public function up()
    {
        Setting::create(['name' => $this->name, 'model' => 'RRC',  'type' => 'select', 'key' => 'rrc_name', 'value' => 'fifo']);
    }

    public function down()
    {
        Setting::where('name', $this->name)->delete();
    }
}
