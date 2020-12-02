<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SberbankController extends Controller
{
    private $username;
    private $password;

    private $url = 'https://3dsec.sberbank.ru';
//    private $url = 'https://securepayments.sberbank.ru';

    public function __construct($username, $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    public function cancelOrder($orderId)
    {
        $url = $this->url . '/payment/rest/reverse.do?language=ru&orderId='.$orderId."&password=".$this->password."&userName=".$this->username;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);

        if( $response ){
            $response = json_decode($response, true);
            return $response;
        }

        return false;
    }

    public function getOrderStatus( $orderId ) {
        // https:/server/application_context/rest/getOrderStatus.do? orderId=b8d70aa7-bfb3-4f94-b7bb-aec7273e1fce&language=ru&password=password&userName=userName
        $url = $this->url . '/payment/rest/getOrderStatus.do?orderId='.$orderId."&language=ru&password=".$this->password."&userName=".$this->username;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);

        if( $response ){

            $response = json_decode($response, true);
            return $response;
//            if( $response['ErrorMessage'] ){
//
//                if( $response['OrderStatus'] == 2 ){
//                    return "Спасибо, заказ №".$response['OrderNumber']." оплачен.";
//                } else {
//                    return "Статус заказа: ".$response['ErrorMessage'];
//                }
//
//            }

        }
        return false;
    }

    public function registerOrder($orderId, $total_price, $returnUrl)
    {
        $url = $this->url . '/payment/rest/register.do?amount='.intval($total_price)."00&currency=643&language=ru&orderNumber=".$orderId.
            "&password=".$this->password.
            "&userName=".$this->username.
            "&returnUrl=".$returnUrl.
            "&failUrl=".$returnUrl.
            "&pageView=DESKTOP&sessionTimeoutSecs=3600";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);

        if( $response ){
            $response = json_decode($response, true);
            return $response;
        }
        return false;
    }
}
