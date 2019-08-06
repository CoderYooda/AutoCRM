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
        Supplier::create([
            'name' => 'Не указан'
        ]);
    }
}
