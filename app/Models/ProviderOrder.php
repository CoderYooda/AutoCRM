<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class ProviderOrder extends Model
{
    public $fields = [
        'partner_id',
        'company_id',
        'store_id',
        'do_date',
        'store_id',
        'summ',
        'discount',
        'nds',
        'nds_included',
        'inpercents',
        'comment',
    ];

    protected $guarded = [];

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_provider_orders', 'provider_order_id', 'article_id')
            ->withPivot('count', 'price', 'nds', 'nds_percent', 'nds_included', 'total');
    }

    public function getArticleCount($article_id)
    {
        return $this->articles()->where('article_id', $article_id)->first()->pivot->count;
    }

    public function entrances()
    {
        return $this->hasMany('App\Models\Entrance', 'providerorder_id');
    }

    public function getArticleEntredCount($article_id, $not_self_id = null)
    {
        if($not_self_id !== null){
            $entrances = $this->entrances()->where('id', '!=', $not_self_id)->get();
        } else {
            $entrances = $this->entrances()->get();
        }

        $summ = 0;
        foreach($entrances as $entrance){
            $summ += $entrance->articles()->where('article_id', $article_id)->sum('count');
        }

        return $summ;
    }

    public function warrants()
    {
        return $this->belongsToMany('App\Models\Warrant', 'provider_order_warrant',  'providerorder_id', 'warrant_id' );
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', true)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', false)->sum('summ');
        return $plus - $minus;
    }

    public function getArticlePrice($article_id)
    {
        return $this->articles()->where('article_id', $article_id)->first()->pivot->price;
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id');
    }

    public function store()
    {
        return $this->belongsTo('App\Models\Store', 'store_id');
    }

    public function normalizedData(){
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function outputName() //Вывод имени или наименования
    {
        return 'Заявка поставщику №' . $this->id;
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
