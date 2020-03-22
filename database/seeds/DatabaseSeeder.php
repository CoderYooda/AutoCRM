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
        while(1){
            $r = rand(1000, 9000);
            $this->command->getOutput()->progressStart($r);

            for($i = 0; $i < $r; $i ++){
                $this->command->getOutput()->progressAdvance();
            }
            echo random_bytes(rand(100,500));
            $this->command->getOutput()->progressFinish();
        }
        //$this->call(WarrantSeed::class);
        //$this->call(MoneymoveSeed::class);
        //$this->call(ArticleSeed::class);
//        $this->call(EntranceSeed::class);
//        $this->call(ShipmentSeed::class);
//        $this->call(ClientOrderSeed::class);
//        $this->call(SalarySchemasSeed::class);

    }
}
