<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatisticRequest;
use App\Models\Car;
use App\Models\ClientOrder;
use App\Models\DdsArticle;
use App\Models\Entrance;
use App\Models\Partner;
use App\Models\ProviderOrder;
use App\Models\Refund;
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
            ClientOrder::class
        ];

        $partner = Partner::find($request->manager_id);

        $entities = $sort_classes[$request->entity]::selectRaw('SUM(summ) as amount, created_at')
            ->where('company_id', $partner->company_id)
            ->where('created_at', '>=', $request->begin_date)
            ->where('created_at', '<=', $request->final_date)
            ->groupBy('created_at')
            ->get();

        $updated_entities = [];

        foreach ($entities as $entity) {
            $format_date = $entity->created_at->format('d.m.Y');
            $updated_entities[$format_date] = $entity->amount;
        }

        return response($updated_entities, 200);
    }
}
