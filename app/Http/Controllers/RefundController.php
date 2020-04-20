<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
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
            'html' => view(env('DEFAULT_THEME', 'classic') . '.refund.dialog.form_refund', compact('refund', 'stores', 'request'))->render()
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
            SELECT client_orders.*, IF(partners.isfl = 1, partners.fio, partners.companyName) as partner, CONCAT(client_orders.discount, IF(client_orders.inpercents = 1, \' %\',\' р\')) as discount_formatted,
            (CASE
                WHEN client_orders.status = "active" THEN "Активен"
                WHEN client_orders.status = "canceled" THEN "Отменен"
                WHEN client_orders.status = "full" THEN "Укомплектован"
                WHEN client_orders.status = "complete" THEN "Выполнен"
                ELSE 1
            END) AS status_formatted
            FROM client_orders
            left join partners on partners.id = client_orders.partner_id
            GROUP BY client_orders.id)
             client_orders
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
            ->where('client_orders.company_id', Auth::user()->company()->first()->id)
            ->groupBy('client_orders.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);

        return $refunds;
    }

}
