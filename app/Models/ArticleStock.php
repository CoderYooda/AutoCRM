<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ArticleStock extends Model
{

    protected $table = 'article_stock';
    protected $guarded = [];

    public static function loadProductToStore($article_id, $store_id, $cost)
    {
        $stocked = new ArticleStock();
        $stocked->company_id = Auth::user()->company()->first()->id;
        $stocked->store_id = $store_id;
        $stocked->article_id = $article_id;
        $stocked->cost = $cost;
        $stocked->save();
    }

}
