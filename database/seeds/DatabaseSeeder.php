<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdministratorSeed::class);
        $this->call(SupplierSeed::class);
        $this->call(CategorySeed::class);
        $this->call(DDSSeeder::class);
        $this->call(ContractTypesSeeder::class);
    }
}
