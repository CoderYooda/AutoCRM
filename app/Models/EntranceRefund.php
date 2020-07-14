<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

Carbon::setToStringFormat('d.m.Y H:i');

class EntranceRefund extends Model
{
    use PayableTrait, HasManagerAndPartnerTrait, OwnedTrait;

    protected $guarded = [];

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_entrance_refund', 'entrance_refund_id')
            ->withPivot('count', 'price', 'total')->withTrashed();
    }

    public function freshWsumm(){
        //TODO Сложить сумму платежей в отдельное поле сущности (Оптимизация)
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
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

    public function entrance()
    {
        return $this->belongsTo(Entrance::class, 'entrance_id', 'id');
    }
}