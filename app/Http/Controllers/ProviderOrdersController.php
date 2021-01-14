<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Requests\ProviderOrdersRequest;
use App\Models\ProviderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Product;
use App\Http\Controllers\UserActionsController as UA;
use App\Models\Store;

class ProviderOrdersController extends Controller
{
    public static function providerorderDialog($request)
    {
        $po_id = $request['provider_order_id'] ?? $request['providerorder_id'];
        $provider_order = ProviderOrder::find($po_id);

        $class = 'providerorderDialog' . ($provider_order->id ?? '');

        $products = [];

        if ($request->products) {
            $ids = json_decode($request->products, true);
            $products = Product::owned()->whereIn('id', $ids)->get();
        }

        $stores = Store::owned()->get();

        $prefs = [
            'index' => 'ordinal',
            'use_nds' => true,
            'can_add_items' => true,
            'nds' => $provider_order->nds ?? true,
            'nds_included' => $provider_order->nds_included ?? true
        ];

        $items = $provider_order ? $provider_order->products->toArray() : [];

        foreach ($items as $key => $item) {
            $items[$key]['product_id'] = $item['id'];
            $items[$key]['name'] = $item['name'];
            $items[$key]['article'] = $item['article'];
            $items[$key]['pivot_id'] = $item['pivot']['id'];
            $items[$key]['count'] = $item['pivot']['count'];
            $items[$key]['price'] = $item['pivot']['price'];
            $items[$key]['total'] = $item['pivot']['total'];
            $items[$key]['nds'] = $item['pivot']['nds'];
            $items[$key]['nds_percent'] = $item['pivot']['nds_percent'];
            $items[$key]['nds_included'] = $item['pivot']['nds_included'];
        }

        $view = view(get_template() . '.provider_orders.dialog.form_provider_order', compact('provider_order', 'stores', 'request', 'class'))
            ->with('prefs', json_encode($prefs))
            ->with('items', json_encode($items));

        return response()->json([
            'tag'      => $class,
            'html'     => $view->render(),
            'products' => $products
        ]);
    }

    public function tableData(Request $request)
    {
        $providerorders = ProviderOrdersController::getPoviderOrders($request);

        return response()->json(['data' => $providerorders]);
    }

