<?php

use Illuminate\Database\Seeder;
use App\Models\SalarySchema;

class SalarySchemasSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SalarySchema::create([
            'template' => 'oklad',
        ]);
        SalarySchema::create([
            'template' => 'percent',
        ]);
    }
}
