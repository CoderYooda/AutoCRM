<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleMark extends Model
{
    protected $table = 'vehicle_marks';
    protected $guarded = [];

    public $timestamps = false;

    public function model()
    {
        return $this->hasOne(VehicleModel::class, 'id');
    }
}
