<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;


class Store extends Model
{
    use OwnedTrait;

    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_store', 'store_id', 'article_id')
            ->withPivot('location', 'count', 'isset', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal');
//            ->withPivot('location', 'count', 'isset', 'midprice', 'storage_zone', 'storage_rack', 'storage_vertical', 'storage_horizontal');
    }

    public function getArticleStorageZone($id){
        $article = $this->articles->where('article_id', $id)->first();
        return $article ? $article->pivot->storage_zone : '';
    }
    public function getArticleStorageRack($id){
        $article = $this->articles->where('article_id', $id)->first();
        return $article ? $article->pivot->storage_rack : '';
    }
    public function getArticleStorageVert($id){
        $article = $this->articles->where('article_id', $id)->first();
        return $article ? $article->pivot->storage_vertical : '';
    }
    public function getArticleStorageHor($id){
        $article = $this->articles->where('article_id', $id)->first();
        return $article ? $article->pivot->storage_horizontal : '';
    }
}
