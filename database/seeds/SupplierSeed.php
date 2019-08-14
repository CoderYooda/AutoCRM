<?php

use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SupplierSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Supplier::create(['name' => 'RBI', 'company_id' => 1]);
        Supplier::create(['name' => '555', 'company_id' => 1]);
        Supplier::create(['name' => 'GMB', 'company_id' => 1]);
        Supplier::create(['name' => 'Koyo', 'company_id' => 1]);
        Supplier::create(['name' => 'RBH', 'company_id' => 1]);
        Supplier::create(['name' => 'SWAG', 'company_id' => 1]);
        Supplier::create(['name' => 'Quinton Hazell', 'company_id' => 1]);
    }
}
