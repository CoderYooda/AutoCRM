<?php

namespace App\Models;

use App\Http\Controllers\HelpController;
use App\Models\System\Image;
use App\Traits\OwnedTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Partner extends Model
{
    use OwnedTrait, SoftDeletes;

    protected $guarded = [];

    public $fields = [
        'company_id',
        'user_id',
        'category_id',
        'store_id',
        'foundstring',
        'basePhone',
        'type',
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
        'cs',
        'rs',
        'opf'
    ];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'partner_id', 'id');
    }

    public function pic(){
        return $this->belongsTo(Image::class, 'pic_id');
    }

    public function avatar(){
        return $this->belongsTo(Image::class, 'avatar_id');
    }

    public function getPicUrl(){
        return ( $this->pic()->first() && file_exists(public_path($this->pic()->first()->url)) ) ? $this->pic()->first()->thumb_url : asset('images/noavatar.png');
    }

    public function getAvatarUrl(){
        return ($this->avatar()->first() && file_exists(public_path($this->avatar()->first()->url))) ? $this->avatar()->first()->url : asset('images/noavatar.png');
    }

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

    public function getCutSurnameAttribute()
    {
        $return_name = '';

        $arr = explode(' ', $this->fio);

        foreach ($arr as $key => $value)
        {

            if(!$key) $return_name .= ($value . ' ');
            else $return_name .= (mb_substr($value, 0, 1) . '.');
        }
        return $return_name;
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

    public function outputName() //Вывод имени или наименования компании
    {
        return $this->type == 2 ? $this->companyName : $this->fio;
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
        return ['Физическое лицо', 'Индивидуальный предприниматель', 'Юридическое лицо'][$this->type];
    }

    public function getOfficialNameAttribute()
    {
        $return_name = '';

        if($this->category->name == 'Анонимы') {
            $return_name = 'Физическое лицо';
        }
        else if($this->type == 0) {
            $return_name = $this->fio;
        }
        else if($this->type == 1) {
            $return_name = 'ИП ' . $this->fio;
        }
        else {
            $return_name = ($this->opf . ' ' ?? '') . $this->companyName;
        }

        return $return_name;
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
