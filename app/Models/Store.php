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
            ->withPivot('location', 'count', 'isset');
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

    public static function owned()
    {
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
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

        $this->articles()->updateExistingPivot($article_id, ['count' => $total]);

        return $total;
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
