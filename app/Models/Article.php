<?php

namespace App\Models;

use App\Http\Controllers\SettingsController;
use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Article extends Model
{
    use OwnedTrait, SoftDeletes;

    public $fields = [
        'company_id',
        'category_id',
        'creator_id',
        'supplier_id',
        'measurement_id',
        'foundstring',
        'article',
        'oem',
        'storeCode',
        'barcode_local',
        'barcode',
        'name',
        'blockedCount'
    ];

    protected $guarded = [];

    public function canUserTake()
    {
        return $this->company_id == Auth::user()->company->id;
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'article_store', 'article_id', 'store_id')
            ->withPivot('location', 'count', 'isset', 'midprice', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal');
    }

    public static function makeFoundString(string $string)
    {
        $chars = ["-","!","?",".",""," "];

        return str_replace($chars, '', $string);
    }

    public function shipment()
    {
        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'article_id', 'shipment_id')
            ->withPivot('count', 'price', 'total', 'shipment_id');
    }

    public function getCountSelfOthers()
    {
        return $this->getCountInStoreId(Auth::user()->partner()->first()->store()->first()->id) . ' / ' . $this->getCountInOthersStores(Auth::user()->partner()->first()->store()->first()->id);
    }

    public function getStorageCode(){
        $store = $this->stores()->where('store_id', session('store_id'))->first();
        return view('classic.product.storage_code', compact('store'));
    }

//    public function providerorder()
//    {
//        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'article_id', 'shipment_id')
//            ->withPivot('count', 'price', 'total', 'shipment_id');
//    }

    public function getArticlesCountInAllStores(){
        //$stores = Store::owned()->get();
        return $this->stores()->sum('count');
    }

    public function getCountInStoreId($store_id)
    {
        $article = $this->stores()->get()->where('id', $store_id)->first();

        return $article ? $article->pivot->count : 0;
    }

    public function getCountInOthersStores($store_id)
    {
        return $this->stores()->where('store_id', '!=', $store_id)->sum('count');
    }

    public function getMidPriceByStoreId($store_id, $isInteger = null)
    {
        $relation = $this->stores()->where('store_id',  $store_id)->first();

        $markup = (int)SettingsController::getSettingByKey('markup')->value;

        $midprice = 0;
        if($relation){
            $midprice = $relation->pivot->midprice;
        }

        $retail = $midprice + ( $midprice / 100 * $markup );

        if( $retail === 0){
            if($isInteger){
                return 0;
            } else {
                return 'Не уст.';
            }
        } else {
            if($isInteger){
                return (int)$retail;
            } else {
                return number_format($retail, 2, ',', ' ') . ' ₽';
            }
        }

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
