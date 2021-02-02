<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Markup extends Model
{
    protected $guarded = [];

    protected $table = 'prices';

    public function options()
    {
        return $this->hasMany(MarkupOption::class, 'price_id', 'id');
    }

    public function getPercentByAmount($amount)
    {
        $percent = 0;

        foreach ($this->options as $option) {
            if($amount < $option->from || $amount > $option->to) continue;
            $percent = $option->percent;
        }

        if($percent == 0) {
            $option = $this->options->last();

            $percent = $option->percent;
        }

        return $percent;
    }
}
