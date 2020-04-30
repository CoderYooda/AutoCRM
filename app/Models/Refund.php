<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Support\Facades\DB;

class Refund extends Model
{
    protected $table = 'refund';


    public $fields = [
        'shipment_id',
        'partner_id',
        'company_id',
        'manager_id',
        'store_id',
        'summ',
        'comment',
    ];

    protected $guarded = [];

    public function shipment()
    {
        return $this->belongsTo('App\Models\Shipment', 'shipment_id');
    }

    public function syncArticles($refund_id, $pivot_array)
    {
        DB::table('article_refund')
            ->where('refund_id', $refund_id)
            ->delete();
        $relation = null;
        foreach($pivot_array as $pivot_data){
            $relation = DB::table('article_refund')->insert($pivot_data);
        }
        return $relation;
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', false)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $plus - $minus;
    }

    public function warrants()
    {
        return $this->belongsToMany('App\Models\Warrant', 'refund_warrant',  'refund_id', 'warrant_id' );
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id')->withTrashed();
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function store()
    {
        return $this->belongsTo('App\Models\Store', 'store_id');
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

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_refund', 'refund_id', 'article_id')
            ->withPivot('count', 'price', 'total')->withTrashed();
    }

}
