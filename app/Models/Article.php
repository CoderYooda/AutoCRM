<?php

namespace App\Models;

use App\Http\Controllers\SettingsController;
use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;
use Illuminate\Support\Facades\DB;

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
            ->withPivot('location', 'isset', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal', 'retail_price');
//            ->withPivot('location', 'count', 'isset', 'midprice', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal');
    }

    public function decrementFromEntrance(int $count)
    {
        $company = Auth::user()->company->load('settings');

        $store_id = Auth::user()->current_store;

        $method_cost_of_goods = $company->getSettingField('Способ расчета себестоимости товаров');

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

        $method_cost_of_goods = $company->getSettingField('Способ расчета себестоимости товаров');

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
        $company = Auth::user()->company->load('settings');

        $method_cost_of_goods = $company->getSettingField('Способ расчета себестоимости товаров');

        $store_id = Auth::user()->current_store;

        $count_info = DB::table('article_entrance')
            ->selectRaw('SUM(count) as count, SUM(released_count) as released_count')
            ->where(['article_id' => $this->id, 'store_id' => $store_id])
            ->whereRaw('count != released_count')
            ->orderByRaw('id ' . ($method_cost_of_goods == 'fifo' ? 'ASC' : 'DESC'))
            ->first();

        return $count_info->count - $count_info->released_count;
    }

    public function getPrice(int $count = 1)
    {
        /** @var Company $company */
        $company = Auth::user()->company->load('settings');

        $price_source = $company->getSettingField('Источник цены');
        $method_cost_of_goods = $company->getSettingField('Способ расчета себестоимости товаров');

        $store_id = Auth::user()->current_store;

        if($price_source == 'retail') {
            return $this->stores->find($store_id)->pivot->retail_price ?? 0;
        }
        else { /* FIFO-LIFO */

            $products = DB::table('article_entrance')
                ->where(['article_id' => $this->id, 'store_id' => $store_id])
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
            ->withPivot('price');
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
        $store = $this->stores->where('store_id', Auth::user()->current_store)->first();
        return view('classic.product.storage_code', compact('store'));
    }

//    public function providerorder()
//    {
//        return $this->belongsToMany('App\Models\Shipment', 'article_shipment', 'article_id', 'shipment_id')
//            ->withPivot('count', 'price', 'total', 'shipment_id');
//    }

    public function getCountInStoreId($store_id)
    {
        $article = $this->stores->find($store_id);

        return $article ? $article->pivot->count : 0;
    }

    public function getCountInOthersStores($store_id)
    {
        return $this->stores()->where('store_id', '!=', $store_id)->sum('count');
    }
}
