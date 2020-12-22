<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $guarded = [];

    public function types()
    {
        return $this->hasMany(PriceType::class, 'price_id', 'id');
    }

    public function getPercentByAmount($amount)
    {
        $percent = 0;

        foreach ($this->types as $type) {
            if($amount < $type->from || $amount > $type->to) continue;
            $percent = $type->percent;
        }

        if($percent == 0) {
            $type = $this->types->last();

            $percent = $type->percent;
        }

        return $percent;
    }
}
