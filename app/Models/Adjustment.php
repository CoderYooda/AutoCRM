<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;

class Adjustment extends Model
{
    use OwnedTrait;

    public $fields = [
        'partner_id',
        'company_id',
        'do_date',
        'store_id',
        'comment',
        'created_at'
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

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function onlyData()
    {
        return $this->created_at->format('d.m.Y H:i');
    }

    public function getArticlesCountById($id)
    {
        $article = $this->articles()->where('article_id', $id)->first();

        return $article ? $article->pivot->count : 0;
    }
}
