<?php

namespace App\Observers;

use App\Models\Partner;
use App\Models\User;

class PartnerObserver
{
    public function created(Partner $partner)
    {

    }

    //public function updated(Partner $partner){}


    public function saving(Partner $partner)
    {
        #Обновление имени учетной записи
        $user = $partner->user;
        if($user){
            $name = explode( ' ', $partner->fio );
            if(count($name) >= 2){
                $name = $name[1];
            } else {
                $name = $partner->fio;
            }

            $user->name = $name;
            $user->save();
        }

        $partner->foundstring = strtolower(str_replace(array('(', ')', ' ', '-', '+'), '', $partner->fio . $partner->companyName . $partner->basePhone));

    }

    public function updated(Partner $partner){
        #Генерация поисковой строки
//        $phones = $partner->phones()->pluck('number');
//        $phones_str = '';
//        foreach($phones as $phone){
//            $phones_str .= substr($phone, -4);
//        }

    }

    public function deleted(Partner $partner)
    {

    }

    public function restored(Partner $partner)
    {

    }

    public function forceDeleted(Partner $partner)
    {

    }
}
