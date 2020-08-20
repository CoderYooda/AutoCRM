<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class Shipment extends Model
{
    use OwnedTrait, HasManagerAndPartnerTrait, PayableTrait;

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
        'foundstring',
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

    public function hasRelations()
    {
        return $this->refunds->count() || $this->warrants->count();
    }

    public function entrances()
    {
        return $this->belongsToMany(Entrance::class, 'shipment_entrance', 'shipment_id', 'entrance_id')
            ->withPivot('article_id', 'count');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function getProductCount($product_id)
    {
        return $this->articles()->sum('article_shipment.count');
    }

    public function getRefundedCount($product_id)
    {
        return $this->articles()->sum('article_shipment.refunded_count');
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_shipment', 'shipment_id', 'article_id')
            ->withPivot('count', 'refunded_count', 'entrance_id', 'price', 'total')
            ->selectRaw('*, SUM(count) as count, SUM(total) as total, SUM(refunded_count) as refunded_count, articles.id as id, price')
            ->groupBy('article_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function getProductPriceFromShipment($article_id)
    {
        $article = $this->articles()->wherePivot('article_id', $article_id)->first();
        return $article->pivot->price;
    }

    public function syncArticles($shipment_id, $pivot_array)
    {
        DB::table('article_shipment')
            ->where('shipment_id', $shipment_id)
            ->delete();
        $relation = null;
        foreach ($pivot_array as $pivot_data) {
            $relation = DB::table('article_shipment')->insert($pivot_data);
        }
        return $relation;
    }

    public function getArticles($data = null)
    {

        $articles = DB::table('article_shipment')
            ->where('shipment_id', $this->id)
            ->where(function ($q) use ($data) {
                if ($data !== null && $data['store_id'] !== null) {
                    $q->where('store_id', $data['store_id']);
                }
                if ($data !== null && $data['article'] !== null) {
                    $q->where('article_id', $data['article_id']);
                }
            })
            ->get();
        foreach ($articles as $article) {
            $article->product = Article::owned()->where('id', $article->article_id)->first();
        }
        return $articles;
    }

    public function notRefundedArticles()
    {
        return $this->articles()->whereRaw('article_shipment.refunded_count < article_shipment.count');
    }

    public function incrementRefundedCount($article_id, $amount)
    {
        $products = DB::table('article_shipment')->where([
            'shipment_id' => $this->id,
            'article_id' => $article_id,
        ])
            ->whereRaw('refunded_count != count')
            ->get();

        $entrances = [];

        foreach ($products as $product) {

            for($i = $product->count - $product->refunded_count; $i > 0; $i--) {

                if ($amount == 0) break;

                if ($product->refunded_count >= $product->count) continue;

                $product->count++;
                $amount--;

                DB::table('article_shipment')
                    ->where('entrance_id', $product->entrance_id)
                    ->increment('refunded_count', 1);

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
        return $this->articles->merge($this->stores);
    }

    public function refunds()
    {
        return $this->hasMany(Refund::class, 'shipment_id', 'id');
    }

    public function getAvailableToRefundArticlesCount($article_id)
    {
        $response = DB::table('article_shipment')
            ->selectRaw('SUM(count) as count, SUM(refunded_count) as refunded_count')
            ->where([
                'shipment_id' => $this->id,
                'article_id' => $article_id
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
