<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Entrance extends Model
{

    public $fields = [
        'partner_id',
        'company_id',
        'store_id',
        'nds',
        'nds_included',
        'locked',
        'comment',
    ];

    protected $guarded = [];

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article', 'article_entrance', 'entrance_id', 'article_id')
            ->withPivot('count', 'price', 'nds', 'nds_percent', 'nds_included', 'total');
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id');
    }

    public function normalizedData(){
       return $this->created_at->format('d.m.Y (H:i)');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
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

}

