<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidateFilters implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $entities = [
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордера',
            'Расходные ордера',
            'Перемещения'
        ];

        return in_array($value, $entities);
    }

    public function message()
    {
        return 'Указан несуществующий фильтр.';
    }
}
