<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class Shipment extends Model
{
    use OwnedTrait, HasManagerAndPartnerTrait;

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
    ];

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('shipment', function (Builder $builder) {
            $builder->where('company_id', Auth::user()->company()->first()->id);
        });
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_shipment', 'shipment_id', 'article_id')
            ->withPivot('count', 'refunded_count', 'price', 'total');
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
        foreach($pivot_array as $pivot_data){
            $relation = DB::table('article_shipment')->insert($pivot_data);
        }
        return $relation;
    }

    public function getArticles($data = null){

        $articles = DB::table('article_shipment')
            ->where('shipment_id', $this->id)
            ->where(function($q) use ($data){
                if($data !== null && $data['store_id'] !== null){
                    $q->where('store_id', $data['store_id']);
                }
                if($data !== null && $data['article'] !== null){
                    $q->where('article_id', $data['article_id']);
                }
            })
            ->get();
        foreach($articles as $article){
            $article->product = Article::owned()->where('id', $article->article_id)->withTrashed()->first();
        }
        return $articles;
    }

    public function notRefundedArticles()
    {
        return $this->articles()->whereRaw('article_shipment.refunded_count < article_shipment.count');
    }

    public function increaseRefundedCount($article_id, $amount)
    {
        $count = $this->getRefundedCount($article_id) + (int)$amount;
        $this->setRefundedCount($article_id, $count);
    }

    public function decreaseRefundedCount($article_id, $amount)
    {
        $count = $this->getRefundedCount($article_id) - (int)$amount;
        $this->setRefundedCount($article_id, $count);
    }

    public function setRefundedCount($article_id, $count)
    {
        $this->articles()->updateExistingPivot($article_id, array('refunded_count' => $count), false);
        return true;
    }

    public function getRefundedCount($article_id)
    {
        $article = $this->articles()->where('article_id', $article_id)->first();
        return $article ? $article->pivot->shipped_count : 0;
    }

    public function outputName() //Вывод имени или наименования
    {
        return 'Продажа №' . $this->id;
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', false)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $plus - $minus;
    }

    public function elements()
    {
        return $this->articles->merge($this->stores);
    }

    public function getAvailableToRefundArticlesCount($article_id)
    {
        $article = $this->articles()->wherePivot('article_id', $article_id)->first();
        return $article ? $article->pivot->count - $article->pivot->refunded_count : 0;
    }

    public function clientOrder()
    {
        return $this->belongsTo('App\Models\ClientOrder', 'clientorder_id');
    }

    public function normalizedData(){
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function getArticlesCountById($id){
        $article = $this->articles()->where('article_id', $id)->first();
        if($article){
            $count = $article->pivot->count;
        } else {
            $count = 0;
        }
        return $count;
    }

    public function warrants()
    {
        return $this->belongsToMany('App\Models\Warrant', 'shipment_warrant',  'shipment_id', 'warrant_id' );
    }
}
