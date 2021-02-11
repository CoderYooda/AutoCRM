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
        return $this->hasOne(Product::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'article_store', 'store_id', 'product_id')
            ->withPivot('location', 'isset', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal','min_stock','retail_price');
    }
}
