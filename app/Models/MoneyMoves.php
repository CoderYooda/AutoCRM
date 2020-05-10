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

    public function manager()
    {
        return $this->belongsTo(Partner::class, 'manager_id');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function in_cashbox()
    {
        return $this->belongsTo(Cashbox::class, 'in_cashbox_id');
    }

    public function out_cashbox()
    {
        return $this->belongsTo(Cashbox::class, 'out_cashbox_id');
    }
}
