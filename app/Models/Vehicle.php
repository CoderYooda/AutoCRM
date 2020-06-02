<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function getFullNameAttribute()
    {
        return $this->mark->name . ' ' . $this->model->name;
    }
}
