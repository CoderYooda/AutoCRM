<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

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

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }
}
