<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatisticRequest;
use App\Models\Adjustment;
use App\Models\Car;
use App\Models\ClientOrder;
use App\Models\DdsArticle;
use App\Models\Entrance;
use App\Models\MoneyMoves;
use App\Models\Partner;
use App\Models\ProviderOrder;
use App\Models\Refund;
use App\Models\Setting;
use App\Models\Shipment;
use App\Models\User;
use App\Models\Warrant;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Webmozart\Assert\Assert;

class StatisticController extends Controller
{
    const REFUND = 2;
    const INCOMING_WARRANT = 5;

    public function boot()
    {

    }

    public function index(StatisticRequest $request)
    {
        PermissionController::canByPregMatch('Смотреть статистику');

        // цель динамической подгрузки
        $target = HC::selectTarget();

        $sorts = [
            ['name' => 'Заявки поставщикам', 'field_name' => 'partnerOrder', 'color' => '#00A78E', 'per' => 'месяц'],
            ['name' => 'Поступления', 'field_name' => 'entrance', 'color' => '#2C9F45', 'per' => 'месяц'],
            ['name' => 'Возвраты', 'field_name' => 'refund', 'color' => '#FF4F81', 'per' => 'месяц'],
            ['name' => 'Продажи', 'field_name' => 'shipment', 'color' => '#FBB034', 'per' => 'месяц'],
            ['name' => 'Заказы клиентов', 'field_name' => 'clientOrder', 'color' => '#B84592', 'per' => 'месяц'],
            ['name' => 'Приходные ордера', 'field_name' => 'inWarrant', 'color' => '#01CD74  ', 'per' => 'месяц'],
            ['name' => 'Расходные ордера', 'field_name' => 'outWarrant', 'color' => '#EA80ED', 'per' => 'месяц'],
            ['name' => 'Перемещения', 'field_name' => 'cashMove', 'color' => '#89BA16', 'per' => 'месяц'],

            ['name' => 'Маржа', 'field_name' => 'margin', 'color' => '#44C7F4', 'per' => 'месяц'],
            ['name' => 'Долги поставщикам', 'field_name' => 'debtPartnerOrder', 'color' => '#FE5000', 'per' => 'месяц'],
            ['name' => 'Недоплаты по заказам клиентов', 'field_name' => 'underpaymentsClientOrder', 'color' => '#5CA4E8', 'per' => 'месяц'],
            ['name' => 'Недоплаты по продажам', 'field_name' => 'underpaymentsShipment', 'color' => '#FFD541', 'per' => 'месяц'],
            ['name' => 'Остаток в кассах', 'field_name' => 'cashboxBalance', 'color' => '#1AAFD0', 'per' => 'сутки'],
            ['name' => 'Валовая прибыль', 'field_name' => 'grossProfit', 'color' => '#7E7BE9', 'per' => 'месяц'],
            ['name' => 'ROI', 'field_name' => 'roi', 'color' => '#22B66E', 'per' => 'сутки']
        ];

        $graph_data = $this->getGraphData($request);

        //Формирование шаблона
        $content = view(get_template() . '.statistic.index', compact('request', 'sorts'))
            ->with('list', $graph_data['list'])
            ->with('global_data', $graph_data['global_data'])
            ->with('current_date', Carbon::now()->format('d.m.Y'));

        if (class_basename($content) == "JsonResponse") {
            return $content;
        }

        if ($request['view_as'] != 'json') return $content;

        return response()->json([
            'target' => $target,
            'page' => 'Статистика',
            'html' => $content->render()
        ]);
    }

    public function show(StatisticRequest $request)
    {
        PermissionController::canByPregMatch('Смотреть статистику');

        $graph_data = $this->getGraphData($request);

        $list = $graph_data['list'];
        $global_data = $graph_data['global_data'];

        $content = view(get_template() . '.statistic.show', compact('request'))
            ->with('dates', $graph_data['global_data'])
            ->with('list', view(get_template() . '.statistic.includes.list', compact('list', 'request'))->render())
            ->with('entities', $list)
            ->with('filter_params', [
                'manager' => Partner::find($request->manager_id),
                'partner' => Partner::find($request->partner_id),
                'ddsarticle' => DdsArticle::find($request->dds_id),
            ]);

        if($request->expectsJson()) {
            return response()->json([
                'target' => 'ajax-content',
                'page' => 'Результаты статистики',
                'html' => $content->render(),
                'dates' => $global_data,
                'list_html' => view(get_template() . '.statistic.includes.list', compact('list', 'request'))->render(),
                'filter_params' => [
                    'manager' => Partner::find($request->manager_id),
                    'partner' => Partner::find($request->partner_id),
                    'ddsarticle' => DdsArticle::find($request->dds_id),
                ]
            ]);
        }

        return $content;
    }

