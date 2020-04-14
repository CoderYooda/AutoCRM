<?php

namespace App\Models;

use App\Http\Controllers\HelpController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Partner extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    public $fields = [
        'company_id',
        'user_id',
        'category_id',
        'store_id',
        'isfl',
        'fio',
        'birthday',
        'address',
        'email',
        'comment',
        'barcode',
        'companyName',
        'ur_address',
        'fact_address',
        'inn',
        'ogrn',
        'bank',
        'bik',
        'kpp',
    ];

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function store()
    {
        return $this->belongsTo('App\Models\Store', 'store_id');
    }

    public function phones()
    {
        return $this->belongsToMany('App\Models\Phone', 'partner_phone');
    }

    public function salarySchemas()
    {
        return $this->belongsToMany('App\Models\SalarySchema', 'salary_schemas_partner');
    }

    public function firstActivePhoneNumber()
    {
        $phones = $this->phones();
        $num_out = 'Основной номер не указан';
        if($phones){
            $number = $phones->where('main', true)->first();
            if($number){

                $num_out = HelpController::phoneFormat( $number->number);
            }
        }
        return $num_out;
    }

    public function passport()
    {
        return $this->hasOne('App\Models\Passport');
    }

    public function car()
    {
        return $this->hasOne('App\Models\Car');
    }

    public function outputName() //Вывод имени или наименования компании
    {
        if($this->isfl){
            return $this->fio;
        } else {
            return $this->companyName;
        }
    }

    public function firstLetterOfName(){
        return mb_strtoupper(mb_substr($this->outputName(), 0, 1));
    }

    public function isflText(){
        if($this->isfl){
            return 'Физическое лицо';
        } else {
            return 'Юридическое лицо';
        }
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function user(){
        return $this->BelongsTo('App\Models\User', 'user_id');
    }

    public function addition($summ){
        $this->balance = round($this->balance + $summ, 2);

        $this->save();
        return true;
    }

    public function subtraction($summ){
        $this->balance = round($this->balance - $summ, 2);
        $this->save();
        return true;
    }

}
