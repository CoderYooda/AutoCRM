<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;

class Warrant extends Model
{
    use OwnedTrait, HasManagerAndPartnerTrait;

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
    ];

    public function ddsarticle()
    {
        return $this->belongsTo(DdsArticle::class, 'ddsarticle_id');
    }

    public function cashbox()
    {
        return $this->belongsTo(Cashbox::class, 'cashbox_id');
    }

    public function client_order()
    {
        return $this->belongsToMany(ClientOrder::class, 'client_orders_warrant', 'warrant_id', 'client_order_id' );
    }

    public function refund()
    {
        return $this->belongsToMany(Refund::class, 'refund_warrant', 'warrant_id', 'refund_id' );
    }

    public function payable()
    {
        return $this->morphTo();
    }

    public function providerorder()
    {
        return $this->belongsToMany(ProviderOrder::class, 'provider_order_warrant', 'warrant_id', 'providerorder_id' );
    }

    public function entrance()
    {
        return $this->belongsToMany(Entrance::class, 'entrance_warrant', 'warrant_id', 'entrance_id' );
    }

    public function getName()
    {
        return $this->isIncoming ? ('Приходный ордер №' . $this->id) : ('Расходный ордер №' . $this->id);
    }

    public function normalizedData(){
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function shipment()
    {
        return $this->payable();
    }

}
