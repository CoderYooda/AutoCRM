<?php

namespace App\Mail\Shop;

use App\Models\Shop;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class FeedbackMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    private $name;
    private $phone;

    /** @var Shop */
    private $shop;

    public function __construct(array $data)
    {
        $this->name = $data['name'];
        $this->phone = $data['phone'];
        $this->shop = $data['shop'];
    }

    public function build()
    {
        return $this->view('shop.emails.feedback')
            ->subject('Заявка на обратный звонок')
            ->with([
                'name' => $this->name,
                'phone' => $this->phone
            ]);
    }
}
