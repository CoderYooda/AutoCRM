<?php

namespace App\Observers;

use App\Models\Partner;
use App\Models\User;

class PartnerObserver
{
    public function creating(Partner $partner)
    {
        $partner->freshFoundString();
        $partner->freshSlug();
    }

    public function updating(Partner $partner)
    {
        $partner->freshFoundString();
        $partner->freshSlug();
    }

    public function saving(Partner $partner)
    {
        #Обновление имени учетной записи
        $user = $partner->user;

        if($user){
            $user->update(['name' => $partner->fio]);
        }


        $partner->freshFoundString();
        $partner->freshSlug();
    }
}
