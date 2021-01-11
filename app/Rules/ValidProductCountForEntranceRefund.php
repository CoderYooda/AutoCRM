<?php

namespace App\Rules;

use App\Models\Entrance;
use Illuminate\Contracts\Validation\Rule;

class ValidProductCountForEntranceRefund implements Rule
{
    public function passes($attribute, $value)
    {
        $product_id = (int)explode('.', $attribute)[1];

        $entrance = Entrance::find($product_id);

        $entrance_products = $entrance->products;

        foreach ($this->products as $product_id => $product) {
            return $product['count'] > $entrance_products->where('product_id', $product_id)->count();
        }
    }

    public function message()
    {
        return 'Количество не может быть больше, чем в поступление.';
    }
}
