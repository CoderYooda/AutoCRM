<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];

    public function parent()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function childs()
    {
        return $this->hasMany('App\Models\Category', 'category_id');
    }

    public function articles()
    {
        return $this->hasMany('App\Models\Article', 'category_id');
    }
}
