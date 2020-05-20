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
            #Проверка на вывод одной сущности
            if($request->entity != -1 && $request->entity != $key) continue;

            $query = $classes[$key]::latest()
                ->where('company_id', $company->id)
                ->where('created_at', '>=', $request->begin_date)
                ->where('created_at', '<=', $request->final_date)
                ->groupBy(DB::raw('DAY(created_at)'))
                ->limit(10);

            if ($class != Entrance::class) {
                $query = $query->selectRaw('id, SUM(summ) as amount, created_at, manager_id')->with('manager');
            }
            else {
                $query = $query->with('providerorder');
            }

            #Сортировка по входящим и исходящим ордерам
            if ($classes[$key] == Warrant::class) {
                $query = $query->where('isIncoming', $key == 5 ? 1 : 0);
            }

            if (isset($request->manager_id)) {
                $query = $query->where('manager_id', $request->manager_id);
            }

            if (isset($request->partner_id)) {
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
                $global_data[$date][$sort_name[$key]]['id'] = $entity->id;
                $global_data[$date][$sort_name[$key]]['amount'] = $entity->amount;
                $global_data[$date][$sort_name[$key]]['manager'] = isset($entity->manager) ? $entity->manager->cut_surname : '-';
            }
        }

        #Пересобираем массив для отображения в list.blade.php
        $list = [];

        foreach ($global_data as $date => $entities) {
            foreach ($entities as $entity => $attributes) {
                if($attributes == []) continue;

                $list[$entity][$date]['id'] = $attributes['id'];
                $list[$entity][$date]['amount'] = $attributes['amount'];
                $list[$entity][$date]['manager'] = $attributes['manager'];
            }
        }


        $response = [
            'dates' => $global_data,
            'desc' => view(get_template() . '.statistic.desc', compact('sort_name', 'partner', 'manager'))->render(),
            'list' => view(get_template() . '.statistic.list', compact('sort_name', 'list'))->render()
        ];

        return response($response, 200);
    }
}
