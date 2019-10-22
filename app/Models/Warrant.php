<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Warrant extends Model
{
    protected $guarded = [];

    public $fields = [
        'do_date',
        'cashbox_id',
        'partner_id',
        'ddsarticle_id',
        'company_id',
        'summ',
        'reason',
        'comment',
        'isIncoming',
        'balance'
    ];

    public function partner()
    {
        return $this->belongsTo('App\Models\Partner', 'partner_id')->withTrashed();
    }

    public function ddsarticle()
    {
        return $this->belongsTo('App\Models\DdsArticle', 'ddsarticle_id');
    }

    public function cashbox()
    {
        return $this->belongsTo('App\Models\Cashbox', 'cashbox_id');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

}
