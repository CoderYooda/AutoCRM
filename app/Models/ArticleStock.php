<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ArticleStock extends Model
{

    protected $table = 'article_stock';
    protected $guarded = [];

    public static function loadProductToStore($product_id, $store_id, $cost)
    {
        //TODO after
        ArticleStock::create([
           'company_id' => Auth::user()->company()->first()->id,
           'store_id' => $store_id,
           'article_id' => $product_id,
           'cost' => $cost,
        ]);

        //TODO before
//        $stocked = new ArticleStock();
//        $stocked->company_id = Auth::user()->company()->first()->id;
//        $stocked->store_id = $store_id;
//        $stocked->product_id = $product_id;
//        $stocked->cost = $cost;
//        $stocked->save();
    }

}
