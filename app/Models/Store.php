<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;


class Store extends Model
{
    use OwnedTrait;

    protected $guarded = [];

    protected $article;

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function article()
    {
        return $this->hasOne(Article::class);
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_store', 'store_id', 'article_id')
            ->withPivot('location', 'isset', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal');
    }
}
