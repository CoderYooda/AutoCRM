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
use App\Models\Shipment;
use App\Models\User;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Illuminate\Support\Facades\Auth;

class StatisticController extends Controller
{
    public function index(Request $request)
    {
        // точка входа в страницу
        $page_title = 'Статистика';

        // цель динамической подгрузки
        $target = HC::selectTarget();

        $company = Auth::user()->company()->first();

        //Получение статистики компании
        $info = [];

        $company_begin_date = Carbon::now()->addDays(-7);
        $company_final_date = Carbon::now()->addDays(7);

        $warrants = Warrant::where('company_id', $company->id)->get();

        $info['company']['profit'] = $warrants
            ->where('isIncoming', 1)
            ->where('created_at', '>=', $company_begin_date)
            ->where('created_at', '<=', $company_final_date)
            ->sum('summ');

        $info['company']['expenses'] = $warrants
            ->where('isIncoming', 0)
            ->where('created_at', '>=', $company_begin_date)
            ->where('created_at', '<=', $company_final_date)
            ->sum('summ');

        //Получение статистики менеджера
        $manager_id = Auth::id();

        $manager_begin_date = Carbon::now()->addDays(-7);
        $manager_final_date = Carbon::now()->addDays(7);

        $info['manager']['profit'] = $warrants
            ->where('isIncoming', 1)
            ->where('manager_id', $manager_id)
            ->where('created_at', '>=', $manager_begin_date)
            ->where('created_at', '<=', $manager_final_date)
            ->sum('summ');

        $info['manager']['expenses'] = $warrants
            ->where('isIncoming', 0)
            ->where('manager_id', $manager_id)
            ->where('created_at', '>=', $manager_begin_date)
            ->where('created_at', '<=', $manager_final_date)
            ->sum('summ');

        $info['manager']['warrants'] = $warrants->where('manager_id', $manager_id);

        $dds_articles = DdsArticle::all();

        $models = [
            'Заявки поставщикам',
            'Поступления',
            'Продажи',
            'Возвраты',
            'Заказы клиентов',
        ];

        //Формирование шаблона
        $content = view(env('DEFAULT_THEME', 'classic') . '.statistic.index', compact('request', 'info', 'dds_articles', 'models'))
            ->with('managers', $company->members->load('partner'));

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
            Adjustment::class,
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
            'Корректировки',
            'Приходные ордеры',
            'Расходные ордеры',
            'Перемещения'
        ];

        $manager = null;
        $partner = null;

        $query = $sort_classes[$request->entity]::selectRaw('SUM(summ) as amount, created_at')
            ->where('company_id', Auth::user()->company()->first()->id)
            ->where('created_at', '>=', $request->begin_date)
            ->where('created_at', '<=', $request->final_date)
            ->groupBy('created_at');

        if($sort_classes[$request->entity] == Warrant::class) {
            //providerorder
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
