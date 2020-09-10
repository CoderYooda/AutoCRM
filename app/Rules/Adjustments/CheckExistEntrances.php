<?php

namespace App\Rules\Adjustments;

use App\Models\Entrance;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckExistEntrances implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $entrance_id = (int)explode('.', $attribute)[1];

        if($entrance_id == 'new') return true;

        return DB::table('article_entrance')->where('id', $entrance_id)->exists();
    }

    public function message()
    {
        return 'Указаны несуществующие поступления.';
    }
}
