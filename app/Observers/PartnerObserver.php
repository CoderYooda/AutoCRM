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
