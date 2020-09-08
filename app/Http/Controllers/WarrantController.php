<?php

namespace App\Http\Controllers;

use App\Http\Requests\WarrantRequest;
use App\Models\Cashbox;
use App\Models\DdsArticle;
use App\Models\Refund;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Partner;
use App\Http\Controllers\UserActionsController as UA;
use stdClass;
use Auth;

class WarrantController extends Controller
{
    public static function warrantDialog($request)
    {
        $warrant = Warrant::find($request['warrant_id']);
        $tag = 'warrantDialog' . ($warrant->id ?? '');

        $data = new stdClass();

        if ($request['partner_id']) {
            $partner = Partner::find($request['partner_id']);
            if ($partner) {
                $data->partner_selected = $partner;
            }
        }

        if ($request['ostatok']) {
            $data->summ = $request['ostatok'];
        }
        if ($request['reason']) {
            $data->reason = $request['reason'];
        }

        if ($request['warrant_type'] && $request['warrant_type'] !== null) {

            $types = [
                'refund_of_goods'  => 6,
                'sale_of_goods'    => 2,
                'receipt_of_goods' => 4,
                'pay_to_provider'  => 5,
                'receipt_of_funds' => 9,
            ];

            $dds_type_id = $types[$request['warrant_type']];

            if ($dds_type_id !== null) {
                $data->dds_article = DdsArticle::find($dds_type_id);

//                dd($data);
            }
        }

        $data->cashbox = Auth::user()->company->cashboxes->first();

        return response()->json([
            'tag'  => $tag,
            'html' => view(get_template() . '.warrant.dialog.form_warrant', compact('warrant', 'data', 'request'))->render()
        ]);
    }

    public function getSideInfo(Request $request)
    {
        $warrant = Warrant::find($request['id']);
        $partner = $warrant->partner;
        $comment = $warrant->comment;

        return response()->json([
            'info'    => view(get_template() . '.warrant.contact-card', compact('partner', 'request', 'warrant'))->render(),
            'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render(),
        ], 200);
    }

    public function tableData(Request $request)
    {
        $warrants = self::getWarrants($request);

        return response()->json($warrants);
    }

    public function store(WarrantRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать возвраты' : 'Создавать возвраты');

        $request['company_id'] = Auth::user()->company->id;

        if ($request['do_date'] == null) {
            $request['do_date'] = Carbon::now();
        }

        $request['summ'] = (double)$request['summ'];

        $warrant = Warrant::firstOrNew(['id' => $request['id']]);

        $warrant->manager_id = Auth::user()->id;
        $message = "Ордер создан";
        $wasExisted = false;

        $cashbox = Cashbox::find($request['cashbox_id']);
        $partner = Partner::find($request['partner_id']);

        if ($request['isIncoming']) {
            $cashbox->addition($request['summ']);
            $partner->addition($request['summ']);
        } else {
            $cashbox->subtraction($request['summ']);
            $partner->subtraction($request['summ']);
        }

        $warrant->fill($request->only($warrant->fields));
        $warrant->balance = $cashbox->balance;
        $warrant->created_at = $request['do_date'];

        if ($request->refer != null) {
            $refer = 'App\Models\\' . $request->refer;
            $model = $refer::owned()->whereId($request['refer_id'])->first();

            if (isset($model) && $model != null) {
                $warrant->payable()->associate($model);
            }
        }

        $warrant->save();

        UA::makeUserAction($warrant, $wasExisted ? 'fresh' : 'create');

//        $method = $warrant->refer;
//        if($method !== null){
//            $warrant->$method()->syncWithoutDetaching($warrant->refer_id);
//        }

        return response()->json([
            'message' => $message,
            'event'   => 'WarrantStored',
        ], 200);
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять денежные операции');

        $returnIds = null;
        if ($id == 'array') {
            $warrants = Warrant::owned()->whereIn('id', $request['ids']);
            $this->message = 'Кассовые ордера удалены';
            $returnIds = $warrants->get()->pluck('id');
            foreach ($warrants->get() as $warrant) {

                $cashbox = $warrant->cashbox()->first();
                $partner = $warrant->partner()->first();

                $this->status = 200;
                if ($warrant->isIncoming) {
                    $cashbox->subtraction($warrant->summ);
                    $partner->addition($warrant->summ);
                } else {
                    $cashbox->addition($warrant->summ);
                    $partner->subtraction($warrant->summ);
                }
                $warrant->delete();
                UA::makeUserAction($warrant, 'delete');
                $this->status = 200;
            }
        } else {
            $warrant = Warrant::find($id);
            $cashbox = $warrant->cashbox;
            $partner = $warrant->partner;

            $returnIds = $warrant->id;
            $this->status = 200;
            if ($warrant->isIncoming) {
                $cashbox->subtraction($warrant->summ);
                $partner->addition($warrant->summ);
            } else {
                $cashbox->addition($warrant->summ);
                $partner->subtraction($warrant->summ);
            }

            $warrant->delete();
            UA::makeUserAction($warrant, 'delete');
            $this->status = 200;
            $this->message = 'Кассовый ордер удален';
        }

        return response()->json([
            'id'      => $returnIds,
            'message' => $this->message
        ], $this->status);
    }

