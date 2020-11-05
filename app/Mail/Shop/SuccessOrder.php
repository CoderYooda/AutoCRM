<?php

namespace App\Mail\Shop;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SuccessOrder extends Mailable implements ShouldQueue
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
        return $this->view('shop.emails.success_order')
            ->with('order', $this->order);
    }
}