    public static function selectProviderOrderDialog($request)
    {
        $providerorders = ProviderOrder::owned()->with('products')->whereIn('incomes', [0,1])->limit(20)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'tag' => 'selectProviderOrderDialog',
            'html' => view(get_template() . '.provider_orders.dialog.select_providerorder', compact('providerorders',  'request'))->render(),
        ]);
    }

    public function select($id, Request $request)
    {
        $providerorder = ProviderOrder::find($id);

        if (!$providerorder) {
            return response()->json([
                'message' => 'Заявка клиента не найдена, возможно она была удалёна',
            ], 422);
        }

        $products = $providerorder->getNotEnteredProducts();

        foreach ($products as $key => $product) {
            $products[$key]['pivot_id'] = $product['pivot']['id'];
            $products[$key]['product_id'] = $product['id'];
            $products[$key]['provider_order_id'] = $product['pivot']['provider_order_id'];
            $products[$key]['name'] = $product['name'];
            $products[$key]['nds'] = $product['pivot']['nds'];
            $products[$key]['price'] = $product['pivot']['price'];
            $products[$key]['count'] = $product['pivot']['count'];
            $products[$key]['total'] = $product['pivot']['total'];
            $products[$key]['nds_percent'] = $product['pivot']['nds_percent'];
            $products[$key]['nds_included'] = $product['pivot']['nds_included'];
        }

        return response()->json([
            'id' => $providerorder->id,
            'items' => $products,
            'info' => view(get_template() . '.provider_orders.contact-card', compact( 'providerorder','request'))->render(),
            'name' => $providerorder->outputName()
        ]);
    }

    public function dialogSearch(Request $request)
    {
        $providerorders = ProviderOrder::owned()
            ->where('id', 'like', '%' . $request['string'] . '%')
            ->orWhereHas('partner', function ($query) use ($request) {
                $query->where('company_id', Auth::user()->company_id)
                    ->where(function ($q) use ($request) {
                        $q->where('fio', 'like', '%' . $request['string'] . '%')
                            ->orWhere('companyName', 'like', '%' . $request['string'] . '%')
                            ->orWhere('foundstring', 'like', '%' . $request['string'] . '%');
                    });
            })
            ->orderBy('id', 'DESC')
            ->limit(10)
            ->get();

        $content = view(get_template() . '.provider_orders.dialog.select_providerorder_inner', compact('providerorders', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

    public function loadItems($id, Request $request)
    {
        $providerorder = ProviderOrder::owned()->where('id', $id)->first();
        return response()->json([
            'html' => view('provider_orders.dialog.select_providerorder_items', compact('providerorder', 'request'))->render()
        ]);
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять заявки поставщикам');
        $returnIds = null;
        if ($id == 'array') {
            $provider_orders = ProviderOrder::whereIn('id', $request['ids']);
            $this->message = 'Заказы поставщику удалены';
            $returnIds = $provider_orders->get()->pluck('id');
            foreach ($provider_orders->get() as $provider_order) {
                if ($provider_order->entrances()->count() > 0) {
                    return response()->json([
                        'type'    => 'error',
                        'message' => 'Заявка не может быть удалена, имеются поступившие товары'
                    ], 200);
                } else {
                    if ($provider_order->delete()) {
                        #Отнимаем с баланса контакта
                        $provider_order->partner()->first()->subtraction($provider_order->itogo);
                        UA::makeUserAction($provider_order, 'delete');
                    }
                }
            }
        } else {
            $provider_order = ProviderOrder::where('id', $id)->first();
            $this->message = 'Заказ поставщику удален';
            $returnIds = $provider_order->id;
            if ($provider_order->entrances()->count() > 0) {
                return response()->json([
                    'type'    => 'error',
                    'message' => 'Заявка не может быть удалена, имеются поступившие товары'
                ], 200);
            } else {
                if ($provider_order->delete()) {
                    #Отнимаем с баланса контакта
                    $provider_order->partner()->first()->subtraction($provider_order->itogo);
                    UA::makeUserAction($provider_order, 'delete');
                }
            }
        }

        return response()->json([
            'id'      => $returnIds,
            'message' => $this->message
        ], 200);
    }

    public function fresh($id, Request $request)
    {
        $request['inner'] = 1;
        $request['providerorder_id'] = $id;

        return self::providerorderDialog($request);
    }

    public function store(ProviderOrdersRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать заявки поставщикам' : 'Создавать заявки поставщикам');

        return DB::transaction(function () use ($request) {
            $provider_order = ProviderOrder::firstOrNew(['id' => $request['id']]);

            $request['do_date'] = Carbon::now();

            if ($provider_order) {
                $errors = [];

                foreach ($request->products as $index => $product) {

                    if(!isset($product['pivot_id'])) continue;

                    $enteredCount = $provider_order->getArticleEnteredCountByPivotId($product['pivot_id']);

                    if ($enteredCount > $product) {
                        $errors['products.' . $index . '.count'] = 'Кол-во в заявке не может быть меньше чем поступивших товаров.';
                    }
                }

                if (count($errors)) {
                    if ($request->expectsJson()) {
                        return response()->json(['messages' => $errors], 422);
                    }
                }
            }

            if ($provider_order->exists) {
                $store = Store::find($request['store_id']);

                if ($store->id !== $provider_order->store->id) {
                    foreach ($provider_order->entrances as $entrance) {
                        $entrance->migrateInStore($store);
                    }
                }

                #Отнимаем с баланса контакта
                $provider_order->partner->subtraction($provider_order->itogo);

                $this->message = 'Заказ поставщику обновлен';

                $wasExisted = true;
            } else {
                $provider_order->company_id = Auth::user()->company_id;
                $provider_order->manager_id = Auth::user()->partner->id;
                $this->message = 'Заказ поставщику сохранен';
                $wasExisted = false;
            }
            $provider_order->fill($request->only($provider_order->fields));
            $provider_order->summ = 0;
            $provider_order->balance = 0;
            $provider_order->itogo = 0;
            $provider_order->save();

            UA::makeUserAction($provider_order, $wasExisted ? 'fresh' : 'create');

            foreach ($request['products'] as $product) {

                $count = $product['count'];
                $price = $product['price'];
                $total = $price * $count;

                $provider_order->summ += $total;

                $nds_percent = 20;
                $nds = 0.00;

                if ($request['nds']) {
                    $nds = $total / (100 + $nds_percent);
                    if ($request['nds_included']) $nds *= $nds_percent;
                }

                $params = [
                    'product_id'        => $product['product_id'],
                    'provider_order_id' => $provider_order->id,
                    'count'             => $product['count'],
                    'price'             => $product['price'],
                    'total'             => $total,
                    'nds'               => round($nds, 2),
                    'nds_percent'       => round($nds_percent, 2),
                    'nds_included'      => $request['nds_included'],
                ];

                DB::table('article_provider_orders')->updateOrInsert(['id' => ($product['pivot_id'] ?? null)], $params);

                foreach ($provider_order->entrances as $entrance) {
                    $entrance->freshPriceByArticleId($product['product_id'], $total);
                }
            }

//            $provider_order->freshWsumm();

            if ($request['inpercents']) {
                $provider_order->itogo = $provider_order->summ - ($provider_order->summ / 100 * $request['discount']);
            } else {
                if ($request['discount'] >= $provider_order->summ) {
                    $request['discount'] = $provider_order->summ;
                }
                if ($request['discount'] <= 0) {
                    $request['discount'] = 0;
                }
                $provider_order->discount = $request['discount'];
                $provider_order->itogo = $provider_order->summ - $request['discount'];
            }

            #Добавляем к балансу контакта
            $provider_order->partner->addition($provider_order->itogo);

            $provider_order->summ = $provider_order->products()->sum('total');

            $provider_order->save();

            event(new ModelWasStored($provider_order->company_id, 'ProviderOrderStored'));

            return response()->json([
                'message' => $this->message,
                'id'      => $provider_order->id
            ]);
        });
    }

    public function getPartnerSideInfo(Request $request)
    {

        $provider_order = ProviderOrder::owned()->where('id', $request['id'])->first();
        $partner = $provider_order->partner()->first();
        $comment = $provider_order->comment;
        if ($request->expectsJson()) {
            return response()->json([
                'info'    => view(get_template() . '.provider.contact-card', compact('partner', 'request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getProviderOrderProducts($id)
    {
        $provider_order = ProviderOrder::where('id', $id)->first();

        return response()->json([
            'products' => $provider_order->products()->get()]);
    }

    public static function getPoviderOrders($request)
    {
        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';
        $size = $request['size'] ? (int)$request['size'] : 30;

        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        return ProviderOrder::leftJoin('partners as partner', 'partner.id', '=', 'provider_orders.partner_id')
            ->leftJoin('partners as manager', 'manager.id', '=', 'provider_orders.manager_id')
            ->select(DB::raw('provider_orders.*, partner.fio, partner.foundstring as p_foundstring, manager.foundstring as m_foundstring, manager.fio, IF(partner.type != 2, partner.fio, partner.companyName) as partner_name, manager.fio as manager_name'))
            ->when(is_array($request['provider']) && count($request['provider']), function ($query) use ($request) {
                $query->whereIn('provider_orders.partner_id', $request['provider']);
            })
            ->when(is_array($request['accountable']) && count($request['accountable']), function ($query) use ($request) {
                $query->whereIn('manager_id', $request['accountable']);
            })
            ->when($request['search'] != null, function ($query) use ($request) {
                $query->where('provider_orders.id', 'like', '%' . $request['search'] . '%')
                    ->orWhere('partner.foundstring', 'like', '%' . $request['search'] . '%')
                    ->orWhere('manager.foundstring', 'like', '%' . $request['search'] . '%');
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('provider_orders.created_at', [Carbon::parse($request['dates'][0]),
                    Carbon::parse($request['dates'][1])]);
            })
            ->when($request['pay_status'] != null, function ($query) use ($request) {
                $query->where('provider_orders.pays', $request['pay_status']);
            })
            ->when($request['entrance_status'] != null, function ($query) use ($request) {
                $query->where('provider_orders.incomes', $request['entrance_status']);
            })
            ->where('provider_orders.company_id', Auth::user()->company_id)
            ->orderBy($field, $dir)
            ->paginate($size);
    }

    private static function calculatePivotArticleProviderOrder($request, $product){
### Рассчет товара для поступления ##########################
        $data = [];

        $vcount = $product['count'];
        $vprice = $product['price'];
        $vnds_percent = 20;

        if($request['nds'] && !$request['nds_included']){
            $vtotal = $vprice * $vcount;
            $vnds = $vtotal / 100 * $vnds_percent;
            $vtotal = $vnds + $vtotal;
        } else if($request['nds'] && $request['nds_included']){
            $vtotal = $vprice * $vcount;
            $vnds = $vtotal / ( 100 + $vnds_percent ) * $vnds_percent;
        } else {
            $vtotal = $vprice * $vcount;
            $vnds = 0.00;
        }

        $data = [
            'count' => $product['count'],
            'price' => $product['price'],
            'total' => $vtotal,
            'nds' => round($vnds, 2),
            'nds_percent' => round($vnds_percent, 2),
            'nds_included' => $request['nds_included'],
        ];
        return $data;
    }
}

