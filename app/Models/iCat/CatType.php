<?php

namespace App\Models\iCat;

use Illuminate\Database\Eloquent\Model;

class CatType extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    public function marks()
    {
        return $this->hasMany(CatMark::class, 'type_id', 'id');
    }
}
