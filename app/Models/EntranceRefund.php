<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;

class EntranceRefund extends Model
{
    use PayableTrait, HasManagerAndPartnerTrait;

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

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function entrance()
    {
        return $this->belongsTo(Entrance::class);
    }

    public function normalizedData(){
        return $this->created_at->format('d.m.Y (H:i)');
    }
}
