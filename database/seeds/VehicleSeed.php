<?php

use App\Models\Vehicle;
use App\Models\VehicleMark;
use App\Models\VehicleModel;

use Illuminate\Database\Seeder;

class VehicleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $vehicles = simplexml_load_file(public_path('demo/') . 'vehicles.xml');

        foreach ($vehicles as $vehicle) {
            $mark_id = VehicleMark::firstOrCreate(['name' => (string)$vehicle->marka])->id;
            VehicleModel::firstOrCreate(['name' => (string)$vehicle->model, 'mark_id' => $mark_id]);
        }

        factory(Vehicle::class, 10)->create();
    }
}
