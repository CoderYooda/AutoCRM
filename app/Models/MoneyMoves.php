<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class MoneyMoves extends Model
{
    protected $guarded = [];

    protected $table = 'money_move';

    public $fields = [
        'do_date',
        'out_cashbox_id',
        'in_cashbox_id',
        'company_id',
        'summ',
        'comment',
    ];

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function in_cashbox()
    {
        return $this->belongsTo('App\Models\Cashbox', 'in_cashbox_id');
    }

    public function out_cashbox()
    {
        return $this->belongsTo('App\Models\Cashbox', 'out_cashbox_id');
    }
}
