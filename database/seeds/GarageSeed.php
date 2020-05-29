<?php

use App\Models\Garage;
use App\Models\VehicleMark;
use App\Models\VehicleModel;

use Illuminate\Database\Seeder;

class GarageSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(VehicleMark::class, 20)->create();
        factory(VehicleModel::class, 20)->create();

        factory(Garage::class, 10)->create();
    }
}
