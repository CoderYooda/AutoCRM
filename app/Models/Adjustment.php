<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;

class Adjustment extends Model
{
    use OwnedTrait;

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'manager_id',
        'company_id',
        'store_id',
        'comment'
    ];

    protected $guarded = [];

    public function manager()
    {
        return $this->belongsTo(Partner::class, 'manager_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
