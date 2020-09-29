<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

Carbon::setToStringFormat('d.m.Y H:i');

class Order extends Model
{
    protected $table = 'orders';
    protected $guarded = [];

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public static $statues = [
        0 => 'Ожидает подтверждения',
        1 => 'Подтверждён',
        2 => 'Отменён'
    ];

    public function partner()
    {
        return $this->hasOne(Partner::class, 'id', 'partner_id');
    }

    public function products()
    {
        return $this->belongsToMany(Article::class, 'order_articles', 'order_id', 'article_id')->withPivot('price', 'count');
    }

    public function getStatusName()
    {
        return self::$statues[$this->status];
    }
}
