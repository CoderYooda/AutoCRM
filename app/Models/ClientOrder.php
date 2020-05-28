<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Support\Facades\DB;

class ClientOrder extends Model
{
    use OwnedTrait, PayableTrait, HasManagerAndPartnerTrait;

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
        'created_at'
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

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function data(){
        return $this->created_at->format('d.m H:i');
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_client_orders', 'client_order_id', 'article_id')
            ->withPivot('count', 'shipped_count', 'price', 'total')->withTrashed();
    }

    public static function getActiveOrders()
    {
        return self::where('status', '!=', 'complete')->where('status', '!=', 'canceled')->where('status', '!=', 'full')->get();
    }

    #Получить не отгруженные товары по заказу
    public function notShippedArticles()
    {
        return $this->articles()->whereRaw('article_client_orders.shipped_count < article_client_orders.count');
    }

    #Получить доступные для отгрузки товары (кол-во)
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

    public function freshWsumm(){
        //TODO Сложить сумму платежей в отдельное поле сущности (Оптимизация)
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
}
