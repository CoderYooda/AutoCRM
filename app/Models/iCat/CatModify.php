<?php

namespace App\Models\iCat;

use Illuminate\Database\Eloquent\Model;

class CatModify extends Model
{
    protected $guarded = [];
    public $timestamps = false;

    public function model()
    {
        return $this->hasOne(CatModel::class, 'id', 'model_id');
    }
}
