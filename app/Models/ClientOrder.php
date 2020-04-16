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
        return $this->belongsToMany('App\Models\Article', 'article_client_orders', 'client_order_id', 'article_id')
            ->withPivot('count', 'price', 'total')->withTrashed();
    }

    public function smsMessages()
    {
        return $this->belongsToMany('App\Models\SMSMessages', 's_m_s_message_client_order', 'client_order_id', 's_m_s_message_id')
            ->orderBy('created_at', 'DESC');
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id');
    }

    public function store()
    {
        return $this->belongsTo('App\Models\Store', 'store_id');
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
        return $this->status == 'complete' ? true : false ;
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

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', false)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $plus - $minus;
    }

    public function warrants()
    {
        return $this->belongsToMany('App\Models\Warrant', 'client_orders_warrant',  'client_order_id', 'warrant_id' );
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

}
