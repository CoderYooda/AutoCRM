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

        if(class_basename($content) == "JsonResponse"){
            return $content;
        }

        if($request['view_as'] != 'json') return $content;

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
            'Приходные ордеры',
            'Расходные ордеры',
            'Перемещения'
        ];

        $global_data = [];

        $company = Auth::user()->company()->first();

        #Формарование дат
        for($i = strtotime($request->begin_date); $i <= strtotime($request->final_date); $i += 86400) {
            $date = date('d.m.Y', $i);

            foreach ($sort_name as $sort) {
                $global_data[$date][$sort] = 0;
            }
        }

        #Отображение всех сущностей сразу
        if($request->entity == -1) {

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

            $current_date = Carbon::now();

            $day = Setting::where('company_id', 2)->where('key', 'day_id')->first()->value;

            $date_from = Carbon::create($current_date->year, $current_date->month, $day);
            $date_to = Carbon::create($current_date->year, $current_date->addMonth()->month, $day);

            foreach ($classes as $key => $class) {
                $query = $classes[$key]::where('company_id', $company->id)
                    ->where('created_at', '>=', $date_from)
                    ->where('created_at', '<=', $date_to)
                    ->groupBy(DB::raw('DAY(created_at)'));

                if ($class != Entrance::class) {
                    $query = $query->selectRaw('SUM(summ) as amount, created_at');
                } else {
                    $query = $query->with('providerorder');
                }

                $entities = $query->get();

                if ($class == Entrance::class) {
                    foreach ($entities as $entity) {
                        $entity['amount'] = $entity->providerorder->summ;
                    }
                }

                foreach ($entities as $entity) {
                    $date = $entity->created_at->format('d.m.Y');
                    $global_data[$date][$sort_name[$key]] = $entity->amount;
                }
            }
        }
        #Отображение одной сущности
        else {
            $sort_classes = [
                ProviderOrder::class,
                Entrance::class,
                Refund::class,
                Shipment::class,
                ClientOrder::class,
                Warrant::class, //Приходные
                Warrant::class, //Расходные
                MoneyMoves::class
            ];

            $sort_name = [
                'заявкам поставщиков',
                'поступлениям',
                'возвратам',
                'продажам',
                'заказам клиентов',
                'приходным ордерам',
                'расходным ордерам',
                'перемещениям'
            ];

            $manager = null;
            $partner = null;

            $query = $sort_classes[$request->entity]::where('company_id', $company->id)
                ->where('created_at', '>=', $request->begin_date)
                ->where('created_at', '<=', $request->final_date)
                ->groupBy(DB::raw('DAY(created_at)'));

            if($sort_classes[$request->entity] == Entrance::class) {
                $query = $query->with('providerorder');
            }
            else {
                $query = $query->selectRaw('SUM(summ) as amount, created_at');
            }

            if($sort_classes[$request->entity] == Warrant::class) {
                $query = $query->where('isIncoming', $request->entity == 5 ? 1 : 0);
            }

            if(isset($request->manager_id)) {
                $manager = Partner::find($request->manager_id);
                $query = $query->where('manager_id', $request->manager_id);
            }

            if(isset($request->partner_id)) {
                $partner = Partner::find($request->partner_id);
                $query = $query->where('partner_id', $request->partner_id);
            }

            $entities = $query->get();

            if($sort_classes[$request->entity] == Entrance::class) {
                foreach ($entities as $entity) {
                    $entity->amount = $entity->providerorder->summ;
                }
            }

            for($i = strtotime($request->begin_date); $i <= strtotime($request->final_date); $i += 86400) {
                $date = date('d.m.Y', $i);
                $global_data[$date] = 0;
            }

            if(count($entities)) {
                foreach ($entities as $entity) {
                    $format_date = $entity->created_at->format('d.m.Y');
                    $global_data[$format_date] = $entity->amount;
                }
            }
        }

        $desc = null;

        if(isset($manager) && isset($partner)) {
            $desc = 'Статистика менеджера ' . $manager->fio . ' по отношению к партнёру ' . $partner->fio;
        }
        else if(isset($manager)) {
            $desc = 'Статистика по менеджеру ' . $manager->fio;
        }
        else if(isset($partner)) {
            $desc = 'Статистика по партнёру ' . $partner->fio;
        }
        else if($request->entity != -1){
            $desc = 'Статистика по ' . $sort_name[$request->entity];
        }
        else {
            $desc = 'Общая статистика';
        }

        $response = [
            'dates' => $global_data,
            'desc' => view(get_template() . '.statistic.desc', compact('desc', 'sort_name'))->render(),
            'list' => view(get_template() . '.statistic.list', compact('global_data', 'sort_name'))->render()
        ];

        return response($response, 200);
    }
}
