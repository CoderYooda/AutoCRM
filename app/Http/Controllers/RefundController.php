<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use Auth;

class RefundController extends Controller
{
    public static function refundDialog($request)
    {
        $tag = 'refundDialog';

        if ($request['refund_id']) {
            $refund = Refund::where('id', (int)$request['refund_id'])->first();

            $tag .= $refund->id;
        } else {
            $refund = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.refund.dialog.form_refund', compact('refund', 'request'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $refunds = RefundController::getRefunds($request);

        foreach ($refunds as $refund) {
            //$client_order->date = $client_order->created_at->format('Y.m.d/H:i');
        }

        return response()->json($refunds);
    }

    public function store(Request $request)
    {
        $refund = Refund::firstOrNew(['id' => $request['id']]);

        $validation = Validator::make($request->all(), self::validateRules());

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($refund->exists){
            $refundWasExisted = true;
            $this->message = 'Возврат обновлен';
//            #Отнимаем с баланса контрагента
//            $shipment->partner()->first()->addition($shipment->itogo);
        } else {
            $refundWasExisted = false;
            //$shipment->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Возврат сохранен';
        }

        $refund->fill($request->only($refund->fields));
        $refund->summ = 0;
        $refund->save();
        UA::makeUserAction($refund, $refundWasExisted ? 'fresh' : 'create');

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $refund->id,
                'event' => 'RefundStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    private static function validateRules()
    {
        $rules = [
            'shipment_id' => ['required', 'exists:shipments,id'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
        ];

        return $rules;
    }

    public static function getRefunds($request)
    {

        $size = 30;
        if (isset($request['size'])) {
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if (isset($request['sorters'])) {
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }
        if ($field === null && $dir === null) {
            $field = 'created_at';
            $dir = 'DESC';
        }

        if ($request['provider'] == null) {
            $request['provider'] = [];
        }

        if ($request['accountable'] == null) {
            $request['accountable'] = [];
        }

        $refunds = Refund::select(DB::raw('
            refund.*, refund.created_at as date, refund.id as rid
        '))
            ->from(DB::raw('(
            SELECT refund.*
            FROM refund
            left join partners on partners.id = refund.manager_id
            GROUP BY refund.id)
             refund
        '))
            ->when($request['provider'] != [], function ($query) use ($request) {
                $query->whereIn('partner_id', $request['provider']);
            })
            ->when($request['clientorder_status'] != null, function ($query) use ($request) {
                $query->where('status', $request['clientorder_status']);
            })
            ->when($request['accountable'] != [], function ($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['accountable']);
            })
            ->when($request['client'] != [], function ($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['client']);
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('client_orders.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->where('refund.company_id', Auth::user()->company()->first()->id)
            ->groupBy('refund.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);

        return $refunds;
    }

}
