<?php

namespace App\Traits;

use App\Models\Phone;
use Illuminate\Database\Eloquent\Builder;

trait Phoneable
{
    public function phones()
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }

    public function phone()
    {
        return $this->morphOne(Phone::class, 'phoneable')->where('main', 1);
    }

    public function upsertPhones(array $phones, $main = null)
    {
        $return_phones = collect();

        $this->phones()->delete();

        if($phones && count($phones) > 0){
            foreach($phones as $key => $r_phone){

                $number = clear_phone_number($r_phone['number']);

                $phone = $this->phones()->create([
                    'number' => $number,
                    'main' => $r_phone['main'] ?? $key == $main
                ]);

                $return_phones->add($phone);
            }
        }

        return $return_phones;
    }
}
