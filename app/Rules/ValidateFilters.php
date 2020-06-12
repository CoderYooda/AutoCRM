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
//        $entities = [
//            "partnerOrder",
//            "entrance",
//            "refund",
//            "shipment",
//            "clientOrder",
//            "inWarrant",
//            "outWarrant",
//            "cashMove",
//            "margin",
//            "debtPartnerOrder",
//            "underpaymentsClientOrder",
//            "underpaymentsShipment",
//            "cashboxBalance",
//            "grossProfit"
//        ];

        $entities = [
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордера',
            'Расходные ордера',
            'Перемещения',
            'Маржа',
            'Долги поставщикам',
            'Недоплаты по заказам клиентов',
            'Недоплаты по продажам',
            'Ежедневный остаток в кассах',
            'Валовая прибыль',
        ];

        $entity_name = explode('.', $attribute)[1];

        return in_array($entity_name, $entities);
    }

    public function message()
    {
        return 'Указан несуществующий фильтр.';
    }
}
