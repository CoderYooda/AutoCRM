<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UserActionsController as UA;
use App\Http\Requests\EntranceRefundStoreRequest;
use App\Models\Article;
use App\Models\Entrance;
use App\Models\EntranceRefund;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EntranceRefundController extends Controller
{
    public function store(EntranceRefundStoreRequest $request)
    {
        PermissionController::canByPregMatch('Создавать возвраты поступлений');

        $entrance = Entrance::with('articles')->find($request->entrance_id);

        $errors = [];

        foreach ($request->products as $index => $product) {

            $product_id = $product['product_id'];
            $pivot_id = $product['pivot_id'];

            $entrance_count = $entrance->articles->find($product_id)->pivot->count;
            $entrance_released_count = $entrance->articles->find($product_id)->pivot->released_count;
            $entrance_refund_count = $entrance->entrancerefunds->sum(function ($query) use($product, $pivot_id) {
                return $query->articles->where('id', $pivot_id)->sum('pivot.count');
            });

            $available_count = $entrance_count - ($entrance_released_count - $entrance_refund_count);

            if((int)$product['count'] > $available_count) {
                $name = 'products.' . $index . '.count';
                $errors[$name] = ['Данное количество недоступно.'];
            }
        }

        if(count($errors)) {
            return response()->json([
                'messages' => $errors
            ], 422);
        }

        #Создание заявки на возврат
        $entrance_refund = EntranceRefund::updateOrCreate(['id' => $request->id], [
            'partner_id' => $request->partner_id,
            'manager_id' => Auth::user()->partner->id,
            'store_id' => $request->store_id,
            'entrance_id' => $request->entrance_id,
            'company_id' => Auth::user()->company_id,
            'comment' => $request->comment
        ]);

        #Отнимаем имеющиеся количество для сохранения
        foreach ($entrance_refund->articles as $product) {

            $entrance_refund->entrance->articles()->where('article_id', $product['product_id'])->decrement('released_count', $product->pivot->count);
        }

        $entrance_refund->articles()->sync([]);

        #Создаем новые пивоты
        foreach ($request->products as $index => $product) {

            $price = $entrance->articles()->find($product['product_id'])->pivot->price;

            $entrance_refund->articles()->attach($product['product_id'], [
                'entrance_refund_id' => $entrance_refund->id,
                'store_id' => $request->store_id,
                'count' => $product['count'],
                'price' => $price,
                'total' => $price * $product['count']
            ]);

            #Резервируем количество в поступлениях
            $entrance_refund->entrance->articles()->where('article_id', $product['product_id'])->increment('released_count', $product['count']);
        }

        #Добавляем к балансу контакта
        $entrance->providerorder->partner->subtraction($entrance->totalPrice);

        UA::makeUserAction($entrance_refund, 'create');

        return response()->json([
            'id' => $entrance_refund->id,
            'type' => 'success',
            'event' => 'EntranceRefundStored',
            'message' => 'Возврат по поступлению успешно создан.'
        ]);
    }

    public function getSideInfo(Request $request)
    {
        $entrancerefund = EntranceRefund::find($request->id);

        $partner = $entrancerefund->partner;
        $comment = $entrancerefund->comment;

        return response()->json([
            'info' => view(get_template() . '.entrance_refunds.contact-card', compact('entrancerefund', 'partner', 'request'))->render(),
            'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render(),
        ], 200);
    }

    public static function entranceRefundDialog(Request $request)
    {
        PermissionController::canByPregMatch('Смотреть возвраты поступлений');

        $entrance_refund = EntranceRefund::find($request['entrance_refund_id']);
        $class = 'entranceRefundDialog' . ($entrance_refund->id ?? '');

        $entrance = $entrance_refund->entrance ?? null;

        $refunded_count = [];

        if($entrance) {
            $entrance_refunded = $entrance->entrancerefunds->load('articles');

            foreach ($entrance_refunded as $refund) {

                foreach ($refund->articles as $product) {

                    if (!isset($refunded_count[$product->id])) $refunded_count[$product->id] = 0;
                    $refunded_count[$product->id] += $product->pivot->count;
                }
            }
        }

        $prefs = [
            'use_nds' => false,
            'can_add_items' => false,
            'nds' => 0,
            'freeze' => $entrance ? true : false,
            'nds_included' => false
        ];

        $items = $entrance ? $entrance_refund->articlesJson->toArray() : [];

        $view = view(get_template() . '.entrance_refunds.dialog.form_entrance_refund', compact('entrance_refund', 'refunded_count', 'request', 'class'))
            ->with('prefs', json_encode($prefs))
            ->with('items', json_encode($items));

        return response()->json([
            'tag' => $class,
            'id' => $entrance_refund->id ?? null,
            'html' => $view->render()
        ]);
    }

    public function tableData(Request $request)
    {
        PermissionController::canByPregMatch('Смотреть возвраты поступлений');

        $entrance_refunds = self::getEntranceRefunds($request);

        return response()->json(['data' => $entrance_refunds]);
    }

    public static function getEntranceRefunds(Request $request)
    {
        $field = $request['field'] ?? 'created_at';
        $dir = $request['dir'] ?? 'DESC';

        if ($request['dates'] !== null) {
            $dates[0] = Carbon::createFromTimestamp((int)$request['dates'][0])->setTime(0,0,0);
            $dates[1] = Carbon::createFromTimestamp((int)$request['dates'][1])->setTime(23,59,59);
            $request['dates'] = $dates;
        }

        $size = $request['size'] ? (int)$request['size'] : 30;

        $company_id = Auth::user()->company_id;
        $store_id = Auth::user()->partner->store_id;

        $entrance_refunds = EntranceRefund::select(DB::raw('entrance_refunds.*, IF(partner.type != 2, partner.fio, partner.companyName) as partner_name, manager.fio as manager_name'))
            ->leftJoin('partners as partner', 'partner.id', '=', 'entrance_refunds.partner_id')
            ->leftJoin('partners as manager', 'manager.id', '=', 'entrance_refunds.manager_id')
            ->where('entrance_refunds.company_id', $company_id)
            ->where('entrance_refunds.store_id', $store_id)
            ->when(is_array($request['provider']) && !empty($request['provider']), function($query) use ($request) {
                $query->whereHas('partner', function($query) use ($request){
                    $query->whereIn('entrance_refunds.id', $request['provider']);
                });
            })
            ->when(is_array($request['accountable']) && !empty($request['accountable']), function($query) use ($request) {
                $query->whereHas('manager', function($query) use ($request){
                    $query->whereIn('entrance_refunds.id', $request['accountable']);
                });
            })
            ->when($request['dates'] != null, function($query) use ($request) {
                $query->whereBetween('entrance_refunds.created_at', [$request['dates'][0], $request['dates'][1]]);
            })
            ->groupBy('entrance_refunds.id')
            ->orderBy($field, $dir)
            ->paginate($size);

        return $entrance_refunds;

    }
}
