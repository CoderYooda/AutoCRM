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

        foreach ($request->products as $product) {
            $entrance_count = $entrance->articles->find($product['id'])->pivot->count;
            $entrance_released_count = $entrance->articles->find($product['id'])->pivot->released_count;
            $entrance_refund_count = $entrance->entrancerefunds->sum(function ($query) use($product) {
                return $query->articles->where('id', $product['id'])->sum('pivot.count');
            });

            $available_count = $entrance_count - ($entrance_released_count - $entrance_refund_count);

            if((int)$product['count'] > $available_count) {
                $name = 'products.' . $product['id'] . '.count';
                $errors[$name] = ['Данное количество недоступно.'];
            }
        }

        if(count($errors)) {
            return response()->json([
                'messages' => $errors
            ], 422);
        }

        $store = Store::find(Auth::user()->current_store);

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

            $entrance_refund->entrance->articles()->where('article_id', $product->id)->decrement('released_count', $product->pivot->count);
        }

        $entrance_refund->articles()->sync([]);

        #Создаем новые пивоты
        foreach ($request->products as $product) {

            $price = $entrance->articles->find($product['id'])->pivot->price;

            $entrance_refund->articles()->attach($product['id'], [
                'entrance_refund_id' => $entrance_refund->id,
                'store_id' => $request->store_id,
                'count' => $product['count'],
                'price' => $price,
                'total' => $price * $product['count']
            ]);

            #Резервируем количество в поступлениях
            $entrance_refund->entrance->articles()->where('article_id', $product['id'])->increment('released_count', $product['count']);
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

        $products = $entrance->articles ?? [];

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


        return response()->json([
            'tag' => $class,
            'id' => $entrance_refund->id ?? null,
            'html' => view(get_template() . '.entrance_refunds.dialog.form_entrance_refund', compact('entrance_refund', 'refunded_count', 'request', 'class', 'products'))->render()
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
            ->when(is_array($request['provider']) && !empty($request['provider']), function($query) use ($request) {
                $query->whereHas('partner', function($query) use ($request){
                    $query->whereIn('id', $request['provider']);
                });
            })
            ->when(is_array($request['accountable']) && !empty($request['accountable']), function($query) use ($request) {
                $query->whereHas('manager', function($query) use ($request){
                    $query->whereIn('id', $request['accountable']);
                });
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('entrance_refunds.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
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