    public function getGraphData(Request $request)
    {
        #Названия сортировок
        $sort_name = [
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордера',
            'Расходные ордера',
            'Перемещения'
        ];

        $dialogs = [
            ['dialog' => 'providerorder', 'field' => 'provider_order_id'],
            ['dialog' => 'entrance', 'field' => 'entrance_id'],
            ['dialog' => 'refund', 'field' => 'refund_id'],
            ['dialog' => 'shipment', 'field' => 'shipment_id'],
            ['dialog' => 'clientorder', 'field' => 'client_order_id'],
            ['dialog' => 'warrant', 'field' => 'warrant_id'],
            ['dialog' => 'warrant', 'field' => 'warrant_id'],
            ['dialog' => 'moneymove', 'field' => 'moneymove_id']
        ];

        $classes = [
            ProviderOrder::class,
            Entrance::class,
            Refund::class,
            Shipment::class,
            ClientOrder::class,
            Warrant::class, //Приходные
            Warrant::class, //Расходные
            MoneyMoves::class
        ];

        $global_data = [];

        $queries = [];

        $company = Auth::user()->company()->first();

        #Формарование дат
        for ($i = strtotime($request->begin_date); $i <= strtotime($request->final_date); $i += 86400) {
            $date = date('d.m.Y', $i);

            foreach ($sort_name as $sort) {
                $global_data[$date][$sort] = [];

                $global_data[$date]['providerorder_total'] = 0;
                $global_data[$date]['providerorder_payed'] = 0;
                $global_data[$date]['providerorder_debt'] = 0;

                $global_data[$date]['shipment_total'] = 0;
                $global_data[$date]['shipment_payed'] = 0;
                $global_data[$date]['shipment_debt'] = 0;

                $global_data[$date]['clientorder_total'] = 0;
                $global_data[$date]['clientorder_payed'] = 0;
                $global_data[$date]['clientorder_debt'] = 0;

                $global_data[$date]['refund_total'] = 0;
                $global_data[$date]['refund_payed'] = 0;

                $global_data[$date]['expenses_total'] = 0;
                $global_data[$date]['profit_total'] = 0;
            }
        }

        #Запросы по запрошенным разделам

        foreach ($classes as $key => $class) {

//            if (!in_array($sort_name[$key], $request->entities)) continue;

            $query = $classes[$key]::latest()
                ->where('company_id', $company->id)
                ->where('created_at', '>=', DateTime::createFromFormat('d.m.Y', $request->begin_date))
                ->where('created_at', '<=', DateTime::createFromFormat('d.m.Y', $request->final_date));

            $class_fields = (new $classes[$key])->fields;

            if (isset($request->dds_id) && in_array('ddsarticle_id', $class_fields)) {
                $query = $query->where('ddsarticle_id', $request->dds_id);
            }

            if ($class != Entrance::class) {
                $query = $query->selectRaw('*, summ as amount')->with('manager');
            } else {
                $query = $query->select('*')->with('manager', 'providerorder');
            }

            if ($classes[$key] == Shipment::class) {
                $query = $query->with('warrants');
            }

            #Сортировка по входящим и исходящим ордерам
            if ($classes[$key] == Warrant::class) {
                $query = $query->where('isIncoming', $key == self::INCOMING_WARRANT ? 1 : 0);
            }

            if (isset($request->manager_id)) {
                $query = $query->where('manager_id', $request->manager_id);
            }

            if (isset($request->partner_id) && in_array('partner_id', $class_fields)) {
                $query = $query->where('partner_id', $request->partner_id);
            }

            $queries[$key] = $query->get();

            $entities = $queries[$key];

            #Добавлене в Entrance свойства 'amount' из связи, т.к в модели его нет
            if ($class == Entrance::class) {
                foreach ($entities as $entity) {
                    $entity['amount'] = $entity->providerorder->summ ?? 0;
                }
            }

            #Заполнение массива данными из базы
            foreach ($entities as $entity) {

                $date = $entity->created_at->format('d.m.Y');
                $global_data[$date][$sort_name[$key]][$entity->id]['amount'] = $entity->amount;
                $global_data[$date][$sort_name[$key]][$entity->id]['manager'] = $entity->manager->cut_surname;
                $global_data[$date][$sort_name[$key]][$entity->id]['dialog_name'] = $dialogs[$key]['dialog'];
                $global_data[$date][$sort_name[$key]][$entity->id]['dialog_field'] = $dialogs[$key]['field'];

                if (get_class($entity) == Refund::class) {
                    $refund_payed = $entity->getPaidAmount();

                    $global_data[$date]['refund_total'] += $entity->amount;
                    $global_data[$date]['refund_payed'] += $refund_payed;
                }

                if (get_class($entity) == ClientOrder::class) {
                    $clientorder_payed = $entity->getPaidAmount();

                    $global_data[$date]['clientorder_total'] += $entity->amount;
                    $global_data[$date]['clientorder_payed'] += $clientorder_payed;
                    $global_data[$date]['clientorder_debt'] += ($entity->amount - $clientorder_payed);
                }

                if (get_class($entity) == ProviderOrder::class) {
                    $providerorder_payed = $entity->getPaidAmount();

                    $global_data[$date]['providerorder_total'] += $entity->amount;
                    $global_data[$date]['providerorder_payed'] += $providerorder_payed;
                    $global_data[$date]['providerorder_debt'] += ($entity->amount - $providerorder_payed);
                }

                if (get_class($entity) == Shipment::class) {
                    $shipment_payed = $entity->getPaidAmount();

                    $global_data[$date]['shipment_total'] += $entity->amount;
                    $global_data[$date]['shipment_payed'] += $shipment_payed;
                    $global_data[$date]['shipment_debt'] += ($entity->amount - $shipment_payed);
                }

                if (get_class($entity) == Warrant::class) {
                    $global_data[$date][$entity->isIncoming ? 'profit_total' : 'expenses_total'] += $entity->amount;
                }
            }
        }

        $cashbox_history = DB::table('cashbox_history')->where('company_id', Auth::user()->company_id)->get();

        foreach ($cashbox_history as $cashbox) {
            $global_data[$cashbox->date]['Ежедневный остаток в кассах'] = $cashbox->balance;
        }

        #Пересобираем массив для отображения в list.blade.php
        $list = [];

        foreach ($global_data as $date => $entities) {

            #Ежедневный остаток в кассах
            if(!isset($global_data[$date]['Ежедневный остаток в кассах'])) $global_data[$date]['Ежедневный остаток в кассах'] = 0;
            if($global_data[$date]['Ежедневный остаток в кассах']) $list['Ежедневный остаток в кассах'][$date] = $global_data[$date]['Ежедневный остаток в кассах'];

            #Маржа = Приходные минус расходные ордера
            $global_data[$date]['Маржа'] = $global_data[$date]['profit_total'] - $global_data[$date]['expenses_total'];
            if($global_data[$date]['Маржа'] != 0) $list['Маржа'][$date] = $global_data[$date]['Маржа'];

            #Валовая прибыль = Продажи + заказы клиентов - возвраты
            $global_data[$date]['Валовая прибыль'] = $global_data[$date]['profit_total']; // - $global_data[$date]['refund_total'];
            if($global_data[$date]['Валовая прибыль'] != 0) $list['Валовая прибыль'][$date] = $global_data[$date]['Валовая прибыль'];

            #Долги поставщикам = Неоплаченные заявки поставщикам
            $global_data[$date]['Долги поставщикам'] = $global_data[$date]['providerorder_debt'];
            if($global_data[$date]['Долги поставщикам'] != 0) $list['Долги поставщикам'][$date] = $global_data[$date]['Долги поставщикам'];

            #Долги по заказам клиентов = неоплаченные заказы клиентов
            $global_data[$date]['Недоплаты по заказам клиентов'] = -$global_data[$date]['clientorder_debt'];
            if($global_data[$date]['Недоплаты по заказам клиентов'] != 0) $list['Недоплаты по заказам клиентов'][$date] = $global_data[$date]['Недоплаты по заказам клиентов'];

            #Долги по продажам = неоплаченные продажи клиентов
            $global_data[$date]['Недоплаты по продажам'] = -$global_data[$date]['shipment_debt'];
            if($global_data[$date]['Недоплаты по продажам'] != 0) $list['Недоплаты по продажам'][$date] = $global_data[$date]['Недоплаты по продажам'];

            #ROI = Маржа / 100 * общий расход
            $global_data[$date]['ROI'] = $global_data[$date]['expenses_total'] ? ($global_data[$date]['Маржа'] * 100) / $global_data[$date]['expenses_total'] : 0;
            if($global_data[$date]['ROI'] != 0) $list['ROI'][$date] = $global_data[$date]['ROI'];

            #Формирование list.blade.php

            foreach ($entities as $entity_name => $entity_ids) {

                if ($entity_ids == [] || !in_array($entity_name, $sort_name)) continue;

//                if (in_array($entity_name, $request->entities)) continue;

                foreach ($entity_ids as $entity_id => $attributes) {

                    $list[$entity_name][$date][$entity_id]['amount'] = $attributes['amount'];
                    $list[$entity_name][$date][$entity_id]['manager'] = $attributes['manager'];
                    $list[$entity_name][$date][$entity_id]['dialog_name'] = $attributes['dialog_name'];
                    $list[$entity_name][$date][$entity_id]['dialog_field'] = $attributes['dialog_field'];

                    if(!isset($list[$entity_name]['total'])) $list[$entity_name]['total'] = 0;
                    $list[$entity_name]['total'] += $attributes['amount'];
                }
            }
        }

        return [
            'global_data' => $global_data,
            'list' => $list
        ];
    }
}
