<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class Vehicle extends Model
{
    protected $table = 'vehicles';
    protected $guarded = [];

    public function mark()
    {
        return $this->hasOne(VehicleMark::class, 'id', 'mark_id');
    }

    public function model()
    {
        return $this->hasOne(VehicleModel::class, 'id', 'model_id');
    }

    public function modify()
    {
        return $this->hasOne(VehicleModify::class, 'id', 'modify_id');
    }

    public function getFullNameAttribute()
    {
        return $this->mark->name . ' ' . $this->model->name;
    }

    public function getImageAttribute()
    {
        $mark_name = strtolower($this->mark->name);
        $mark_name = str_replace(' ', '_', $mark_name);

        $directory = public_path('images/images_carmodels/' . $mark_name);

        if(!File::isDirectory($directory)) {
            return asset('images/images_carmodels/default.jpg');
        }

        $image_vehicles = File::files($directory, false);

        $names = [];

        foreach ($image_vehicles as $vehicle) {

            $vehicle_name = $vehicle->getFilenameWithoutExtension();

            $names[$vehicle_name] = [
                'length' => similar_text($vehicle_name, $this->model->name),
                'file' => $vehicle
            ];
        }

        if(!count($names)) {
            return asset('images/images_carmodels/default.jpg');
        }

        $file = collect($names)->sortByDesc('length')->first()['file'];

        return asset('images/images_carmodels/' . $mark_name . '/' .  $file->getFilename());
    }
}
