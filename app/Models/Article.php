<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Article extends Model
{
    use SoftDeletes;

    public $fields = [
        'company_id',
        'category_id',
        'creator_id',
        'creator_id',
        'supplier_id',
        'measurement_id',
        'article',
        'oem',
        'storeCode',
        'barcode_local',
        'barcode',
        'name',
        'blockedCount',
        'blockedCount',
    ];

    protected $guarded = [];

    public function canUserTake(){
        if($this->company_id == Auth::user()->company()->first()->id){
            return true;
        } else {
            return false;
        }
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function supplier()
    {
        return $this->belongsTo('App\Models\Supplier', 'supplier_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function stores()
    {
        return $this->belongsToMany('App\Models\Store', 'article_store', 'article_id', 'store_id')
            ->withPivot('location', 'count', 'isset', 'midprice');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function shipment()
    {
        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'article_id', 'shipment_id')
            ->withPivot('count', 'price', 'total', 'shipment_id');
    }

//    public function providerorder()
//    {
//        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'article_id', 'shipment_id')
//            ->withPivot('count', 'price', 'total', 'shipment_id');
//    }

    public function getArticlesCountInAllStores(){
        //$stores = Store::owned()->get();
        $count = $this->stores()->sum('count');
        return $count;
    }

    public function getCountInStoreId($store_id)
    {
        $article = $this->stores()->get()->where('id', $store_id)->first();

        if($article){
            $count = $article->pivot->count;
        } else {
            $count = 0;
        }

        return $count;
    }

    public function getCountInOthersStores($store_id)
    {
        return $this->stores()->where('store_id', '!=', $store_id)->sum('count');
    }

    public function getMidPriceByStoreId($store_id)
    {
        $relation = $this->stores()->where('store_id',  $store_id)->first();
        $midprice = 0;
        if($relation){
            $midprice = $relation->pivot->midprice;
        }
        return $midprice;
    }

    public function getReservedCount()
    {
        return 1;
    }

    public function getMidPriceInStoreId($store_id)
    {
        $article = $this->stores()->get()->where('id', $store_id)->first();

        if($article){
            $midprice = $article->pivot->midprice;
            if($midprice === null){
                $midprice = 0;
            }
        } else {
            $midprice = 0;
        }

        return $midprice;
    }

    public function addToStore($store_id, $count)
    {
        $current = (int)$this->getArticlesCountById($article_id);

        $total = $current + $count;

        $this->articles()->owned()->updateExistingPivot($article_id, ['count' => $total]);

        return $total;
    }

}
