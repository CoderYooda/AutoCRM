<?php

namespace App\Rules;

use App\Interfaces\Shop\CartInterface;
use Illuminate\Contracts\Validation\Rule;

class CartHasProduct implements Rule
{
    public function passes($attribute, $value)
    {
        /** @var CartInterface $cart */
        $cart = app(CartInterface::class);

        return $cart->isProductExists($value);
    }

    public function message()
    {
        return 'В коризне нет данного товара.';
    }
}
