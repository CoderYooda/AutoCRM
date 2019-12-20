<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;


class Store extends Model
{
    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_store', 'store_id', 'article_id')
            ->withPivot('location', 'count', 'isset', 'midprice');
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

    public function getMidPriceById($id){
        $article = $this->articles()->where('article_id', $id)->first();
        $midprice = 0;

        if($article && $article->pivot->midprice != null){
            $midprice = $article->pivot->midprice;
        }
        return $midprice;
    }

    public static function owned()
    {
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function recalculateMidprice($article_id)
    {
//        $current_midprice = $this->articles()->where('id', $article_id)->first()->pivot->midprice;
//        $current_count = $this->articles()->where('id', $article_id)->first()->pivot->midprice;

        $entrances = Entrance::owned()->whereHas('articles', function($q) use ($article_id){
            $q->where('article_id', $article_id);
        })->get();

        $entrance_count = 0;
        $entrance_summ = 0;

        foreach($entrances as $entrance){
            $count = $entrance->articles()->where('article_id', $article_id)->first()->pivot->count;

            $entrance_count += $count;
            $entrance_summ += ($count * $entrance->articles()->where('article_id', $article_id)->first()->pivot->price);
        }



        if($entrance_count === 0 || $entrance_summ === 0){
            $midprice = 0;
        } else {
            $midprice = $entrance_summ / $entrance_count;
        }

        $this->articles()->updateExistingPivot($article_id, ['midprice' => $midprice], false);

        return $midprice;
    }

    public function insertProducts($id, $count, $price)
    {
        $current_midprice = $this->articles()->where('id', $id)->first()->pivot->midprice;

        dd($current_midprice);

        //$this
    }

    public static function getBufferStore()
    {
        return self::owned()->where('type', 'buffer')->first();
    }

    /**
     * increaseArticle
     * Увеличивает кол-во товарa на складе на единицу $count
     */

    public function increaseArticleCount($article_id, $count)
    {
        $current = (int)$this->getArticlesCountById($article_id);

        $total = $current + $count;

        $this->articles()->syncWithoutDetaching($article_id, false);

        $this->articles()->updateExistingPivot($article_id, ['count' => $total]);

        return $total;
    }

    public function setArticleCount($article_id, $count)
    {
        $this->articles()->syncWithoutDetaching($article_id, false);

        $this->articles()->updateExistingPivot($article_id, ['count' => (int)$count]);

        return true;
    }

    public function setArticleMidPrice($article_id, $midprice)
    {
        $this->articles()->syncWithoutDetaching($article_id, false);

        $this->articles()->updateExistingPivot($article_id, ['midprice' => (int)$midprice]);

        return true;
    }

    public function getCountByArticle($article_id){ #TODO
        $this->articles()->where('id', $article_id)->get();
    }

    public function decreaseArticleCount($article_id, $count)
    {
        $this->articles()->syncWithoutDetaching($article_id);

        $current = (int)$this->getArticlesCountById($article_id);

        $total = $current - $count;

        $this->articles()->updateExistingPivot($article_id, ['count' => $total]);

        return $total;
    }
}
