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
            'Остаток в кассах',
            'Валовая прибыль',
            'ROI'
        ];

        return in_array($value, $entities);
    }

    public function message()
    {
        return 'Указан несуществующий фильтр.';
    }
}
