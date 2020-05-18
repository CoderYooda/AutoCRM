<?php

namespace App\Http\Controllers;

use App\Http\Requests\WarrantRequest;
use App\Models\Cashbox;
use App\Models\DdsArticle;
use App\Models\Statistic;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Partner;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use stdClass;
use Auth;

class WarrantController extends Controller
{
    public static function warrantDialog($request)
    {
        $tag = 'warrantDialog';

        if($request['warrant_id']){
            $warrant = Warrant::where('id', (int)$request['warrant_id'])->first();
            $tag .= $warrant->id;
        } else {
            $warrant = null;
        }

        $data = new stdClass();

        if($request['partner_id']){
            $partner = Partner::owned()->where('id', $request['partner_id'])->first();
            if($partner){
                $data->partner_selected = $partner;
            }
        }

        if($request['ostatok']){
            $data->summ = $request['ostatok'];
        }
        if($request['reason']){
            $data->reason = $request['reason'];
        }

        if($request['warrant_type'] && $request['warrant_type'] !== null){
            $dds_type_id = null;

            switch ($request['warrant_type']){
                case 'refund_of_goods':
                    $dds_type_id = 6;
                    break;
                case 'sale_of_goods':
                    $dds_type_id = 2;
                    break;
                case 'receipt_of_goods':
                    $dds_type_id = 4;
                    break;
                case 'pay_to_provider':
                    $dds_type_id = 5;
                    break;
            }

            if($dds_type_id !== null){
                $data->dds_article = DdsArticle::owned()->where('id', $dds_type_id)->first();
            }
        }

        $cashbox = Auth::user()->company()->first()->cashboxes()->first();

        $data->cashbox = $cashbox;




        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.warrant.dialog.form_warrant', compact( 'warrant', 'data', 'request'))->render()
        ]);
    }

    public function getSideInfo(Request $request)
    {
        $warrant = Warrant::owned()->where('id', $request['id'])->first();
        $partner = $warrant->partner()->first();
        $comment = $warrant->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(env('DEFAULT_THEME', 'classic') . '.warrant.contact-card', compact( 'partner','request', 'warrant'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function tableData(Request $request)
    {
        $warrants = self::getWarrants($request);
        foreach($warrants as $warrant){
            $warrant->date = $warrant->created_at->format('Y.m.d/H:i');
        }
        return response()->json($warrants);
    }

    public function store(WarrantRequest $request)
    {
        dd($request['id']);
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать денежные операции' : 'Создавать денежные операции');

        $request['company_id'] = Auth::user()->company()->first()->id;

        if($request['do_date'] == null){
            $request['do_date'] = Carbon::now();
        }

        $request['summ'] = (double)$request['summ'];

        $warrant = Warrant::firstOrNew(['id' => $request['id']]);

        if($warrant->exists){
            $message = "Ордер обновлен";
            $wasExisted = true;
            //$correct_summ = doubleval($warrant->summ) - doubleval($request['summ']);

            if($warrant->isIncoming){
                $warrant->partner()->first()->subtraction($warrant->summ);
                $warrant->cashbox()->first()->subtraction($warrant->summ);
            } else{
                $warrant->partner()->first()->addition($warrant->summ);
                $warrant->cashbox()->first()->addition($warrant->summ);
            }
        }
        else {
            $warrant->manager_id = Auth::user()->id;
            $message = "Ордер создан";
            $wasExisted = false;
        }

        $cashbox = Cashbox::owned()->where('id', $request['cashbox_id'])->first();
        $partner = Partner::owned()->where('id', $request['partner_id'])->first();

        if($request['isIncoming']){
            $cashbox->addition($request['summ']);
            $partner->addition($request['summ']);
        } else{
            $cashbox->subtraction($request['summ']);
            $partner->subtraction($request['summ']);
        }

        $warrant->fill($request->only($warrant->fields));
        $warrant->balance = $cashbox->balance;
        $warrant->save();
        $warrant->created_at = $request['do_date'];
        $warrant->save();
        UA::makeUserAction($warrant, $wasExisted ? 'fresh' : 'create');

        $method = $warrant->refer;
        if($method !== null){
            $warrant->$method()->syncWithoutDetaching($warrant->refer_id);
        }

        if($request->expectsJson()){
            return response()->json([
                'message' => $message,
                'event' => 'WarrantStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять денежные операции');
        $returnIds = null;
        if($id == 'array'){
            $warrants = Warrant::owned()->whereIn('id', $request['ids']);
            $this->message = 'Кассовые ордера удалены';
            $returnIds = $warrants->get()->pluck('id');
            foreach($warrants->get() as $warrant){

                $cashbox = $warrant->cashbox()->first();
                $partner = $warrant->partner()->first();

                $this->status = 200;
                if($warrant->isIncoming){
                    $cashbox->subtraction($warrant->summ);
                    $partner->addition($warrant->summ);
                } else{
                    $cashbox->addition($warrant->summ);
                    $partner->subtraction($warrant->summ);
                }
                $warrant->delete();
                UA::makeUserAction($warrant, 'delete');
                $this->status = 200;
            }
        } else {
            $warrant = Warrant::owned()->where('id', $id)->first();
            $cashbox = $warrant->cashbox()->first();
            $partner = $warrant->partner()->first();

            $returnIds = $warrant->id;
            $this->status = 200;
            if($warrant->isIncoming){
                $cashbox->subtraction($warrant->summ);
                $partner->addition($warrant->summ);
            } else{
                $cashbox->addition($warrant->summ);
                $partner->subtraction($warrant->summ);
            }

            $warrant->delete();
            UA::makeUserAction($warrant, 'delete');
            $this->status = 200;
            $this->message = 'Кассовый ордер удален';
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], $this->status);
    }

    public static function getWarrants($request)
    {

        $size = 30;
        if(isset($request['size'])){
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if($field === null &&  $dir === null){
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        $warrants =
            Warrant::select(DB::raw('
                warrants.created_at, warrants.created_at as date, warrants.id as id, IF(warrants.isIncoming = 1, "Приходный ордер","Расходный ордер") as type, IF(partners.isfl = 1, partners.fio,partners.companyName) as partner, dds_articles.name as dds, cashboxes.name as cashbox, warrants.summ 
            '))
                ->leftJoin('partners',  'partners.id', '=', 'warrants.partner_id')
                ->leftJoin('dds_articles',  'dds_articles.id', '=', 'warrants.ddsarticle_id')
                ->leftJoin('cashboxes',  'cashboxes.id', '=', 'warrants.cashbox_id')
                ->where('warrants.company_id', Auth::user()->company()->first()->id)
                ->when($request['partner'] != null, function($query) use ($request) {
                    $query->whereIn('warrants.partner_id', $request['partner']);
                })
                ->when($request['any'] != null, function($query) use ($request) {
                    $query->whereIn('warrants.partner_id', $request['any']);
                })
                ->when($request['dates_range'] != null && $request['dates_range'] != 'null', function($query) use ($request) {
                    $query->whereBetween('warrants.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
                })
                ->groupBy('warrants.id')
                ->orderBy($field, $dir)
                ->paginate($size);

        return $warrants;
    }

    public static function getIncomeCount($request){
        $income =  Warrant::owned()
            ->where(function($q) use ($request){
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != null){
                    $q->where('isIncoming',   boolval ($request['isIncoming']));
                }
            })
            ->where(function($q) use ($request){
                if(isset($request['date_start']) && $request['date_start'] != 'null'){
                    $q->where('do_date',  '>=',  Carbon::parse($request['date_start']));
                }
                if(isset($request['date_end']) && $request['date_end'] != 'null'){
                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
                }
            })->where('isIncoming', true)->sum('summ');
        return $income;
    }

    public static function getOutcomeCount($request){
        $outcome = Warrant::owned()
            ->where(function($q) use ($request){
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != null){
                    $q->where('isIncoming',   boolval ($request['isIncoming']));
                }
            })
            ->where(function($q) use ($request){
                if(isset($request['date_start']) && $request['date_start'] != 'null'){
                    $q->where('do_date',  '>=',  Carbon::parse($request['date_start']));
                }
                if(isset($request['date_end']) && $request['date_end'] != 'null'){
                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
                }
            })->where('isIncoming', false)->sum('summ');
        return $outcome;
    }

    public function search(Request $request){
        $income =  self::getIncomeCount($request);

        $outcome = self::getOutcomeCount($request);

        $content = view('cash.elements.warrant_list_container', compact('request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-warrant',
            'income' => $income,
            'outcome' => $outcome,
        ], 200);
    }

    public function events(Request $request){
        $warrants = Warrant::owned()
            ->where(function($q) use ($request){
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != ''){
                    $q->where('isIncoming', $request['isIncoming']);
                }
                if(isset($request['start']) && $request['start'] != 'null' && $request['start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['start']));
                }
                if(isset($request['end']) && $request['end'] != 'null' && $request['end'] != ''){
                    $q->where('do_date', '<=', Carbon::parse($request['end']));
                }
            })->get();
        $events = [];

        foreach($warrants as $warrant){
            $warrant->isIncoming ? $title = 'Приходный ордер' : $title = 'Расходный ордер';
            $warrant->isIncoming ? $color = '#22b66e' : $color = '#53a6fa';
            $events[] = [
                'title' => $title . ' №' . $warrant->id,
                'start' => $warrant->do_date,
                'end' => $warrant->do_date,
                'color' => $color,
                'extendedProps' => [
                    'modal' => 'warrantDialog',
                    'alias' => 'warrant_id',
                    'id' => $warrant->id
                ]
            ];
        }

        return response($events);
    }

}
