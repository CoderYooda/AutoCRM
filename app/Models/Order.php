<?php

namespace App\Models;

use App\Http\Controllers\API\SberbankController;
use App\Http\Controllers\API\TinkoffMerchantAPI;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use YandexCheckout\Client;
use Idma\Robokassa\Payment;
use App\Facades\NotifyServiceFacade as Notify;


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
        'На подтверждении',
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

    public function path()
    {
        return $this->shop->getUrl() . 'orders/' . $this->hash;
    }

    public function shop()
    {
        return $this->hasOne(Shop::class, 'id', 'shop_id');
    }

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

    public function initPayment()
    {
        $shop = $this->shop;

        $paymentMethod = $shop->getActivePaymentMethod();

        if ($paymentMethod != []) {

            $paymentId = null;
            $paymentUrl = null;

            if ($paymentMethod['name'] == 'tinkoff') {
                $api = new TinkoffMerchantAPI($paymentMethod['params']['terminal_key'], $paymentMethod['params']['secret_key']);

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

                if ($this->delivery_type == Order::DELIVERY_TYPE_TRANSPORT && $this->delivery_price > 0) {

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
                    'SuccessURL' => $this->path(),
                    'Receipt'    => $receipt
                ];

                $api->init($params);

                $paymentId = $api->paymentId;
                $paymentUrl = $api->paymentUrl;
            }
            else if ($paymentMethod['name'] == 'yandex') {

                $client = new Client();
                $client->setAuth($paymentMethod['params']['shop_id'], $paymentMethod['params']['secret_key']);

                $totalPrice = 0;

                foreach ($this->positions as $position) {
                    $totalPrice += $position->price * $position->count;
                }

                if ($this->delivery_type == Order::DELIVERY_TYPE_TRANSPORT && $this->delivery_price > 0) {
                    $totalPrice += $this->delivery_price;
                }

                $response = $client->createPayment([
                    'amount' => [
                        'value' => $totalPrice,
                        'currency' => 'RUB',
                    ],
                    'confirmation' => [
                        'type' => 'redirect',
                        'return_url' => $this->path(),
                    ],
                    'capture' => true,
                    'description' => 'Заказ №' . $this->id,
                ],
                uniqid('', true));

                $paymentId = $response->id;
                $paymentUrl = $response->getConfirmation()->getConfirmationUrl();
            }
            else if($paymentMethod['name'] == 'sberbank') {

                $api = new SberbankController($paymentMethod['params']['login'], $paymentMethod['params']['password']);

                $totalPrice = 0;

                foreach ($this->positions as $position) {
                    $totalPrice += $position->price * $position->count;
                }

                if ($this->delivery_type == Order::DELIVERY_TYPE_TRANSPORT && $this->delivery_price > 0) {
                    $totalPrice += $this->delivery_price;
                }

                $response = $api->registerOrder($this->id, $totalPrice, $this->path());

                $paymentId = $response['orderId'];
                $paymentUrl = $response['formUrl'];
            }
            else if($paymentMethod['name'] == 'robokassa') {
                $api = new Payment($paymentMethod['params']['login'], $paymentMethod['params']['first_password'], $paymentMethod['params']['second_password']);

                $totalPrice = $this->getTotalPrice();

                $paymentId = $this->id;
                $paymentUrl = $api
                    ->setEmail($this->email)
                    ->setInvoiceId($this->id)
                    ->setSum($totalPrice)
                    ->setDescription('Оплата заказа в интернет магазине №' . $this->id)
                    ->getPaymentUrl();

            }

            $this->update([
                'payment_type' => $paymentMethod['name'],
                'payment_id' => $paymentId,
                'payment_url' => $paymentUrl,
            ]);
        }

//        Mail::to($this->email)->send(new PaymentOrder($this));

        Notify::sendMail($this, 'paymentOrder', $this->email, 'Заказ №' . $this->id . ' ожидает оплаты');

        return redirect($paymentUrl);
    }

    protected function getTotalPrice()
    {
        $totalPrice = 0;

        foreach ($this->positions as $position) {
            $totalPrice += $position->price * $position->count;
        }

        if ($this->delivery_type == Order::DELIVERY_TYPE_TRANSPORT && $this->delivery_price > 0) {
            $totalPrice += $this->delivery_price;
        }

        return $totalPrice;
    }
}
