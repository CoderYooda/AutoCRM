<?php

namespace App\Mail\Provider;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProviderEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $message;
    private $fio;
    private $phone;
    private $company_id;

    public function __construct(array $data)
    {
        $this->message = $data['message'];
        $this->phone = $data['phone'];
        $this->fio = $data['fio'];
        $this->company_id = $data['company_id'];
    }



    public function build()
    {
        return $this->view('classic.system.message.email_message')
            ->subject('Заявка по поставщикам')
            ->with([
                'fio' => $this->fio,
                'phone' => $this->phone,
                'text' => $this->message,
                'company_id' => $this->company_id
            ]);
    }
}
