<?php

namespace App\Models;

use App\DeliveryAddress;
use App\Http\Controllers\HelpController;
use App\Models\System\Image;
use App\Traits\OwnedTrait;
use App\Traits\Phoneable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Partner extends Model
{
    use OwnedTrait, SoftDeletes, Phoneable;

    protected $guarded = [];

    public $fields = [
        'company_id',
        'user_id',
        'category_id',
        'store_id',
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

    public function freshFoundString()
    {
        $phones_str = '';
        foreach($this->phones as $phone){
            $phones_str .= $phone->number;
        }

        $this->foundstring = mb_strtolower(str_replace(['(', ')', ' ', '-', '+'], '', $this->fio . $this->companyName . $phones_str . $this->barcode));
    }

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

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'manager_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'partner_id');
    }

    public function phones()
    {
        return $this->belongsToMany(Phone::class, 'partner_phone');
    }

    public function nameLetters()
    {
        $words = explode(' ', $this->fio);

        $letters = '';

        foreach ($words as $word) {
            $letters .= mb_substr($word, 0, 1);
        }

        return $letters;
    }

    public function getSurnameAttribute()
    {
        return explode(' ', $this->fio)[0];
    }

    public function getNameAttribute()
    {
        return explode(' ', $this->fio)[1] ?? '0';
    }

    public function getMiddlenameAttribute()
    {
        return explode(' ', $this->fio)[2] ?? '';
    }

    public function salarySchemas()
    {
        return $this->belongsToMany(SalarySchema::class, 'salary_schemas_partner')->withPivot(['value', 'h_m_value', 'salary_schema_id', 'comment']);
    }

    public function firstActivePhoneNumber()
    {
        $phone = $this->phones()->where('main', true)->first();

        return $phone->number ?? '';
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

    public function getShipmentsByPeriod(){

    }

    public function getSalary($date){

        $date = Carbon::parse($date);

        $summ = 0;
        $salary_data = [];

        foreach($this->salarySchemas as $setting){
            switch ($setting->template){
                case 'percent_from_shipments':
                    $pfs_summ = self::calculatePFS([
                        $date->format('Y-m-d') . ' 00:00:00',
                        $date->format('Y-m-d') . ' 23:59:59'
                    ]);

                    $pre_summ = $pfs_summ / 100 * $setting->pivot->value;

                    $summ += $pre_summ;
                    if(doubleval($pre_summ) !== 0.0){
                        $salary_data[] = [
                            'company_id' => $this->company_id,
                            'partner_id' => $this->id,
                            'date' => Carbon::now(),
                            'summ' => $pre_summ,
                            'comment' => 'awdawd'
                        ];
                    }
                    break;
                case 'percent':
                    $percent = $summ / 100 * $setting->pivot->value;

                    $pre_summ = $setting->isPositive ? $percent : -$percent;
                    $summ += $pre_summ;
                    if(doubleval($pre_summ) !== 0.0) {
                        $salary_data[] = [
                            'company_id' => $this->company_id,
                            'partner_id' => $this->id,
                            'date' => Carbon::now(),
                            'summ' => $pre_summ,
                            'comment' => 'awdawd'
                        ];
                    }
                    break;
                case 'oklad':
                case 'fixed':
                    $hours = self::calculateOkladHours($date->format('Y-m-d'), [
                        '00:00:00',
                        '23:59:59'
                    ]);
                    $summ_per_hour = $setting->pivot->value / $setting->pivot->h_m_value;

                    $pre_summ = $setting->isPositive ? $summ_per_hour * $hours : - $summ_per_hour * $hours;
                    $summ += $pre_summ;
                    if(doubleval($pre_summ) !== 0.0) {
                        $salary_data[] = [
                            'company_id' => $this->company_id,
                            'partner_id' => $this->id,
                            'date' => Carbon::now(),
                            'summ' => $pre_summ,
                            'comment' => 'awdawd'
                        ];
                    }
                    break;
            }
        }
        return [$summ, $salary_data];
    }

    private function calculatePFS($period){ //Percent From Shipment Процент с продаж
        return floatval($this->shipments()->whereBetween('created_at', $period)->sum('itogo'));
    }

    private function calculateOkladHours($date, $period)
    {
        $schedules =  $this->schedules()
            ->where('date', $date)
            ->where('dayType', 'work')
            ->where('start', '>=', $period[0])
            ->where('end', '<=', $period[1])
            ->get();

        $hours = 0;

        foreach($schedules as $schedule){
            $hours += Carbon::parse($schedule->start)->diff(Carbon::parse($schedule->end))->h;
        }

        return $hours;
    }

    public function deliveryAddresses()
    {
        return $this->hasMany(DeliveryAddress::class, 'partner_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'partner_id', 'id');
    }
}
