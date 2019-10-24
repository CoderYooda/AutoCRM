<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Support\Facades\DB;

class Shipment extends Model
{

    public $fields = [
        'partner_id',
        'company_id',
        'do_date',
        'store_id',
        'summ',
        'discount',
        'inpercents',
        'comment',
    ];

    protected $guarded = [];


    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_shipment', 'shipment_id', 'article_id')
            ->with('shipments')->withPivot('store_id', 'count');
    }

    public function stores()
    {
        return $this->belongsToMany('App\Models\Store', 'article_shipment', 'shipment_id', 'store_id')
            ->withPivot('count', 'price', 'total', 'store_id');
    }


    public function syncArticles($shipment_id, $pivot_array)
    {
        DB::table('article_shipment')
            ->where('shipment_id', $shipment_id)
            ->delete();
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
        //dd($articles);
       // $data = [];
//        foreach($articles as $article){
//            //$data[] =
//        }

        //$articles = Article::owned()->
    }

    public function elements()
    {
        return $this->articles->merge($this->stores);
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id')->withTrashed();
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

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }
}
