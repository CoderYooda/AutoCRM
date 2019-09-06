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

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }
}
