<?php

namespace App\Rules\Adjustments;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class EntranceHasValidCount implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $entrance_id = (int)explode('.', $attribute)[1];

        foreach ($value as $article_id => $count) {

            $count = (int)$count;

            $attributes = [
                'entrance_id' => $entrance_id,
                'article_id'  => $article_id,
            ];

            $articleEntrance = DB::table('article_entrance')->where($attributes)->first();

            if($count - $articleEntrance->count < 1) {
                return false;
            }
        }

        return true;
    }

    public function message()
    {
        return 'Минимальное значение 1.';
    }
}
