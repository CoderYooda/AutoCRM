<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAction;
use App\Http\Controllers\HelpController as HC;
use Illuminate\Support\Facades\DB;
use Auth;

class UserActionsController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();
        $actions = self::getActions($request);
        if($request->expectsJson() && $request['search'] === NULL){
            $content = view(env('DEFAULT_THEME', 'classic') . '.history.index', compact('request', 'actions'))->render();

            return response()->json([
                'target' => $target,
                'page' => 'История',
                'html' => $content
            ]);
        } else {
            return view(env('DEFAULT_THEME', 'classic') . '.history.index', compact('request', 'actions'));
        }
    }

    public static function getActions($request)
    {

        if ($request['category_id'] == 3) {
            $request['category_id'] = null;
        }

        $size = 50;
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

        $actions = UserAction::where('company_id', Auth::user()->company()->first()->id)
//            ->where(function($q) use ($request){
//                if(isset($request['search']) && $request['search'] != ""){
//                    $q->where('articles.foundstring', 'LIKE' , '%' . mb_strtolower (str_replace(' ', '', $request['search'])) . '%');
//                }
//            })
            ->when($request['search'] != null, function ($query) use ($request) {
                if (mb_strlen($request['search']) == 1) {
                    $query->where('fio', 'like', $request['search'] . '%')
                        ->orWhere('companyName', 'like', $request['search'] . '%');
                } else {
                    $query->where('fio', 'like', '%' . $request['search'] . '%')->orWhere('companyName', 'like', '%' . $request['search'] . '%')->orWhere('basePhone', 'like', '%' . $request['search'] . '%');
                }
            })
            ->when($request['provider'] != [], function ($query) use ($request) {
                $query->whereIn('partner_id', $request['provider']);
            })
            ->when($request['clientorder_status'] != null, function ($query) use ($request) {
                $query->where('status', $request['clientorder_status']);
            })
            ->when($request['accountable'] != [], function ($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['accountable']);
            })
//            ->when($request['dates_range'] != null, function($query) use ($request) {
//                $query->whereBetween('client_orders.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
//            })
            ->groupBy('user_actions.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($partners);
            ->limit($size)
            ->get();

        return $actions;
    }

    public static function makeUserAction($model, $action)
    {
        $message_text = null;
        $type = 'none';
        switch ($action){
            case 'create':
                $type = 'create';
                $message_text = 'Создал';
                break;
            case 'fresh':
                $type = 'fresh';
                $message_text = 'Обновил';
                break;
            case 'delete':
                $type = 'delete';
                $message_text = 'Удалил';
                break;
            case 'restore':
                $type = 'restore';
                $message_text = 'Восстановил';
                break;
            default:
                $message_text = 'Отредактировал';
                break;
        }

        $className = class_basename($model);

        $model_text = null;
        switch ($className){
            case 'Partner':
                $model_text = 'контрагента';
                break;
        }

        $action = new UserAction();
        $action->user_id = Auth::user()->id;
        $action->company_id = Auth::user()->company()->first()->id;
        $action->model = $className;
        $action->type = $type;
        $action->model_id = $model->id;
        $action->message = $message_text . ' ' . $model_text . ' #' . $model->id;
        $action->save();
    }
}
