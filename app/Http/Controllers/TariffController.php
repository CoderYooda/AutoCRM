<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\API\TinkoffMerchantAPI;
use Auth;

class TariffController extends Controller
{
    public static function takePayment(Request $request){

        $api = new TinkoffMerchantAPI(env('TINKOFF_TERMINAL_KEY'), env('TINKOFF_SECRET_KEY'));

        $email = 'daddyman88@inbox.ru';
        $emailCompany = 'CoderYooda@gmail.com';
        $phone = '89524365064';

        $taxations = [
            'osn'                => 'osn',                // Общая СН
            'usn_income'         => 'usn_income',         // Упрощенная СН (доходы)
            'usn_income_outcome' => 'usn_income_outcome', // Упрощенная СН (доходы минус расходы)
            'envd'               => 'envd',               // Единый налог на вмененный доход
            'esn'                => 'esn',                // Единый сельскохозяйственный налог
            'patent'             => 'patent'              // Патентная СН
        ];

        $paymentMethod = [
            'full_prepayment' => 'full_prepayment', //Предоплата 100%
            'prepayment'      => 'prepayment',      //Предоплата
            'advance'         => 'advance',         //Аванc
            'full_payment'    => 'full_payment',    //Полный расчет
            'partial_payment' => 'partial_payment', //Частичный расчет и кредит
            'credit'          => 'credit',          //Передача в кредит
            'credit_payment'  => 'credit_payment',  //Оплата кредита
        ];

        $paymentObject = [
            'commodity'             => 'commodity',             //Товар
            'excise'                => 'excise',                //Подакцизный товар
            'job'                   => 'job',                   //Работа
            'service'               => 'service',               //Услуга
            'gambling_bet'          => 'gambling_bet',          //Ставка азартной игры
            'gambling_prize'        => 'gambling_prize',        //Выигрыш азартной игры
            'lottery'               => 'lottery',               //Лотерейный билет
            'lottery_prize'         => 'lottery_prize',         //Выигрыш лотереи
            'intellectual_activity' => 'intellectual_activity', //Предоставление результатов интеллектуальной деятельности
            'payment'               => 'payment',               //Платеж
            'agent_commission'      => 'agent_commission',      //Агентское вознаграждение
            'composite'             => 'composite',             //Составной предмет расчета
            'another'               => 'another',               //Иной предмет расчета
        ];

        $vats = [
            'none'  => 'none', // Без НДС
            'vat0'  => 'vat0', // НДС 0%
            'vat10' => 'vat10',// НДС 10%
            'vat20' => 'vat20' // НДС 20%
        ];

        $enabledTaxation = true;



        $isShipping = false;

        if (!empty($isShipping[2]['Name'] === 'shipping')) {
            $isShipping = true;
        }



        $enabledTaxation = true;

        $amount = $request['amount'];
        $days = 0;
        $type = null;

        $error = false;
        if($request['tariff_id'] !== null){
            switch($request['tariff_id']){
                case 30:
                    $type = 'pay_to_store';
                    $amount = 2500;
                    $days = 30;
                    break;
                case 180:
                    $type = 'pay_to_store';
                    $amount = 14400;
                    $days = 180;
                    break;
                case 360:
                    $type = 'pay_to_store';
                    $amount = 27600;
                    $days = 360;
                    break;
                case 1:
                    $type = 'pay_to_sms';
                    break;
                default:
                    $error = true;
                    break;
            }
        } else {
            $error = true;
        }


        if($error){
            return response()->json([
                'message' => 'Выбраный тариф не существует или не актуален',
                'type' => 'danger',
            ], 422);
        }


        $amount = $amount * 100;

        $receiptItem = [[
            'Name'          => 'Оплата ' . $days . ' дней пользования CRM',
            'Price'         => $amount,
            'Quantity'      => 1,
            'Amount'        => $amount,
            'PaymentMethod' => $paymentMethod['full_prepayment'],
            'PaymentObject' => $paymentObject['service'],
            'Tax'           => $vats['none']
        ]];

        $receipt = [
            'EmailCompany' => $emailCompany,
            'Phone'        => Auth::user()->phone,
            'Taxation'     => $taxations['osn'],
            'Items'        => self::balanceAmount($isShipping, $receiptItem, $amount),
        ];


        $payment = new Payment();
        $payment->add_days = $days;
        $payment->type = $type;
        $payment->add_balance = $amount / 100;
        $payment->save();
        $payment->OrderId = $payment->id . date("_md_s");
        $params = [
            'OrderId' => $payment->OrderId,
            'Amount'  => $amount,
            'SuccessURL' => route('UserIndex', ['id' => Auth::id(), 'active_tab' => 'service']),
            'DATA'    => [
                'Email'           => 'Coderyooda@gmail.com',//Auth::user()->phone,
                'Connection_type' => 'example'
            ],
        ];

        if ($enabledTaxation) {
            $params['Receipt'] = $receipt;
        }

        $api->init($params);

        unset($params['DATA']);
        unset($params['Receipt']);
        $params['Password'] = env('TINKOFF_SECRET_KEY');
        ksort($params);
        $token_str = '';

        foreach($params as $param){
            $token_str .= $param;
        }

        $payment->company_id = Auth::user()->company->id;
        $payment->partner_id = Auth::user()->partner->id;
        $payment->paymentId = $api->paymentId;
        $payment->amount = $amount;
        $payment->paymentUrl = $api->paymentUrl;
        $payment->response = $api->response;
        $payment->status = $api->status;
        $payment->token = hash( 'sha256', $token_str );
        $payment->error = $api->error;
        $payment->save();

        if($request->expectsJson()){
            return response()->json([
                'redirect' => $payment->paymentUrl
            ]);
        } else {
            return $payment;
        }
    }

