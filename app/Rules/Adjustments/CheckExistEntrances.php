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

        return DB::table('article_entrance')->where([
            'company_id' => Auth::user()->company_id,
            'entrance_id' => $entrance_id
        ])->exists();
    }

    public function message()
    {
        return 'Указаны несуществующие поступления.';
    }
}
