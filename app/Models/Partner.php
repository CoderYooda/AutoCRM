<?php

namespace App\Models;

use App\Http\Controllers\HelpController;
use Carbon\Carbon;
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
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function phones()
    {
        return $this->belongsToMany(Phone::class, 'partner_phone');
    }

    public function salarySchemas()
    {
        return $this->belongsToMany(SalarySchema::class, 'salary_schemas_partner');
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
        if(!$num_out){
            $num_out = 'Ошибка форматирования номера';
        }
        return $num_out;
    }

    public function getComment()
    {
        //TODO check
        return $this->comment ?: 'Комментария нет';
    }

    public function passport()
    {
        return $this->hasOne(Passport::class);
    }

    public function car()
    {
        return $this->hasOne(Car::class);
    }

    public function outputName() //Вывод имени или наименования компании
    {
        return $this->isfl ? $this->fio : $this->companyName;
    }

    public function outputEmail()
    {
        //TODO check
        return $this->email ?: 'Email не указан';
    }

    public function firstLetterOfName(){
        return mb_strtoupper(mb_substr($this->outputName(), 0, 1));
    }

    public function isflText(){
        return $this->isfl ? 'Физическое лицо' : 'Юридическое лицо';
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function user(){
        return $this->BelongsTo(User::class, 'user_id');
    }

    public function getBirthday(){
        return $this->birthday ? Carbon::parse($this->birthday)->format('d.m.Y') : 'Не указано';
    }

    public function getBarCode(){
        return $this->barcode ? $this->barcode : 'Штрихкод не указан';
    }

    public function getDateMembership()
    {
        $user = $this->user()->first();
        return $user ? $user->created_at->format('d.m.Y') : '-';
    }

    public function addition($summ)
    {
        $this->update(['balance' => round($this->balance + $summ, 2)]);
        return true;
    }

    public function subtraction($summ)
    {
        $this->update(['balance' => round($this->balance - $summ, 2)]);
        return true;
    }

}
