<?php

namespace App\Models\iCat;

use Illuminate\Database\Eloquent\Model;

class CatModel extends Model
{
    protected $guarded = [];
    public $timestamps = false;

    public function mark()
    {
        return $this->hasOne(CatMark::class, 'id', 'mark_id');
    }
}
