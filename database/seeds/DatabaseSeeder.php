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
        $this->call(CreateBasePartners::class);
        $this->call(SettingsSeed::class);
        $this->call(DayOffTypeSeed::class);
        $this->call(PermissionSeed::class);

        //$this->call(WarrantSeed::class);
        //$this->call(MoneymoveSeed::class);
        //$this->call(ArticleSeed::class);
//        $this->call(EntranceSeed::class);
//        $this->call(ShipmentSeed::class);
//        $this->call(ClientOrderSeed::class);
//        $this->call(SalarySchemasSeed::class);

    }
}
