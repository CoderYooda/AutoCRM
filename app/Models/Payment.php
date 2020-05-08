<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\API\TinkoffMerchantAPI;
use Auth;

class Payment extends Model
{
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

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function freshStatus(){

        if($this->status == 'CONFIRMED' || $this->status == 'REJECTED' || $this->status == 'REFUNDED'){
            //todo
        } else {
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
        }



        return $this;
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id');
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
        }

        return $this->status;
    }

    public function getDate(){
        return $this->created_at->format('d.m.Y (H:i:s)');
    }
}
