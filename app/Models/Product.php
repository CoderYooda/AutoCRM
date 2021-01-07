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
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    use OwnedTrait, SoftDeletes, Imageable;

    public $fields = [
        'company_id',
        'category_id',
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
        'image_id',
        'price_id'
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

    public function markup()
    {
        return $this->hasOne(Markup::class, 'id', 'price_id');
    }

    public function getHash($store_id)
    {
        $stock = $store_id;
        $manufacturer = $this->supplier->name;
        $article = $this->product;
        $days = 0;
        $price = $this->stores->find($store_id)->pivot->retail_price;

        return md5($stock . $manufacturer . $article . $days . $price);
    }

    public function fillShopFields($request)
    {
        $this->sp_name = $request->shop['name'] ?? '';
        $this->sp_desc = $request->shop['desc'] ?? '';

        $shop_discount = $request->shop['discounts'] ?? [];

        $this->sp_discount_price = $shop_discount['price'] ?? 0;
        $this->sp_discount = $shop_discount['discount'] ?? 0;
        $this->sp_discount_type = $shop_discount['type'] ?? 0;

        if($this->sp_discount_type == 0) { //В рублях
            $this->sp_discount_total = $this->sp_discount_price - $this->sp_discount;
        }
        else {
            $this->sp_discount_total = $this->sp_discount_price - ($this->sp_discount_price / 100 * $this->sp_discount);
        }

        $shop_settings = $request->shop['settings'];

        $this->sp_main = $shop_settings['sp_main'];
        $this->sp_stock = $shop_settings['sp_stock'];
    }

    public function getShopName()
    {
        return strlen($this->sp_name) ? $this->sp_name : ($this->name ?? 'Название отсутствует');
    }

    public function getImagePathAttribute()
    {
        return $this->image ? $this->image->url : asset('/images/shop/no-photo.svg');
    }

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'article_store', 'product_id', 'store_id')
            ->withPivot('location', 'isset', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal', 'retail_price');
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

    public function getStoreDiscountPrice()
    {
        return $this->sp_discount_price;
    }

    public function getStoreDiscount()
    {
        return $this->sp_discount;
    }

    public function getStoreDiscountType()
    {
        return $this->sp_discount_type;
    }

    public function getStoreDiscountTotal()
    {
        return $this->sp_discount_total;
    }

    public function decrementFromEntrance(int $count)
    {
        $company = Auth::user()->company->load('settings');

        $store_id = Auth::user()->current_store;

        $method_cost_of_goods = $company->getSettingField('Способ ведения складского учёта');

        $products = DB::table('article_entrance')
            ->where(['product_id' => $this->id, 'store_id' => $store_id])
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
            ->where(['product_id' => $this->id, 'store_id' => $store_id])
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
        $company = $this->company;

        $method_cost_of_goods = $company->getSettingField('Способ ведения складского учёта');

        $entrances = DB::table('article_entrance')
            ->where('product_id', $this->id)
            ->when($method_cost_of_goods == 'lifo', function (Builder $query) {
                $query->orderByDesc('id');
            })
            ->get();

        $count = $entrances->sum('count');
        $released_count = $entrances->sum('released_count');

        return $count - $released_count;
    }

    public function getCount()
    {
        return $this->pivot->count ?? 1;
    }

    public function isStock($store_id = null)
    {
        if($store_id == null) $store_id = Auth::user()->current_store;

        return $this->stores->find($store_id)->pivot->sp_stock ?? 0;
    }

    public function getPriceWithDiscount()
    {
        $price = $this->getPrice();

        if($this->sp_stock) {
            if ($this->sp_discount_type == 0) { //в рублях
                $price -= $this->sp_discount;
            } else {
                $price -= ($price / 100) * $this->sp_discount;
            }
        }

        return $price;
    }

    public function getPrice()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        /** @var Company $company */
        $company = $shop->company ?? Auth::user()->company;

        $price_source = $company->getSettingField('Источник цены');

        $store_id = Auth::user()->current_store ?? null;

        $price = 0;

        if($price_source == 'purchase') {

            if($shopManager->isWatchShop()) {
                $price = $this->stores->sum('pivot.retail_price') / $this->stores->count();
            }
            else {
                $price = $this->stores->find($store_id)->pivot->retail_price ?? 0;
            }
        }
        else {

            $lastEntrance = DB::table('article_entrance')->where('product_id', $this->id)->orderByDesc('id')->first();

            $price = $lastEntrance->price ?? 0;
        }

        $percent = $this->markup->getPercentByAmount($price);

        $price += sum_percent($price, $percent);

        return $price;
    }

    public function entrances()
    {
        return $this->belongsToMany(Entrance::class, 'article_entrance', 'product_id')
            ->withPivot('price', 'count', 'released_count', 'created_at');
    }

    public static function makeCorrectArticle(string $article)
    {
        $chars = ["-","!","?",".",""," "];

        return str_replace($chars, '', $article);
    }

    public function freshFoundString()
    {
        $string = $this->supplier->name . $this->article . $this->name . $this->barcode . $this->barcode_local;

        $chars = ["-","!","?",".",""," "];

        $this->foundstring = mb_strtolower(str_replace($chars, '', $string));
    }

    public function freshSlug()
    {
        $slug = Str::slug($this->name . '-' . $this->id);

        //Обновляем slug через фасад, чтобы избежать рекурсии в observer'e
        DB::table('products')->where('id', $this->id)->update(['slug' => $slug]);
    }

    public function shipment()
    {
        return $this->belongsToMany(Shipment::class, 'article_shipment', 'product_id', 'shipment_id')
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
//        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'product_id', 'shipment_id')
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
                'product_id' => $this->id
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
                'product_id' => $this->id
            ])
            ->where('store_id', '!=', $store_id)
            ->first();

        return $response->count - $response->released_count;
    }
}
