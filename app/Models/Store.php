<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_store', 'store_id', 'article_id')
            ->withPivot('location', 'count', 'isset');
    }
}
