<?php

namespace App\Http\Controllers;

use App\Services\ProviderService\Providers;
use Illuminate\Http\Request;
use App\Models\UserAction;
use App\Http\Controllers\HelpController as HC;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\SystemMessage as SM;

class UserActionsController extends Controller
{
    public function index(Request $request, Providers $providers)
    {
        $target = HC::selectTarget();
        PermissionController::canByPregMatch('Смотреть историю');
        $actions = self::getActions($request);
        $system_messages = SM::getMessages($request);
        $members = Auth::user()->company->members;

        $view = view(get_template() . '.history.index', compact('request', 'actions', 'system_messages', 'members'));

        if($request->expectsJson() && $request['search'] === NULL){

            return response()->json([
                'target' => $target,
                'page' => 'История',
                'html' => $view->render()
            ]);
        }

        return $view;
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

        $actions = UserAction::with('user.partner')
            ->where('company_id', Auth::user()->company()->first()->id)
            ->when($request['search'] != null, function ($query) use ($request) {
                if (mb_strlen($request['search']) == 1) {
                    $query->where('fio', 'like', $request['search'] . '%')
                        ->orWhere('companyName', 'like', $request['search'] . '%');
                } else {
                    $query->where('fio', 'like', '%' . $request['search'] . '%')->orWhere('companyName', 'like', '%' . $request['search'] . '%');
                }
            })
            ->when($request['user_id'] != null, function($query) use ($request){
                $query->where('user_id', $request['user_id']);
            })
            ->when($request['type'] != null, function ($query) use ($request) {
                $query->where('model', $request['type']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0])->startOfDay(), Carbon::parse($request['dates'][1])->endOfDay()]);
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
        $members = Auth::user()->company->members;
        $messages = null;
        $actionsView = view(get_template() . '.history.actions', compact('actions'))->render();
        $membersView = view(get_template() . '.history.actions', compact('actions'))->render();
        $system_messagesView = view(get_template() . '.history.system_messages', compact('system_messages'))->render();
        if($request->expectsJson() && $request['search'] === NULL){
            return response()->json([
                'target' => $target,
                'page' => 'История',
                'actions' => $actionsView,
                'system_messages' => $system_messagesView,
                'messages' => null
            ]);
        } else {
            return view(get_template() . '.history.index', compact('request', 'actions'));
        }
    }

    public function searchPartner(Request $request)
    {
        $target = HC::selectTarget();
        $members = Auth::user()->company->members()
            ->when($request['search'] != null, function($q) use ($request){
                $q->whereHas('partner', function($q) use ($request){
                    $q->where('fio', 'like', '%' . $request['search'] . '%');
                });

            })
            ->get();
        $membersView = view(get_template() . '.history.users', compact('members'))->render();
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
                $message_text = 'Создание';
                break;
            case 'fresh':
                $type = 'fresh';
                $message_text = 'Обновление';
                break;
            case 'delete':
                $type = 'delete';
                $message_text = 'Удаление';
                break;
            case 'restore':
                $type = 'restore';
                $message_text = 'Восстановление';
                break;
            default:
                $message_text = 'Редактирование';
                break;
        }

        $className = class_basename($model);

        $modelTexts = [
            'Partner' => 'контакта',
            'ProviderOrder' => 'заявки поставщику',
            'Warrant' => 'финансовой операции',
            'Cashbox' => 'кассового аппарата',
            'Entrance' => 'поступления',
            'Adjustment' => 'корректировки',
            'Article' => 'товара',
            'Category' => 'категории',
            'ClientOrder' => 'заказа клиента',
            'Company' => 'компании',
            'DdsArticle' => 'статьи ддс',
            'Order' => 'заказа',
            'MoneyMoves' => 'движения средств',
            'Salary' => 'оплаты труда',
            'Setting' => 'настройки',
            'Shipment' => 'продажи',
            'Sms' => 'смс',
            'Store' => 'магазина',
            'Supplier' => 'производителя',
            'Refund' => 'возврата',
            'User' => 'пользователя',
            'EntranceRefund' => 'возврата поставщику'
        ];

        UserAction::create([
            'user_id' => Auth::id(),
            'company_id' => Auth::user()->company_id,
            'model' => $className,
            'type' => $type,
            'model_id' => $model->id,
            'message' => ($message_text . ' ' . $modelTexts[$className] . ' #' . $model->id)
        ]);
    }
}
