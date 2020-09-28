<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\SalaryPayments;
use App\Models\Warrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CashController extends Controller
{
    public function index(Request $request){

        $page_title = 'Деньги';

        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }

        $target = HC::selectTarget(); // цель ajax подгрузки

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'warrant';
        }

        $classname = $request['active_tab'] . 'Tab';

        if($request['active_tab'] === 'null'){$classname = 'moneyTab';}

        $content = self::$classname($request);

	    if(class_basename($content) == "JsonResponse"){
		    return $content;
	    }

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'class' => 'Cash',
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

	public static function getAllowedPage(){
		$tabs = [
			'warrant' => 'Смотреть денежные операции',
			'cashmove' => 'Смотреть денежные перемещения',
		];
		foreach ($tabs as $tab => $permission) {
			if(Gate::allows($permission)){
				return ['active_tab' => $tab];
			}
		}
	}

    public static function warrantTab($request)
    {
	    if(!Gate::allows('Смотреть денежные операции')){
		    return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
	    }

        $data = WarrantController::getWarrants($request);
        $data = json_encode($data->toArray());

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-warrant'){
            return view(get_template() . '.warrant.elements.table_container', compact('request', 'data'));
        } else {
            return view(get_template() . '.warrant.index', compact('request', 'data'));
        }
    }

    public static function cashmoveTab($request)
    {
	    if(!Gate::allows('Смотреть денежные перемещения')){
		    return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
	    }

        $data = MoneyMoveController::getMoneymoves($request);
        $data = json_encode($data->toArray());

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-cashmove'){
            return view(get_template() . '.cashmove.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.cashmove.index', compact('request', 'data'));
    }

    public static function salarypaymentsTab($request)
    {
//        if(!Gate::allows('Смотреть денежные перемещения')){
//            return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
//        }

        $data = SalaryPaymentsController::getSalaryPayments($request);
        $data = json_encode($data->toArray());

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-cashmove'){
            return view(get_template() . '.salaryPayments.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.salaryPayments.index', compact('request', 'data'));
    }
}
