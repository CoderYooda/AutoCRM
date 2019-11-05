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
        'store_id',
        'summ',
        'itogo',
        'discount',
        'inpercents',
        'comment',
        'status',
        'color',
    ];

    protected $guarded = [];

    public function getArticles($data = null){
        $articles = DB::table('article_client_orders')
            ->where('client_order_id', $this->id)
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
            ->withPivot('count', 'price', 'total');
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id');
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
        return $this->belongsToMany('App\Models\Warrant', 'client_orders_warrant',  'client_order_id', 'warrant_id' );
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

}
