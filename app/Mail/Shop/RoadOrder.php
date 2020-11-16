<?php

namespace App\Mail\Shop;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RoadOrder extends Mailable implements ShouldQueue
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
        return $this->view('shop.emails.order.road')
            ->subject('Заказ №' . $this->order->id . ' был отправлен')
            ->with([
                'order' => $this->order,
                'shop' => $this->order->shop
            ]);
    }
}
