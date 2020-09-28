<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

Carbon::setToStringFormat('d.m.Y H:i');

class Order extends Model
{
    public static $statues = [
        0 => 'Ожидает подтверждения',
        1 => 'Подтверждён'
    ];

    protected $guarded = [];

    protected $table = 'orders';

    public function partner()
    {
        return $this->hasOne(Partner::class, 'id', 'partner_id');
    }

    public function products()
    {
        return $this->belongsToMany(Article::class, 'order_articles', 'order_id', 'article_id');
    }

    public function getStatusName()
    {
        return self::$statues[$this->status];
    }
}
