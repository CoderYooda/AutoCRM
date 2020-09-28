<?php

namespace App\Traits;

use App\Models\Phone;
use Illuminate\Http\Request;

trait Phoneable
{
    public function phones()
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }

    public function upsertPhones(array $phones, $main = null)
    {
        $return_phones = collect();

        $this->phones()->delete();

        if($phones && count($phones) > 0){
            foreach($phones as $key => $r_phone){

                $number = str_replace(['(', ')', ' ', '-'], '', $r_phone['number']);

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
