<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasManagerAndPartnerTrait;

    protected $guarded = [];

    protected $casts = [
        'created_at' => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public function documentable()
    {
        return $this->morphTo();
    }
}
