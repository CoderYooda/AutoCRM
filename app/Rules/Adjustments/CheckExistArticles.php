<?php

namespace App\Rules\Adjustments;

use App\Models\Product;
use Illuminate\Contracts\Validation\Rule;

class CheckExistArticles implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $articleIds = array_keys($value);

        return Product::owned()->whereIn('id', $articleIds)->exists();
    }

    public function message()
    {
        return 'Указаны несуществующие продукты.';
    }
}
