<?php

namespace App\Models\iCat;

use Illuminate\Database\Eloquent\Model;

class CatMark extends Model
{
    protected $guarded = [];
    public $timestamps = false;

    public function type()
    {
        return $this->hasOne(CatType::class, 'id', 'type_id');
    }
}
