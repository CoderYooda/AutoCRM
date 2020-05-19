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
        // точка входа в страницу
        $page_title = 'Статистика';

        // цель динамической подгрузки
        $target = HC::selectTarget();

        $company = Auth::user()->company()->first();

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

        $statistic = [];

        $date = Carbon::now();

        $day = Setting::where('company_id', 2)->where('key', 'day_id')->first()->value;

        $date_from = Carbon::create($date->year, $date->month, $day);
        $date_to = Carbon::create($date->year, $date->addMonth()->month, $day);

        foreach ($classes as $key => $class) {

            $query = $classes[$key]::where('company_id', $company->id)
                ->where('created_at', '>=', $date_from)
                ->where('created_at', '<=', $date_to)
                ->groupBy('created_at');

            if($class == Entrance::class) {
                $query = $query->with('providerorder');
            }
            else {
                $query = $query->selectRaw('SUM(summ) as amount, created_at');
            }

            $entities = $query->get();

            if($class == Entrance::class) {
                foreach ($entities as $entity) {
                    $entity['amount'] = $entity->providerorder->summ;
                }
            }

            $statistic[$sort_name[$key]] = $entities;
        }

        $desc = 'Полная статистика с ' . $date_from->format('d.m.Y') . ' по ' . $date_to->format('d.m.Y');

        $updated_statistic = [];

        $dates = [];

        foreach ($statistic as $statistic_name => $entities) {
            foreach ($entities as $key => $entity) {
                $date = $entity['created_at']->format('d.m.Y');
                $dates[$date][$statistic_name] = [];
            }
        }

        dd($dates);

        foreach ($dates as $date => $array) {
            dd($date);
        }

        foreach ($statistic as $statistic_name => $entities) {
            foreach ($entities as $key => $entity) {
                $date = $entity['created_at']->format('d.m.Y');

                $updated_statistic[$statistic_name][$date] = $entity['amount'];

                $dates[] = $date;
            }
        }

        //Формирование шаблона
        $content = view(env('DEFAULT_THEME', 'classic') . '.statistic.index', compact('request', 'updated_statistic', 'desc'))
            ->with('managers', $company->members->load('partner'))
            ->with('dates', $dates);

        if(class_basename($content) == "JsonResponse"){
            return $content;
        }

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

    public function show(StatisticRequest $request)
    {
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
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордеры',
            'Расходные ордеры',
            'Перемещения'
        ];

        $manager = null;
        $partner = null;

        $query = $sort_classes[$request->entity]::where('company_id', Auth::user()->company()->first()->id)
            ->where('created_at', '>=', $request->begin_date)
            ->where('created_at', '<=', $request->final_date)
            ->groupBy('created_at');

        if($sort_classes[$request->entity] == Entrance::class) {
            $query = $query->with('providerorder');
        }
        else {
            $query = $query->selectRaw('SUM(summ) as amount, created_at');
        }

        if($sort_classes[$request->entity] == Warrant::class) {
            $query = $query->where('isIncoming', $request->entity == 6 ? 1 : 0);
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

        $updated_entities = [];

        if(count($entities)) {
            foreach ($entities as $entity) {
                $format_date = $entity->created_at->format('d.m.Y');
                $updated_entities[$format_date] = $entity->amount;
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
        else {
            $desc = 'Статистика по ' . $sort_name[$request->entity];
        }

        $data = [
            'entities' => $updated_entities,
            'desc' => $desc
        ];

        return response($data, 200);
    }
}
