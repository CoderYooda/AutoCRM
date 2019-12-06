<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Adjustment extends Model
{
    public $fields = [
        'partner_id',
        'company_id',
        'do_date',
        'store_id',
        'comment',
    ];

    protected $guarded = [];

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_adjustment', 'adjustment_id', 'article_id')
            ->withPivot('prev_count', 'prev_price', 'count', 'price');
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
