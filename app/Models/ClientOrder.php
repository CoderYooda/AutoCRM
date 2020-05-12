<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Support\Facades\DB;

class ClientOrder extends Model
{
    public $fields = [
        'partner_id',
        'company_id',
        'do_date',
        'phone',
        'summ',
        'itogo',
        'discount',
        'inpercents',
        'comment',
        'status',
        'color',
    ];

    protected $guarded = [];

    public function syncArticles($client_order_id, $pivot_array)
    {
        DB::table('article_client_orders')
            ->where('client_order_id', $client_order_id)
            ->delete();
        $relation = null;
        foreach($pivot_array as $pivot_data){
            $relation = DB::table('article_client_orders')->insert($pivot_data);
        }
        return $relation;
    }

    public function data(){
        return $this->created_at->format('d.m H:i');
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_client_orders', 'client_order_id', 'article_id')
            ->withPivot('count', 'shipped_count', 'price', 'total')->withTrashed();
    }

    public function notShippedArticles()
    {
        return $this->articles()->whereRaw('article_client_orders.shipped_count < article_client_orders.count');
    }

    public function getAvailableToShippingArticlesCount($article_id)
    {
        $article = $this->articles()->wherePivot('article_id', $article_id)->first();
        return $article ? $article->pivot->count - $article->pivot->shipped_count : 0;
    }

    public function getProductPriceFromClientOrder($article_id)
    {
        $article = $this->articles()->wherePivot('article_id', $article_id)->first();
        return $article->pivot->price;
    }

    public function getShippedArticlesIds()
    {
        $articles = $this->articles()->wherePivot('shipped_count', '>', '0')->get();
        return $articles ? $articles->pluck('id') : [];
    }

    public function IsAllProductsShipped()
    {
        foreach($this->articles as $article){
           if($this->getShippedCount($article->id) < $article->pivot->count){
               return false;
           }
        }
        return true;
    }

    public function IsAnyProductShipped()
    {
        foreach($this->articles as $article){
            if($this->getShippedCount($article->id) > 0){
                return true;
            }
        }
        return false;
    }

    public function increaseShippedCount($article_id, $amount)
    {
        $count = $this->getShippedCount($article_id) + (int)$amount;
        $this->setShippedCount($article_id, $count);
    }

    public function decreaseShippedCount($article_id, $amount)
    {
        $count = $this->getShippedCount($article_id) - (int)$amount;
        $this->setShippedCount($article_id, $count);
    }

    public function setShippedCount($article_id, $count)
    {
        $this->articles()->updateExistingPivot($article_id, array('shipped_count' => $count), false);
        return true;
    }

    public function getShippedCount($article_id)
    {
        $article = $this->articles()->where('article_id', $article_id)->first();
        return $article ? $article->pivot->shipped_count : 0;
    }

    public function smsMessages()
    {
        return $this->belongsToMany('App\Models\SMSMessages', 's_m_s_message_client_order', 'client_order_id', 's_m_s_message_id')
            ->orderBy('created_at', 'DESC');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class, 'partner_id');
    }

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'clientorder_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function onlyData()
    {
        return $this->created_at->format('d.m.Y H:i');
    }

    public function isFinished()
    {
        return $this->status == 'complete';
    }

    public function getArticlesCountById($id)
    {
        $article = $this->articles()->where('article_id', $id)->first();
        return $article ? $article->pivot->count : 0;
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', false)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $plus - $minus;
    }

    public function warrants()
    {
        return $this->belongsToMany(Warrant::class, 'client_orders_warrant',  'client_order_id', 'warrant_id' );
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

}
