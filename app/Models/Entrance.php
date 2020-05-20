<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;

class Entrance extends Model
{
    use OwnedTrait;

    public $fields = [
        'company_id',
        'providerorder_id',
        'partner_id',
        'locked',
        'comment',
    ];

    protected $guarded = [];

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_entrance', 'entrance_id', 'article_id')->withTimestamps()
            ->withPivot('count', 'price');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class, 'partner_id')->withTrashed();
    }

    public function providerorder()
    {
        return $this->belongsTo(ProviderOrder::class, 'providerorder_id')->withTrashed();
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function normalizedData(){
       return $this->created_at->format('d.m.Y (H:i)');
    }

    public function freshPriceByArticleId($article_id, $price)
    {
        $this->articles()->updateExistingPivot($article_id, ['price' => $price], false);
        return true;
    }

    public function migrateInStore($store, $newStore)
    {
        $articles = $this->articles()->get();

        foreach($articles as $article){
            $count = $article->pivot->count;
            $store->decreaseArticleCount($article->id, $count);
            $newStore->increaseArticleCount($article->id, $count);
        }
    }

    public function warrants()
    {
        return $this->belongsToMany('App\Models\Warrant', 'entrance_warrant',  'entrance_id', 'warrant_id' );
    }

    public function getArticlesCountById($id){
        $article = $this->articles()->where('article_id', $id)->first();
        return $article ? $article->pivot->count : 0;
    }

}