    public static function checkSmsPayment(Request $request){

        $payments = Payment::owned()->where('type', 'pay_to_sms')->get();

        foreach($payments as $payment){
            $payment->freshStatus();
        }

        if($request->expectsJson()){
            return response()->json([
                'sms_balance' => Auth::user()->company->getSmsBalance()
            ]);
        }
    }


    public static function checkPayment(Request $request){

        $payment = Payment::owned()->where('OrderId', $request['order_id'])->first();

        $payment->freshStatus();

        $payment_htnl = view( get_template() . '.tariff.payment_element', compact('payment'));

        if($request->expectsJson()){
            return response()->json([
                'target' => 'payment'.$payment->id,
                'html' => $payment_htnl->render()
            ]);
        } else {
            return $payment_htnl;
        }
    }

    private static function balanceAmount($isShipping, $items, $amount)
    {
        $itemsWithoutShipping = $items;

        if ($isShipping) {
            $shipping = array_pop($itemsWithoutShipping);
        }

        $sum = 0;

        foreach ($itemsWithoutShipping as $item) {
            $sum += $item['Amount'];
        }

        if (isset($shipping)) {
            $sum += $shipping['Amount'];
        }

        if ($sum != $amount) {
            $sumAmountNew = 0;
            $difference = $amount - $sum;
            $amountNews = [];

            foreach ($itemsWithoutShipping as $key => $item) {
                $itemsAmountNew = $item['Amount'] + floor($difference * $item['Amount'] / $sum);
                $amountNews[$key] = $itemsAmountNew;
                $sumAmountNew += $itemsAmountNew;
            }

            if (isset($shipping)) {
                $sumAmountNew += $shipping['Amount'];
            }

            if ($sumAmountNew != $amount) {
                $max_key = array_keys($amountNews, max($amountNews))[0];    // ключ макс значения
                $amountNews[$max_key] = max($amountNews) + ($amount - $sumAmountNew);
            }

            foreach ($amountNews as $key => $item) {
                $items[$key]['Amount'] = $amountNews[$key];
            }
        }

        return $items;
    }

}
