<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleModel extends Model
{
    protected $table = 'vehicle_models';
    protected $guarded = [];

    public $timestamps = false;

    public function mofifies()
    {
        return $this->hasMany(VehicleModify::class, 'model_id', 'id');
    }
}
