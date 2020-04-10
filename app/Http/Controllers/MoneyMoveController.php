<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use App\Models\MoneyMoves;
use App\Models\Partner;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Auth;

class MoneyMoveController extends Controller
{

    public static function moneymoveDialog($request)
    {
        $tag = 'moneymoveDialog';

        if($request['moneymove_id']){
            $moneymove = MoneyMoves::where('id', (int)$request['moneymove_id'])->first();
            $tag .= $moneymove->id;
        } else {
            $moneymove = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.cashmove.dialog.form_moneymove', compact('moneymove', 'request'))->render()
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
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $moneymove = MoneyMoves::firstOrNew(['id' => $request['id']]);

        if($moneymove->exists){
            $message = "Перемещение обновлено обновлен";
            $moneymove->out_cashbox()->first()->subtraction($moneymove->summ);
            $moneymove->in_cashbox()->first()->addition($moneymove->summ);
        } else{
            $message = "Перемещение создано";
            $moneymove->manager_id = Auth::user()->partner()->first()->id;
        }

        $in_cashbox = Cashbox::owned()->where('id', $request['in_cashbox_id'])->first();
        $out_cashbox = Cashbox::owned()->where('id', $request['out_cashbox_id'])->first();

        $out_cashbox = $out_cashbox->addition($request['summ']);
        $in_cashbox = $in_cashbox->subtraction($request['summ']);

        $moneymove->fill($request->only($moneymove->fields));
        $moneymove->in_balance = $in_cashbox->balance;
        $moneymove->out_balance = $out_cashbox->balance;
        $moneymove->created_at = $request['do_date'];
        $moneymove->save();


        if($request->expectsJson()){
            return response()->json([
                'message' => $message,
                'event' => 'MoneymoveStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getSideInfo(Request $request){

        $moneymove = MoneyMoves::owned()->where('id', $request['id'])->first();
        $partner = $moneymove->manager()->first();
        $comment = $moneymove->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(env('DEFAULT_THEME', 'classic') . '.cashmove.contact-card', compact( 'partner','request', 'moneymove'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id, Request $request)
    {
        if(!Gate::allows('Удалять денежные перемещения')){
            return PermissionController::closedResponse('Вам запрещено это действие.');
        }
        $returnIds = null;
        if($id == 'array'){
            $moneymoves = MoneyMoves::owned()->whereIn('id', $request['ids']);
            $this->message = 'Перемещения удалены';
            $returnIds = $moneymoves->get()->pluck('id');
            foreach($moneymoves->get() as $moneymove){
                $this->message = 'Перемещения удалены';
                $this->status = 200;
                if(!$moneymove->delete()){
                    $this->message = 'Ошибка зависимотей. Обратитесь к администратору';
                    $this->status = 500;
                }
            }
        } else {
            $moneymove = MoneyMoves::owned()->where('id', $id)->first();
            $this->message = 'Перемещение удалено';
            $returnIds = $moneymove->id;
            $this->status = 200;
            if(!$moneymove->delete()){
                $this->message = 'Ошибка зависимотей. Обратитесь к администратору';
                $this->status = 500;
            }
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], $this->status);
    }

    public function tableData(Request $request)
    {
        $moneymoves = self::getMoneymoves($request);
        foreach($moneymoves as $moneymove){
            $moneymove->date = $moneymove->created_at->format('Y.m.d/H:i');
        }

        return response()->json($moneymoves);
    }

    public function search(Request $request){
        $content = view('cash.elements.moneymove_list_container', compact('request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-moneymove',
        ], 200);
    }

    public static function getMoneymoves($request)
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
        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $request['dates'] = $dates;
        }
        if($field === null &&  $dir === null){
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['partner'] == null){
            $request['partner'] = [];
        }
        if($request['any'] == null){
            $request['any'] = [];
        }

        $moneymoves = MoneyMoves::select(DB::raw('money_move.*, money_move.created_at as date, cashbox_in.name as cin, cashbox_out.name as cout, IF(manager.isfl = 1, manager.fio, manager.companyName) as manager'))
            ->from(DB::raw('money_move
            left join cashboxes as cashbox_in on cashbox_in.id = money_move.in_cashbox_id
            left join cashboxes as cashbox_out on cashbox_out.id = money_move.out_cashbox_id
            left join partners as manager on manager.id = money_move.manager_id
            '))

            ->when($request['partner'] != [], function($query) use ($request) {
                $query->whereIn('money_move.manager_id', $request['partner']);
            })
            ->when($request['any'] != [], function($query) use ($request) {
                $query->whereIn('money_move.manager_id', $request['any']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('money_move.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->where('money_move.company_id', Auth::user()->company()->first()->id)
            ->groupBy('money_move.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($moneymoves);
            ->paginate($size);

        return $moneymoves;
    }


    private static function validateRules($request)
    {
        $rules = null;
        $rules = [
            'company_id' => ['required','exists:companies,id'],
            'in_cashbox_id' => ['required','exists:cashboxes,id', 'different:out_cashbox_id'],
            'out_cashbox_id' => ['required','exists:cashboxes,id', 'different:in_cashbox_id'],
            'summ' => ['required', 'integer', 'min:0', 'max:100000000'],

        ];
        return $rules;
    }
}
