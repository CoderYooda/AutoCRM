<?php

namespace App\Rules;

use App\Models\Article;
use App\Models\Entrance;
use Illuminate\Contracts\Validation\Rule;

class CheckArticlesOnValid implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $product_id = explode('.', $attribute)[1];

        $entrance = Entrance::find(request('entrance_id'));

        if(!Article::where('id', $product_id)->exists()) return false;

        return (int)$value <= $entrance->articles->find($product_id)->pivot->count;
    }

    public function message()
    {
        return 'Суммарная сумма не может быть больше, чем в поступление.';
    }
}
