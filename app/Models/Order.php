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
        'Ожидает подтверждения',
        'Ожидает оплаты',
        'Подтверждён',
        'Отменён'
    ];

    public function partner()
    {
        return $this->hasOne(Partner::class, 'id', 'partner_id');
    }

    public function positions()
    {
        return $this->hasMany(OrderPosition::class, 'order_id', 'id');
    }

    public function getStatusName()
    {
        return self::$statues[$this->status];
    }
}
