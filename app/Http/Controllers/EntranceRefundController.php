<?php

namespace App\Http\Controllers;

use App\Models\Entrance;
use App\Models\EntranceRefund;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EntranceRefundController extends Controller
{
    public static function entranceRefundDialog(Request $request)
    {
        $entrance_refund = EntranceRefund::with('partner', 'manager', 'entrance', 'articles')->find($request['entrance_refund_id']);
        $class = 'entranceRefundDialog' . ($entrance_refund->id ?? '');

        return response()->json([
            'tag' => $class,
            'html' => view(get_template() . '.entrance_refunds.dialog.form_entrance_refund', compact('entrance_refund', 'request', 'class'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $entrance_refunds = self::getEntranceRefunds($request);

        return response()->json(['data' => $entrance_refunds]);
    }

    public static function getEntranceRefunds(Request $request)
    {
        if($request['dates_range']) {
            $dates = explode('|', $request['dates_range']);
            $request['dates'] = $dates;
        }

        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';
        $size = $request['size'] ? (int)$request['size'] : 30;

        $company_id = Auth::user()->company_id;
        $store_id = Auth::user()->partner->store_id;

        $entrance_refunds = EntranceRefund::with('partner', 'manager', 'entrance')
            ->where('company_id', $company_id)
            ->where('store_id', $store_id)
            ->when(is_array($request['provider']), function($query) use ($request) {
                $query->whereHas('entrance', function($query) use ($request){
                    $query->whereIn('partner_id', $request['provider']);
                });
            })
            ->when(is_array($request['accountable']), function($query) use ($request) {
                $query->whereIn('entrances.partner_id', $request['accountable']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('entrances.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->groupBy('id')
            ->orderBy($field, $dir)
            ->paginate($size);

        foreach ($entrance_refunds as $entrance_refund) {
            $entrance_refund['manager_name'] = $entrance_refund->manager->official_name;
            $entrance_refund['partner_name'] = $entrance_refund->partner->official_name;
        }

        return $entrance_refunds;

    }
}
