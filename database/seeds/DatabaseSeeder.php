<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;

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
        $this->call(CreateBasePartners::class);
        $this->call(SettingsSeed::class);
        $this->call(WarrantSeed::class);
        $this->call(MoneymoveSeed::class);
        $this->call(ArticleSeed::class);
    }
}
