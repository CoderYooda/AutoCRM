<?php

namespace App\Models;

use App\Traits\DocumentableTrait;
use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Shipment extends Model
{
    use OwnedTrait, HasManagerAndPartnerTrait, PayableTrait, DocumentableTrait;

    protected $casts = [
        'created_at' => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'id',
        'partner_id',
        'company_id',
        'do_date',
        'store_id',
        'clientorder_id',
        'summ',
        'discount',
        'inpercents',
        'comment',
        'created_at'
    ];

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();
        $user = Auth::user();
        if ($user) {
            static::addGlobalScope('shipment', function (Builder $builder) use ($user) {
                $builder->where('company_id', $user->company->id);
            });
        }
    }

    public function freshFoundString()
    {
        $this->foundstring = $this->id . $this->partner->foundstring;
    }

    public function hasRelations()
    {
        return $this->refunds->count() || $this->warrants->count();
    }

    public function entrances()
    {
        return $this->belongsToMany(Entrance::class, 'shipment_entrance', 'shipment_id', 'entrance_id')
            ->withPivot('product_id', 'count');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function getProductCount($product_id)
    {
        return (int)$this->products()->find($product_id)->count;
    }

    public function getRefundedCount($product_id)
    {
        return (int)$this->products()->find($product_id)->refunded_count;
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'article_shipment', 'shipment_id', 'product_id')
            ->withTrashed()
            ->withPivot('count', 'refunded_count', 'entrance_id', 'price', 'total')
            ->selectRaw('*, SUM(count) as count, SUM(total) as total, SUM(refunded_count) as refunded_count, products.id as id, price')
            ->groupBy(['products.id']);
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function getProductPriceFromShipment($product_id)
    {
        $product = $this->products()->wherePivot('product_id', $product_id)->first();
        return $product->pivot->price;
    }

    public function getProducts($data = null)
    {
        $products = DB::table('article_shipment')
            ->where('shipment_id', $this->id)
            ->where(function ($q) use ($data) {
                if ($data !== null && $data['store_id'] !== null) {
                    $q->where('store_id', $data['store_id']);
                }
                if ($data !== null && $data['article'] !== null) {
                    $q->where('product_id', $data['article_id']);
                }
            })
            ->get();
        foreach ($products as $product) {
            $product->product = Product::owned()->where('id', $product->product_id)->first();
        }
        return $products;
    }

    public function notRefundedProducts()
    {
        return $this->products()->whereRaw('refunded_count < count');
    }

    public function incrementRefundedCount($product_id, $amount)
    {
        $products = DB::table('article_shipment')->where([
            'shipment_id' => $this->id,
            'product_id' => $product_id,
        ])
            ->whereRaw('refunded_count != count')
            ->get();

        $entrances = [];

        foreach ($products as $product) {

            $product_count = $product->count;

            for ($i = $product->count - $product->refunded_count; $i > 0; $i--) {

                if ($amount == 0) break;

                if ($product->refunded_count >= $product->count) continue;

                DB::table('article_shipment')
                    ->where('id', $product->id)
                    ->increment('refunded_count', 1);
                DB::table('article_entrance')
                    ->where('product_id', $product->product_id)
                    ->where('released_count', $product_count)
                    ->decrement('released_count', 1);

                $product->count++;
                $product_count--;
                $amount--;

                if (!isset($entrances[$product->entrance_id])) $entrances[$product->entrance_id] = 0;
                $entrances[$product->entrance_id]++;
            }

        }

        return $entrances;
    }

    public function outputName() //Вывод имени или наименования
    {
        return 'Продажа №' . $this->id;
    }

    public function getWarrantPositive()
    {
        $negative = $this->warrants()->where('isIncoming', false)->sum('summ');
        $positive = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $positive - $negative;
    }

    public function elements()
    {
        return $this->products->merge($this->stores);
    }

    public function refunds()
    {
        return $this->hasMany(Refund::class, 'shipment_id', 'id');
    }

    public function getAvailableToRefundProductsCount($product_id)
    {
        $response = DB::table('article_shipment')
            ->selectRaw('SUM(count) as count, SUM(refunded_count) as refunded_count')
            ->where([
                'shipment_id' => $this->id,
                'product_id' => $product_id
            ])
            ->first();

        return $response->count - $response->refunded_count;
    }

    public function freshWsumm()
    {
        //TODO Сложить сумму платежей в отдельное поле сущности (Оптимизация)
    }

    public function clientOrder()
    {
        return $this->belongsTo(ClientOrder::class, 'clientorder_id');
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

}
