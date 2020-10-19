<?php

namespace App\Models;

use App\Models\System\Image;
use App\Services\ShopManager\ShopManager;
use App\Traits\Imageable;
use App\Traits\OwnedTrait;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    use OwnedTrait, SoftDeletes, Imageable;

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

    public static function bootSoftDeletes()
    {
//        static::addGlobalScope(new SoftDeletingScope);

        return false;
    }

    public function path()
    {
        $categoryPath = $this->category->path();

        return $categoryPath . '/' . $this->slug;
    }

    public function image()
    {
        return $this->hasOne(Image::class, 'id', 'image_id');
    }

    public function canUserTake()
    {
        return $this->company_id == Auth::user()->company_id;
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

    public function specifications()
    {
        return $this->hasMany(Specification::class);
    }

    public function currentStore()
    {
        $store_id = Auth::user()->current_store;

        return $this->stores->find($store_id);
    }

    public function getImagePathAttribute()
    {
        return $this->image ? $this->image->path() : asset('/images/shop/no-photo.svg');
    }

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'article_store', 'article_id', 'store_id')
            ->withPivot('location', 'isset', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal', 'retail_price', 'sp_main', 'sp_empty', 'sp_stock');
    }

    public function getStorageZone($id){
        $store = $this->stores->find($id);
        return $store ? $store->pivot->storage_zone : '';
    }
    public function getStorageRack($id){
        $store = $this->stores->find($id);
        return $store ? $store->pivot->storage_rack : '';
    }
    public function getStorageVert($id){
        $store = $this->stores->find($id);
        return $store ? $store->pivot->storage_vertical : '';
    }
    public function getStorageHor($id){
        $store = $this->stores->find($id);
        return $store ? $store->pivot->storage_horizontal : '';
    }

    public function decrementFromEntrance(int $count)
    {
        $company = Auth::user()->company->load('settings');

        $store_id = Auth::user()->current_store;

        $method_cost_of_goods = $company->getSettingField('Способ ведения складского учёта');

        $products = DB::table('article_entrance')
            ->where(['article_id' => $this->id, 'store_id' => $store_id])
            ->where('released_count', '>', '0')
            ->orderByRaw('id ' . ($method_cost_of_goods == 'fifo' ? 'ASC' : 'DESC'))
            ->get();

        foreach ($products as $product) {

            if(!$count) break;

            if($product->released_count <= 0) continue;

            $count--;
            $product->released_count--;

            DB::table('article_entrance')->where('id', $product->id)->update(['released_count' => $product->released_count]);
        }
    }

    public function incrementToEntrance(int $count)
    {
        $company = Auth::user()->company->load('settings');

        $store_id = Auth::user()->current_store;

        $method_cost_of_goods = $company->getSettingField('Способ ведения складского учёта');

        $products = DB::table('article_entrance')
            ->where(['article_id' => $this->id, 'store_id' => $store_id])
            ->whereRaw('count != released_count')
            ->orderByRaw('id ' . ($method_cost_of_goods == 'fifo' ? 'ASC' : 'DESC'))
            ->get();

        $entrances = [];

        foreach ($products as $product) {

            for($i = $product->released_count; $i < $product->count; $i++) {

                if(!$count) break 2;

                $count--;
                $product->released_count++;

                DB::table('article_entrance')->where('id', $product->id)->update(['released_count' => $product->released_count]);

                if(!isset($entrances[$product->entrance_id])) $entrances[$product->entrance_id] = 0;
                $entrances[$product->entrance_id] ++;
            }
        }

        return $entrances;
    }

    public function getEntrancesCount()
    {
        $company = $this->company->load('settings');

        $method_cost_of_goods = $company->getSettingField('Способ ведения складского учёта');

        $store_id = Auth::user()->current_store ?? null;

        $count_info = DB::table('article_entrance')
            ->selectRaw('SUM(count) as count, SUM(released_count) as released_count')
            ->where('article_id', $this->id)
            ->where('company_id', $company->id)
            ->where(function (Builder $builder) use($store_id) {
                if($store_id) $builder->where('store_id', $store_id);
            })
            ->whereRaw('count != released_count')
            ->orderByRaw('id ' . ($method_cost_of_goods == 'fifo' ? 'ASC' : 'DESC'))
            ->first();

        return $count_info->count - $count_info->released_count;
    }

    public function getCount()
    {
        return $this->pivot->count ?? 1;
    }

    public function isStock($store_id = null)
    {
        if($store_id == null) $store_id = Auth::user()->current_store;

        return $this->stores->find($store_id)->pivot->sp_stock;
    }

    public function getPrice(int $count = 1)
    {
        if(isset($this->pivot->price)) {
            return $this->pivot->price;
        }

        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        /** @var Company $company */
        $company = $shop->company ?? Auth::user()->company->load('settings');

        $price_source = $company->getSettingField('Источник цены');
        $method_cost_of_goods = $company->getSettingField('Способ ведения складского учёта');

        $store_id = Auth::user()->current_store ?? null;

        if($price_source == 'retail') {
            return $this->stores->find($store_id)->pivot->retail_price ?? 0;
        }
        else { /* FIFO-LIFO */

            $products = DB::table('article_entrance')
                ->where('article_id', $this->id)
                ->where(function (Builder $builder) use($store_id) {
                    if($store_id) $builder->where('store_id', $store_id);
                })
                ->whereRaw('count != released_count')
                ->orderByRaw('id ' . ($method_cost_of_goods == 'fifo' ? 'ASC' : 'DESC'))
                ->get();

            $retail_price = 0;
            $found_count = 0;

            foreach ($products as $product) {

                for($i = $product->count; $i != -1; $i--) {

                    $retail_price += $product->price;

                    $found_count++;

                    if ($count == $found_count) break 2;
                }
            }

            $markup_value = $company->getSettingField('Стандартная наценка (%)');

            $total = $found_count ? ($retail_price / $found_count) : 0;

            return (double)($total + ($total / 100 * $markup_value));
        }
    }

    public function entrances()
    {
        return $this->belongsToMany(Entrance::class, 'article_entrance', 'article_id', 'entrance_id')
            ->withPivot('price', 'count', 'released_count', 'created_at');
    }

    public static function makeCorrectArticle(string $article)
    {
        $chars = ["-","!","?",".",""," "];

        return str_replace($chars, '', $article);
    }

    public static function makeFoundString(string $string)
    {
        $chars = ["-","!","?",".",""," "];

        return str_replace($chars, '', $string);
    }

    public function shipment()
    {
        return $this->belongsToMany(Shipment::class, 'article_shipment', 'article_id', 'shipment_id')
            ->withPivot('count', 'price', 'total', 'shipment_id');
    }

    public function getCountSelfOthers()
    {
        return $this->getCountInStoreId(Auth::user()->partner->store->id) . ' / ' . $this->getCountInOthersStores(Auth::user()->partner->store->id);
    }

    public function getStorageCode()
    {
        $store = $this->stores->find(Auth::user()->current_store);
        if($store != null){
            return view('classic.product.storage_code', compact('store'))
                ->with('product', $this);
        } else {
            return "Нет привязки";
        }

    }

//    public function providerorder()
//    {
//        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'article_id', 'shipment_id')
//            ->withPivot('count', 'price', 'total', 'shipment_id');
//    }

    public function getCountInCurrentStore()
    {
        $store_id = Auth::user()->current_store;

        return $this->getCountInStoreId($store_id);
    }

    public function getCountInStoreId($store_id)
    {
        $response = DB::table('article_entrance')
            ->selectRaw('SUM(count) as count, SUM(released_count) as released_count')
            ->where([
                'store_id' => $store_id,
                'article_id' => $this->id
            ])
            ->first();

        return $response->count - $response->released_count;
    }

    public function getCountInOthersStores($store_id)
    {
        $company = Auth::user()->company;

        $response = DB::table('article_entrance')
            ->selectRaw('SUM(count) as count, SUM(released_count) as released_count')
            ->where([
                'company_id' => $company->id,
                'article_id' => $this->id
            ])
            ->where('store_id', '!=', $store_id)
            ->first();

        return $response->count - $response->released_count;
    }
}
