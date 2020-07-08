<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Support\Facades\DB;

class Refund extends Model
{
    use PayableTrait, OwnedTrait, HasManagerAndPartnerTrait;
    protected $table = 'refund';

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'shipment_id',
        'partner_id',
        'company_id',
        'manager_id',
        'store_id',
        'summ',
        'comment',
        'created_at'
    ];

    protected $guarded = [];

    public function shipment()
    {
        return $this->belongsTo(Shipment::class, 'shipment_id');
    }

    public function syncArticles($refund_id, $pivot_array)
    {
        DB::table('article_refund')
            ->where('refund_id', $refund_id)
            ->delete();
        $relation = null;
        foreach($pivot_array as $pivot_data){
            $relation = DB::table('article_refund')->insert($pivot_data);
        }
        return $relation;
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', false)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $plus - $minus;
    }

    public function freshWsumm(){
        //TODO Сложить сумму платежей в отдельное поле сущности (Оптимизация)
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }
    public function getArticlesCountById($id){
        $article = $this->articles()->where('article_id', $id)->first();
        return $article ? $article->pivot->count : 0;
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_refund', 'refund_id', 'article_id')
            ->withPivot('count', 'price', 'total')->withTrashed();
    }

}
