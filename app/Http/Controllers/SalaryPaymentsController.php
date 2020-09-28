<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\SalaryPayments;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SalaryPaymentsController extends Controller
{
//    public function index(Request $request)
//    {
//        PermissionController::canByPregMatch('Смотреть контакты');
//
//        if(!Gate::allows('Смотреть контакты')){
//            return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
//        }

//        $data = [123, 22];
//
//        $data = json_encode($data);
//
//        $view = view(get_template() . '.partner.index', compact('request', 'categories', 'cat_info'));
//
//        $view->with('data', $data);
//
//        if($request->expectsJson()) {
//            return response()->json([
//                'page' => 'Выплаты зарплат',
//                'data' => $data,
//                'target' => $request->search ? 'ajax-table-salarypayments' : 'ajax-content',
//                'html' => $view->render()
//            ]);
//        }
//
//        return $view;
//
//    }

    public function tableData(Request $request)
    {
        return self::getSalaryPayments($request);
    }

    public static function createPayment($data)
    {
        $payment = SalaryPayments::insert($data);
        return $payment;
    }

    public static function getSalaryPayments($request)
    {

        $size = 40;
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
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }
        if($field === null &&  $dir === null){
            $field = 'id';
            $dir = 'DESC';
        }


        $payments = SalaryPayments::select(DB::raw('salary_payments.id, IF(partners.type < 3, partners.fio, partners.companyName) as name,  salary_payments.summ, salary_payments.date, salary_payments.comment'))
            ->leftJoin('partners',  'partners.id', '=', 'salary_payments.partner_id')
            ->where('salary_payments.company_id', Auth::user()->company_id)
            ->orderBy($field, $dir)
            ->paginate($size);
//        ->toSql();

        foreach ($payments as $payment){
            $payment->date = Carbon::parse($payment->date)->format('d.m.Y H:i');
        }

        return $payments;
    }

}
