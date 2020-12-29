<?php

namespace App\Mail\Shop;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewOrderEmail extends Mailable implements ShouldQueue
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
        return $this->view('shop.emails.order.created')
            ->subject('Поступил новый заказ №' . $this->order->id)
            ->with('order', $this->order);
    }
}
