<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

Carbon::setToStringFormat('d.m.Y H:i');

class Entrance extends Model
{
    use OwnedTrait, HasManagerAndPartnerTrait;

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'company_id',
        'providerorder_id',
        'partner_id',
        'manager_id',
        'locked',
        'comment',
        'created_at'
    ];

    protected $guarded = [];

    public function outputName()
    {
        return 'Поступление №' . $this->id;
    }

    public function getProductTotalCount($product_id)
    {
        return $this->articles->find($product_id)->pivot->count ?? 0;
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_entrance', 'entrance_id', 'article_id')->withTimestamps()
            ->withPivot('count', 'price', 'released_count');
    }

    public function entrancerefunds()
    {
        return $this->hasMany(EntranceRefund::class, 'entrance_id')->with('articles');
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

    public function getTotalPrice()
    {
        $total_price = 0;

        $products = $this->articles;

        foreach ($products as $product) {
            $total_price += $product->pivot->price * $product->pivot->count;
        }

        return $total_price;
    }

    public function warrants()
    {
        return $this->belongsToMany(Warrant::class, 'entrance_warrant',  'entrance_id', 'warrant_id' );
    }

    public function getArticlesCountById($id){
        $article = $this->articles()->where('article_id', $id)->first();
        return $article ? $article->pivot->count : 0;
    }
}

