<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProviderOrder extends Model
{
    use OwnedTrait, SoftDeletes, HasManagerAndPartnerTrait, PayableTrait;

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'partner_id',
        'manager_id',
        'company_id',
        'store_id',
        'do_date',
        'store_id',
        'summ',
        'discount',
        'nds',
        'nds_included',
        'inpercents',
        'comment',
        'created_at'
    ];

    protected $guarded = [];

    //protected $dateFormat = 'Y-m-d/H:i';

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_provider_orders', 'provider_order_id', 'article_id')
            ->withPivot('count', 'price', 'nds', 'nds_percent', 'nds_included', 'total');
    }

    public function getArticleCount($article_id)
    {
        $article = $this->articles()->where('article_id', $article_id)->first();
        return $article != null ? $article->pivot->count : 0;
    }

    public function getPlanArticleCount()
    {
        $count = $this->articles()->sum('count');
        return (int)$count;
    }

    public function getEnteredArticleCount()
    {
        $entered_count = 0;
        foreach($this->entrances()->get() as $entrance){
            $entered_count += $entrance->articles()->sum('count');
        }
        return $entered_count;
    }

    public function entrances()
    {
        return $this->hasMany(Entrance::class, 'providerorder_id');
    }

    public function getArticleEntredCount($article_id, $not_self_id = null)
    {
        if($not_self_id !== null){
            $entrances = $this->entrances()->where('id', '!=', $not_self_id)->get();
        } else {
            $entrances = $this->entrances()->get();
        }
        //dd($entrances);
        $summ = 0;
        foreach($entrances as $entrance){
            $summ += $entrance->articles()->where('article_id', $article_id)->sum('count');
        }

        return $summ;
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', true)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', false)->sum('summ');
        return $plus - $minus;
    }

    public function getArticlePrice($article_id)
    {
        $article = $this->articles()->where('article_id', $article_id)->first();
        return $article != null ? $article->pivot->price : 0;
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function outputName() //Вывод имени или наименования
    {
        return 'Заявка поставщику №' . $this->id;
    }

    public function freshWsumm(){

        if(isset($this->pays)){
            if(-$this->wsumm <= 0) {
                $this->pays = 0;
            } else if(-$this->wsumm > 0 && -$this->wsumm < $this->summ){
                $this->pays = 1;
            } else if(-$this->wsumm == $this->summ){
                $this->pays = 2;
            } else if(-$this->wsumm > $this->summ){
                $this->pays = 3;
            }
        }
        $this->save();
    }

    public function freshIncomes(){

        $plan = $this->getPlanArticleCount();
        $fact = $this->getEnteredArticleCount();

        if($fact == 0) {
            $this->incomes = 0;
        } else if($fact > 0 && $fact < $plan){
            $this->incomes = 1;
        } else if($fact == $plan){
            $this->incomes = 2;
        } else if($fact > $plan){
            $this->incomes = 3;
        }
        $this->save();

    }

    public function getArticlesCountById($id){
        $article = $this->articles()->where('article_id', $id)->first();
        return $article ? $article->pivot->count : 0;
    }
}
