<?php

namespace App\Mail\Shop;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ConfirmOrder extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var Order $order */
    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->view('shop.emails.order.confirmed')
            ->subject('Ваш заказ №' . $this->order->id . ' в работе')
            ->with('order', $this->order)
            ->with('shop', $this->order->shop);
    }
}