    public static function selectDialog(Request $request)
    {
        $warrants = Warrant::owned()
            ->when($request->search, function (Builder $query) use($request) {
                $query->where('id', 'like', "%{$request->search}%");
            })
            ->where('isIncoming', $request->isIncoming)
            ->paginate(15);

        $tag = 'selectWarrantDialog';

        $isInner = $request->has('search') || $request->has('page');

        $viewName = get_template() . '.warrant.dialog.' . ($isInner ? 'select_warrant_inner' : 'select_warrant');

        $view = view($viewName, compact('warrants', 'request'))
            ->with('class', $tag);

        return response()->json([
            'html' => $view->render(),
            'tag'  => $tag
        ]);
    }

    public static function getWarrants(Request $request)
    {
        $size = $request['size'] ?? 30;
        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';

        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        return Warrant::select(DB::raw('
                warrants.created_at, warrants.created_at as date, warrants.id as id, IF(warrants.isIncoming = 1, "Приходный ордер","Расходный ордер") as type, IF(partners.type != 2, partners.fio,partners.companyName) as partner, dds_articles.name as dds, cashboxes.name as cashbox, warrants.summ
            '))
            ->leftJoin('partners', 'partners.id', '=', 'warrants.partner_id')
            ->leftJoin('dds_articles', 'dds_articles.id', '=', 'warrants.ddsarticle_id')
            ->leftJoin('cashboxes', 'cashboxes.id', '=', 'warrants.cashbox_id')
            ->where('warrants.company_id', Auth::user()->company->id)
            ->when($request['isIncoming'] != null, function ($query) use ($request) {
                $query->where('warrants.isIncoming', (int)$request['isIncoming']);
            })
            ->when($request['partner'] != null, function ($query) use ($request) {
                $query->whereIn('warrants.partner_id', $request['partner']);
            })
            ->when($request['any'] != null, function ($query) use ($request) {
                $query->whereIn('warrants.partner_id', $request['any']);
            })
            ->when($request['dates_range'] != null && $request['dates_range'] != 'null', function ($query) use ($request) {
                $query->whereBetween('warrants.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->groupBy('warrants.id')
            ->orderBy($field, $dir)
            ->paginate($size);
    }

    public static function getIncomeCount($request)
    {
        $income = Warrant::owned()
            ->where(function ($q) use ($request) {
                if (isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != null) {
                    $q->where('isIncoming', boolval($request['isIncoming']));
                }
            })
            ->where(function ($q) use ($request) {
                if (isset($request['date_start']) && $request['date_start'] != 'null') {
                    $q->where('do_date', '>=', Carbon::parse($request['date_start']));
                }
                if (isset($request['date_end']) && $request['date_end'] != 'null') {
                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
                }
            })->where('isIncoming', true)->sum('summ');
        return $income;
    }

    public static function getOutcomeCount($request)
    {
        $outcome = Warrant::owned()
            ->where(function ($q) use ($request) {
                if (isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != null) {
                    $q->where('isIncoming', boolval($request['isIncoming']));
                }
            })
            ->where(function ($q) use ($request) {
                if (isset($request['date_start']) && $request['date_start'] != 'null') {
                    $q->where('do_date', '>=', Carbon::parse($request['date_start']));
                }
                if (isset($request['date_end']) && $request['date_end'] != 'null') {
                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
                }
            })->where('isIncoming', false)->sum('summ');
        return $outcome;
    }

    public function search(Request $request)
    {
        $income = self::getIncomeCount($request);

        $outcome = self::getOutcomeCount($request);

        $content = view('cash.elements.warrant_list_container', compact('request'))->render();
        return response()->json([
            'html'    => $content,
            'target'  => 'ajax-table-warrant',
            'income'  => $income,
            'outcome' => $outcome,
        ], 200);
    }

    public function events(Request $request)
    {
        $warrants = Warrant::owned()
            ->where(function ($q) use ($request) {
                if (isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != '') {
                    $q->where('isIncoming', $request['isIncoming']);
                }
                if (isset($request['start']) && $request['start'] != 'null' && $request['start'] != '') {
                    $q->where('do_date', '>=', Carbon::parse($request['start']));
                }
                if (isset($request['end']) && $request['end'] != 'null' && $request['end'] != '') {
                    $q->where('do_date', '<=', Carbon::parse($request['end']));
                }
            })->get();
        $events = [];

        foreach ($warrants as $warrant) {
            $warrant->isIncoming ? $title = 'Приходный ордер' : $title = 'Расходный ордер';
            $warrant->isIncoming ? $color = '#22b66e' : $color = '#53a6fa';
            $events[] = [
                'title'         => $title . ' №' . $warrant->id,
                'start'         => $warrant->do_date,
                'end'           => $warrant->do_date,
                'color'         => $color,
                'extendedProps' => [
                    'modal' => 'warrantDialog',
                    'alias' => 'warrant_id',
                    'id'    => $warrant->id
                ]
            ];
        }

        return response($events);
    }

}
