<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Partner;
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

        $cashbox = Auth::user()->company()->first()->cashboxes()->first();

        $data->cashbox = $cashbox;


        return response()->json([
            'tag' => $tag,
            'html' => view('cash.dialog.form_warrant', compact( 'warrant', 'data', 'request'))->render()
        ]);
    }

    public function store(Request $request)
    {
        $request['company_id'] = Auth::user()->company()->first()->id;
        if($request['do_date'] == null){
            $request['do_date'] = Carbon::now();
        }

        $validation = Validator::make($request->all(), self::validateRules($request));
        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }



        $warrant = Warrant::firstOrNew(['id' => $request['id']]);

        if($warrant->exists){
            $message = "Ордер обновлен";
            //$correct_summ = doubleval($warrant->summ) - doubleval($request['summ']);

            if($warrant->isIncoming){
                $warrant->partner()->first()->addition($warrant->summ);
                $warrant->cashbox()->first()->subtraction($warrant->summ);
            } else{
                $warrant->partner()->first()->subtraction($warrant->summ);
                $warrant->cashbox()->first()->addition($warrant->summ);
            }
        } else{
            $message = "Ордер создан";
        }

        $cashbox = Cashbox::owned()->where('id', $request['cashbox_id'])->first();
        $partner = Partner::owned()->where('id', $request['partner_id'])->first();

        if($request['isIncoming']){
            $cashbox = $cashbox->addition($request['summ']);
            $partner = $partner->subtraction($request['summ']);
        } else{
            $cashbox = $cashbox->subtraction($request['summ']);
            $partner = $partner->addition($request['summ']);
        }

        $warrant->fill($request->only($warrant->fields));
        $warrant->balance = $cashbox->balance;
        $warrant->save();
        $warrant->created_at = $request['do_date'];
        $warrant->save();


        if($request->expectsJson()){
            return response()->json([
                'message' => $message,
                'event' => 'WarrantStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    private static function validateRules($request)
    {
        $rules = null;
        $rules = [
            'partner_id' => ['required','exists:partners,id'],
            'cashbox_id' => ['required','exists:cashboxes,id'],
            'ddsarticle_id' => ['required','exists:dds_articles,id'],
            'summ' => ['required', 'integer', 'min:0', 'max:1000000'],
            'isIncoming' => ['boolean'],
        ];
        return $rules;
    }

    public static function getWarrants($request)
    {
        $warrants = Warrant::owned()
            ->orderBy('created_at', 'DESC')
            ->where(function($q) use ($request){
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null'){
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
            })
            ->where(function($q) use ($request){
                if(isset($request['search']) && $request['search'] !== 'null') {
                    if (mb_strlen($request['search']) === 1) {
                        $q->whereHas('partner', function ($q) use ($request) {
                            $q->where('fio', 'LIKE', $request['search'] . '%' )
                                ->orWhere('companyName', 'LIKE', $request['search'] . '%');
                        });
                    } else {
                        $q->whereHas('partner', function ($q) use ($request) {
                            $q->where('fio', 'LIKE', '%' . $request['search'] . '%')
                                ->orWhere('companyName', 'LIKE', '%' . $request['search'] . '%')
                                ->orWhereHas('phones', function ($query) use ($request) {
                                    $query->where('number', 'LIKE', '%' . $request['search'] . '%');
                                });
                        });
                    }
                }
            })
            ->paginate(25);

        return $warrants;
    }

    public static function getIncomeCount($request){
        $income =  Warrant::owned()
            ->where(function($q) use ($request){
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null'){
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
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null'){
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
