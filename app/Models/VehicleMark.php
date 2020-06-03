<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleMark extends Model
{
    protected $table = 'vehicle_marks';
    protected $guarded = [];

    public $timestamps = false;

    public function models()
    {
        return $this->hasMany(VehicleModel::class, 'mark_id', 'id');
    }
}