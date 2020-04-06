<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAction;
use App\Http\Controllers\HelpController as HC;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\SystemMessage as SM;
use Illuminate\Support\Facades\Gate;
use Auth;

class UserActionsController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();
        if(!Gate::allows('Смотреть историю')){
            return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
        }
        $actions = self::getActions($request);
        //$system_messages = SM::owned()->get();
        $system_messages = SM::getMessages($request);
        $members = Auth::user()->company()->first()->members()->get();
        if($request->expectsJson() && $request['search'] === NULL){
            $content = view(env('DEFAULT_THEME', 'classic') . '.history.index', compact('request', 'actions', 'system_messages', 'members'))->render();

            return response()->json([
                'target' => $target,
                'page' => 'История',
                'html' => $content
            ]);
        } else {
            return view(env('DEFAULT_THEME', 'classic') . '.history.index', compact('request', 'actions', 'system_messages', 'members'));
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
            ->when($request['search'] != null, function ($query) use ($request) {
                if (mb_strlen($request['search']) == 1) {
                    $query->where('fio', 'like', $request['search'] . '%')
                        ->orWhere('companyName', 'like', $request['search'] . '%');
                } else {
                    $query->where('fio', 'like', '%' . $request['search'] . '%')->orWhere('companyName', 'like', '%' . $request['search'] . '%')->orWhere('basePhone', 'like', '%' . $request['search'] . '%');
                }
            })
            ->when($request['user_id'] != null, function($query) use ($request){
                $query->where('user_id', $request['user_id']);
            })
            ->when($request['type'] != null, function ($query) use ($request) {
                $query->where('model', $request['type']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->groupBy('user_actions.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($partners);
            ->limit($size)
            ->get();

        return $actions;
    }

    public function freshPage(Request $request)
    {
        $target = HC::selectTarget();
        $actions = self::getActions($request);
        $system_messages = SM::getMessages($request);
        $members = Auth::user()->company()->first()->members()->get();
        $messages = null;
        $actionsView = view(env('DEFAULT_THEME', 'classic') . '.history.actions', compact('actions'))->render();
        $membersView = view(env('DEFAULT_THEME', 'classic') . '.history.actions', compact('actions'))->render();
        $system_messagesView = view(env('DEFAULT_THEME', 'classic') . '.history.system_messages', compact('system_messages'))->render();
        if($request->expectsJson() && $request['search'] === NULL){
            return response()->json([
                'target' => $target,
                'page' => 'История',
                'actions' => $actionsView,
                'system_messages' => $system_messagesView,
                'messages' => null
            ]);
        } else {
            return view(env('DEFAULT_THEME', 'classic') . '.history.index', compact('request', 'actions'));
        }
    }

    public function searchPartner(Request $request)
    {
        $target = HC::selectTarget();
        $members = Auth::user()->company()->first()->members()
            ->when($request['search'] != null, function($q) use ($request){
                $q->whereHas('partner', function($q) use ($request){
                    $q->where('fio', 'like', '%' . $request['search'] . '%');
                });

            })
            ->get();
        $membersView = view(env('DEFAULT_THEME', 'classic') . '.history.users', compact('members'))->render();
        //$messagesView =
        return response()->json([
            'target' => $target,
            'members' => $membersView
        ]);
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
            case 'Partner': $model_text = 'контрагента'; break;
            case 'ProviderOrder': $model_text = 'заявку поставщику'; break;
            case 'Warrant': $model_text = 'финансовую операций'; break;
            case 'Cashbox': $model_text = 'кассовый аппарат'; break;
            case 'Entrance': $model_text = 'поступление'; break;
            case 'Adjustment': $model_text = 'корректировку'; break;
            case 'Article': $model_text = 'товар'; break;
            case 'Category': $model_text = 'категорию'; break;
            case 'ClientOrder': $model_text = 'заказ клиента'; break;
            case 'Company': $model_text = 'компанию'; break;
            case 'DdsArticle': $model_text = 'статью ддс'; break;
            case 'Order': $model_text = 'заказ'; break;
            case 'MoneyMoves': $model_text = 'движение средств'; break;
            case 'Salary': $model_text = 'оплату труда'; break;
            case 'Setting': $model_text = 'настройку'; break;
            case 'Shipment': $model_text = 'продажу'; break;
            case 'Sms': $model_text = 'смс'; break;
            case 'Store': $model_text = 'магазин'; break;
            case 'Supplier': $model_text = 'производитель'; break;
            case 'User': $model_text = 'пользователя'; break;
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
