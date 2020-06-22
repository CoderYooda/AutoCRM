<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\API\TinkoffMerchantAPI;
use Auth;

class Payment extends Model
{
    use OwnedTrait;

    protected $table = 'payment';

    protected $guarded = [];

    public $fields = [
        'company_id',
        'paymentId',
        'amount',
        'paymentUrl',
        'response',
        'status',
        'error'
    ];

    public function freshStatus(){
        $previous_status = $this->status;

        $api = new TinkoffMerchantAPI(env('TINKOFF_TERMINAL_KEY'), env('TINKOFF_SECRET_KEY'));

        $params = [
            'TerminalKey'   => env('TINKOFF_TERMINAL_KEY'),
            'PaymentId'     => $this->paymentId,
        ];

        $api->getState($params);

        if($api->error == ''){
            $this->status = $api->status;
            $this->save();
        }

        $new_status = $this->status; //DEADLINE_EXPIRED

        if($previous_status !== $new_status){
            $company = $this->company;
            if(($previous_status == 'FORM_SHOWED' || $previous_status == 'NEW') && $new_status == 'CONFIRMED'){
                $company->increment('balance', $this->add_balance);
                $company->increment('payed_days', $this->add_days);
            }
            if($previous_status == 'CONFIRMED' && $new_status == 'REFUNDED'){
                $company->decrement('balance', $this->add_balance);
                $company->decrement('payed_days', $this->add_days);
            }
        }



        return $this;
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class, 'partner_id');
    }

    public function getAmount(){
        return $this->amount ? (int)$this->amount / 100 : 'Не указано';
    }

    public function getStatus(){

        switch ($this->status) {
            case 'NEW': return 'В самом начале'; break;
            case 'FORM_SHOWED': return 'На странице оплаты'; break;
            case 'CONFIRMED': return 'Подтверждено'; break;
            case 'REJECTED': return 'Отменен'; break;
            case 'REFUNDED': return 'Возвращен'; break;
            case 'DEADLINE_EXPIRED': return 'Просрочен'; break;
            case '3DS_CHECKING': return 'Проверяется по протоколу 3-D Secure'; break;
        }

        return $this->status;
    }

    public function getDate(){
        return $this->created_at->format('d.m.Y (H:i:s)');
    }
}
