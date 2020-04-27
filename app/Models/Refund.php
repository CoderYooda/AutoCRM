<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    protected $table = 'refund';


    public $fields = [
        'shipment_id',
        'company_id',
        'store_id',
        'summ',
        'comment',
    ];

    protected $guarded = [];

    public function shipment()
    {
        return $this->belongsTo('App\Models\Shipment', 'shipment_id');
    }

}
