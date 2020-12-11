<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;

class Supplier extends Model
{
    use OwnedTrait;

    protected $guarded = [];

    public function products()
    {
        return $this->hasMany(Article::class, 'supplier_id', 'id');
    }
}
