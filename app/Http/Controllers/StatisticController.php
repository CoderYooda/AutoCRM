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

class StatisticController extends Controller
{
    public function index(Request $request)
    {
        // цель динамической подгрузки
        $target = HC::selectTarget();

        //Формирование шаблона
        $content = view(get_template() . '.statistic.index', compact('request'));

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
            ['dialog' => 'clientorder', 'field' => 'clientorder_id'],
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

        $company = Auth::user()->company()->first();

        #Формарование дат
        for ($i = strtotime($request->begin_date); $i <= strtotime($request->final_date); $i += 86400) {
            $date = date('d.m.Y', $i);

            foreach ($sort_name as $sort) {
                $global_data[$date][$sort] = [];
            }
        }

        $partner = isset($request->partner_id) ? Partner::find($request->partner_id) : null;
        $manager = isset($request->manager_id) ? Partner::find($request->manager_id) : null;

        #Запрос по запрошенным разделам

        foreach ($classes as $key => $class) {

            if (!in_array($key, $request->entity)) continue;

            $query = $classes[$key]::latest()
                ->where('company_id', $company->id)
                ->where('created_at', '>=', DateTime::createFromFormat('d.m.Y', $request->begin_date))
                ->where('created_at', '<=', DateTime::createFromFormat('d.m.Y', $request->final_date));
                //->limit(10);

            if ($class != Entrance::class) {
                $query = $query->selectRaw('id, summ as amount, created_at, manager_id')->with('manager');
            } else {
                $query = $query->select('*')->with('manager', 'providerorder');
            }

            #Сортировка по входящим и исходящим ордерам
            if ($classes[$key] == Warrant::class) {
                $query = $query->where('isIncoming', $key == 5 ? 1 : 0);
            }

            if (isset($request->manager_id)) {
                $query = $query->where('manager_id', $request->manager_id);
            }

            if ($classes[$key] != MoneyMoves::class && isset($request->partner_id)) {
                $query = $query->where('partner_id', $request->partner_id);
            }

            $entities = $query->get();

            #Добавлене в Entrance свойства 'amount' из связи, т.к в модели его нет
            if ($class == Entrance::class) {
                foreach ($entities as $entity) {
                    $entity['amount'] = $entity->providerorder->summ;
                }
            }

            #Заполнение массива данными из базы
            foreach ($entities as $entity) {
                $date = $entity->created_at->format('d.m.Y');
                $global_data[$date][$sort_name[$key]][$entity->id]['amount'] = $entity->amount;
                $global_data[$date][$sort_name[$key]][$entity->id]['manager'] = $entity->manager->cut_surname;
                $global_data[$date][$sort_name[$key]][$entity->id]['dialog_name'] = $dialogs[$key]['dialog'];
                $global_data[$date][$sort_name[$key]][$entity->id]['dialog_field'] = $dialogs[$key]['field'];
            }
        }

        #Пересобираем массив для отображения в list.blade.php
        $list = [];

        foreach ($global_data as $date => $entities) {
            foreach ($entities as $entity_name => $entities) {

                if ($entities == []) continue;

                foreach ($entities as $entity_id => $attributes) {

                    if ($attributes == []) continue;

                    $list[$entity_name][$date][$entity_id]['amount'] = $attributes['amount'];
                    $list[$entity_name][$date][$entity_id]['manager'] = $attributes['manager'];
                    $list[$entity_name][$date][$entity_id]['dialog_name'] = $attributes['dialog_name'];
                    $list[$entity_name][$date][$entity_id]['dialog_field'] = $attributes['dialog_field'];
                }
            }
        }

//        dd($list);

        $response = [
            'dates' => $global_data,
            'desc' => view(get_template() . '.statistic.desc', compact('sort_name', 'partner', 'manager'))->render(),
            'list' => view(get_template() . '.statistic.list', compact('list'))->render(),
            'entities' => $list
        ];

        return response($response, 200);
    }
}
