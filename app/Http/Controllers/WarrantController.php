<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use App\Models\DdsArticle;
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

        if($request['ostatok']){
            $data->summ = $request['ostatok'];
        }
        if($request['reason']){
            $data->reason = $request['reason'];
        }

        if($request['warrant_type'] && $request['warrant_type'] !== null){
            $dds_type_id = null;

            switch ($request['warrant_type']){
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
            'html' => view('cash.dialog.form_warrant', compact( 'warrant', 'data', 'request'))->render()
        ]);
    }

    public function store(Request $request)
    {
        $request['company_id'] = Auth::user()->company()->first()->id;
        if($request['do_date'] == null){
            $request['do_date'] = Carbon::now();
        }

        $request['summ'] = (double)$request['summ'];

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
            $partner = $partner->addition($request['summ']);
        } else{
            $cashbox = $cashbox->subtraction($request['summ']);
            $partner = $partner->subtraction($request['summ']);
        }

        $warrant->fill($request->only($warrant->fields));
        $warrant->balance = $cashbox->balance;
        $warrant->save();
        $warrant->created_at = $request['do_date'];
        $warrant->save();


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

    public function delete($id)
    {
        $warrant = Warrant::owned()->where('id', $id)->first();

        $cashbox = $warrant->cashbox()->first();
        $partner = $warrant->partner()->first();

        if($warrant->isIncoming){
            $cashbox->subtraction($warrant->summ);
            $partner->subtraction($warrant->summ);
        } else{
            $cashbox->addition($warrant->summ);
            $partner->addition($warrant->summ);
        }


        $warrant->delete();
        $this->status = 200;
        $type = 'success';
        $this->message = 'Кассовый ордер удален';
        return response()->json([
            'id' => $warrant->id,
            'type' => $type,
            'message' => $this->message
        ], 200);
    }


    private static function validateRules($request)
    {
        $rules = null;

        $rules = [
            'partner_id' => ['required','exists:partners,id'],
            'cashbox_id' => ['required','exists:cashboxes,id'],
            'ddsarticle_id' => ['required','exists:dds_articles,id'],
            'isIncoming' => ['boolean'],
            'summ' => ['required', 'numeric', 'between:0,99.99'],
        ];

        if(isset($request['max_summ']) && $request['max_summ'] != null){
            $rules['summ'] = ['required', 'numeric', 'between:0,' . $request['max_summ']];
        } else {
            $rules['summ'] = ['required',  'numeric', 'between:0,1000000.00'];
        }

        return $rules;
    }

    public static function getWarrants($request)
    {
        $warrants = Warrant::owned()
            ->orderBy('created_at', 'DESC')
            ->where(function($q) use ($request){
                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null' && $request['isIncoming'] != null){
                    $q->where('isIncoming',   boolval ($request['isIncoming']));
                }
            })
            ->where(function($q) use ($request){
                if(isset($request['date_start']) && $request['date_start'] != 'null' && $request['date_start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['date_start']));
                }
                if(isset($request['date_end']) && $request['date_end'] != 'null'  && $request['date_end'] != ''){
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
