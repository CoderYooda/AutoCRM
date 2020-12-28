<?php

namespace App\Mail\Shop;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PaymentOrder extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var Order */
    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->view('shop.emails.order.payment')
            ->subject('Заказ №' . $this->order->id . ' ожидает оплаты')
            ->with('order', $this->order)
            ->with('shop', $this->order->shop);
    }
}
