<?php

namespace App\Models;

use App\DeliveryAddress;
use App\Http\Controllers\API\TinkoffMerchantAPI;
use App\Services\ShopManager\ShopManager;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

Carbon::setToStringFormat('d.m.Y H:i');

class Order extends Model
{
    const MODERATING_STATUS = 0;
    const WAIT_PAYMENT_STATUS = 1;
    const WORKING_STATUS = 2;
    const DELIVERY_STATUS = 3;
    const WAIT_PICKUP_STATUS = 4;
    const READY_STATUS = 5;
    const CANCELED_STATUS = 6;
    const REFUND_STATUS = 7;

    const PAYMENT_TYPE_CASH = 0;
    const PAYMENT_TYPE_ONLINE = 1;

    const DELIVERY_TYPE_PICKUP = 0;
    const DELIVERY_TYPE_TRANSPORT = 1;

    protected $table = 'orders';
    protected $guarded = [];

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public static $statuses = [
        'На подтверждение',
        'Ожидает оплаты',
        'В работе',
        'В пути',
        'Ожидает выдачи',
        'Выполнен',
        'Отменен',
        'Возврат'
    ];

    public static $deliveryTypes = [
        'Самовывоз',
        'Доставка'
    ];

    public static $payStatuses = [
        'Наличные',
        'Оплата на сайте'
    ];

    public function partner()
    {
        return $this->hasOne(Partner::class, 'id', 'partner_id');
    }

    public function positions()
    {
        return $this->hasMany(OrderPosition::class, 'order_id', 'id');
    }

    public function deliveryAddress()
    {
        return $this->hasOne(DeliveryAddress::class, 'id', 'delivery_id');
    }

    public function pickupAddress()
    {
        return $this->hasOne(Store::class, 'id', 'pickup_id');
    }

    public function getDeliveryTypeName()
    {
        return self::$deliveryTypes[$this->delivery_type];
    }

    public function getStatusName()
    {
        return self::$statuses[$this->status];
    }

    public function getPayTypeName()
    {
        return self::$payStatuses[$this->pay_type];
    }

    public function shop()
    {
        return $this->hasOne(Shop::class, 'company_id', 'company_id');
    }

    public function initPayment()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop() ?? Shop::where('company_id', Auth::user()->company_id)->first();

        $api = new TinkoffMerchantAPI(env('TINKOFF_TERMINAL_KEY'), env('TINKOFF_SECRET_KEY'));

        $companyEmail = $shop->orderEmails->first()->email;
        $companyPhone = $shop->phone->number;

        $receiptItems = [];

        $totalPrice = 0;

        foreach ($this->positions as $position) {

            $price = (int)$position->price * 100;

            $totalPrice += $price;

            $receiptItems[] = [
                'Name'          => $position->name,
                'Price'         => $price,
                'Quantity'      => $position->count,
                'Amount'        => $price,
                'PaymentMethod' => 'full_prepayment',
                'PaymentObject' => 'commodity',
                'Tax'           => 'none'
            ];
        }

        if($this->delivery_type == Order::DELIVERY_TYPE_TRANSPORT && $this->delivery_price > 0) {

            $receiptItems[] = [
                'Name'          => 'Доставка',
                'Price'         => $this->delivery_price * 100,
                'Quantity'      => 1,
                'Amount'        => $this->delivery_price * 100,
                'PaymentMethod' => 'full_prepayment',
                'PaymentObject' => 'commodity',
                'Tax'           => 'none'
            ];
        }

        $receipt = [
            'EmailCompany' => $companyEmail,
            'Phone'        => $companyPhone,
            'Taxation'     => 'osn',
            'Items'        => $receiptItems,
        ];

        $params = [
            'OrderId'    => $this->id,
            'Amount'     => $totalPrice,
            'SuccessURL' => $shop->getUrl() . 'orders/' . $this->id,
            'Receipt'    => $receipt
        ];

        $api->init($params);

        $this->update([
            'tinkoff_id' => $api->paymentId,
            'tinkoff_url' => $api->paymentUrl
        ]);

        return redirect($api->paymentUrl);
    }
}
