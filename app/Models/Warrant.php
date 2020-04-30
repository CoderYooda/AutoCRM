<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Warrant extends Model
{
    protected $guarded = [];

    public $fields = [
        'do_date',
        'cashbox_id',
        'partner_id',
        'ddsarticle_id',
        'company_id',
        'summ',
        'reason',
        'comment',
        'isIncoming',
        'balance',
        'refer',
        'refer_id',
    ];

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id')->withTrashed();
    }

    public function ddsarticle()
    {
        return $this->belongsTo('App\Models\DdsArticle', 'ddsarticle_id');
    }

    public function cashbox()
    {
        return $this->belongsTo('App\Models\Cashbox', 'cashbox_id');
    }

    public function client_order()
    {
        return $this->belongsToMany('App\Models\ClientOrder', 'client_orders_warrant', 'warrant_id', 'client_order_id' );
    }

    public function refund()
    {
        return $this->belongsToMany('App\Models\Refund', 'refund_warrant', 'warrant_id', 'refund_id' );
    }

    public function providerorder()
    {
        return $this->belongsToMany('App\Models\ProviderOrder', 'provider_order_warrant', 'warrant_id', 'providerorder_id' );
    }

    public function entrance()
    {
        return $this->belongsToMany('App\Models\Entrance', 'entrance_warrant', 'warrant_id', 'entrance_id' );
    }

    public function getName()
    {
        if($this->isIncoming){
            $name = 'Приходный ордер №' . $this->id;
        } else {
            $name = 'Расходный ордер №' . $this->id;
        }

        return $name;
    }

    public function normalizedData(){
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function shipment()
    {
        return $this->belongsToMany('App\Models\Shipment', 'shipment_warrant', 'warrant_id', 'shipment_id' );
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

}
