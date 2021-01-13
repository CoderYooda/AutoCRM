<?php

use App\Models\Vehicle;
use App\Models\VehicleMark;
use App\Models\VehicleModel;

use App\Models\VehicleModify;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeed extends Seeder
{
    public function run()
    {
        DB::unprepared(file_get_contents(public_path('demo/vehicle_marks.sql')));
        DB::unprepared(file_get_contents(public_path('demo/vehicle_models.sql')));
        DB::unprepared(file_get_contents(public_path('demo/vehicle_modifies.sql')));

        factory(Vehicle::class, 10)->create();
    }
}
