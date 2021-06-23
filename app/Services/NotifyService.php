<?php

namespace App\Services;


use Sendpulse\RestApi\ApiClient;
use Sendpulse\RestApi\Storage\FileStorage;

class NotifyService
{
    private $client;

    public function __construct()
    {
        $this->client = new ApiClient('d7005dfb68d1408e38b7695e3e005160', '352115c3e7555547480f755603892ebb', new FileStorage());
    }

    private function getHtmlTemplate($model, $tag)
    {
        return [
            'order_canceled' => view('shop.emails.order.canceled')->with($tag, $model),
            'order_confirmed' => view('shop.emails.order.confirmed')->with($tag, $model),
        ];

    }

    private function orderCanceled($model)
    {
        return view('shop.emails.order.canceled')->with([
            'order' => $model,
            'shop' => $model->shop
        ]);
    }

    private function orderConfirmed($model)
    {
        return view('shop.emails.order.confirmed')->with([
            'order' => $model,
            'shop' => $model->shop
        ]);
    }

    private function waitOrder($model)
    {
        return view('shop.emails.order.wait')->with([
            'order' => $model,
            'shop' => $model->shop
        ]);
    }

    private function roadOrder($model)
    {
        return view('shop.emails.order.road')->with([
            'order' => $model,
            'shop' => $model->shop
        ]);
    }

    private function paymentOrder($model)
    {
        return view('shop.emails.order.payment')->with([
            'order' => $model,
            'shop' => $model->shop
        ]);
    }

    private function newOrderEmail($model)
    {
        return view('shop.emails.order.created')
            ->with('order', $model);
    }
    private function moderateOrder($model)
    {
        return view('shop.emails.order.moderating')
            ->with('order', $model)
            ->with('shop', $model->shop);
    }

    private function payedOrder($model)
    {
        return view('shop.emails.order.payed')
            ->with([
                'order' => $model->order,
                'shop' => $model->order->shop
            ]);
    }

    private function feedbackMail($model)
    {
        return view('feedback');
    }

    private function callbackMail($model){
        return view('shop.emails.feedback')->with([
            'name' => $model['name'],
            'phone' => $model['phone'],
            'shop' => $model['shop']
        ]);
    }

    private function providerEmail($model){
        return view('classic.system.message.email_message')->with([
            'fio' => $model['fio'],
            'phone' => $model['phone'],
            'text' => $model['message'],
            'company_id' => $model['company_id']
        ]);
    }

    public function sendMail($model, $tag,  $reciever_mail, $subject)
    {
        $email = array(
            'html' => $this->$tag($model),
            'subject' => $subject,
            'from' => array(
                'name' => 'Информация BBCRM',
                'email' => 'info@bbcrm.ru',
            ),
            'to' => array(
                array(
                    'name' => 'Получатель',
                    'email' => $reciever_mail,
                ),
            ),
        );
        $this->client->smtpSendMail($email);
    }
}
