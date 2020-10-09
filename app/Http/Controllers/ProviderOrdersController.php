<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProviderOrdersRequest;
use App\Models\ProviderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Article;
use App\Http\Controllers\UserActionsController as UA;
use App\Models\Store;

class ProviderOrdersController extends Controller
{
    public static function providerorderDialog($request)
    {
        $po_id = isset($request['provider_order_id']) ? $request['provider_order_id'] : $request['providerorder_id'];
        $provider_order = ProviderOrder::find((int)$po_id);

        $class = 'providerorderDialog' . ($provider_order->id ?? '');

        $products = [];

        if ($request->products) {
            $ids = json_decode($request->products, true);
            $products = Article::owned()->whereIn('id', $ids)->get();
        }

        $stores = Store::owned()->get();

        $view = view(get_template() . '.provider_orders.dialog.form_provider_order', compact('provider_order', 'stores', 'request', 'class'));

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
        $providerorders = ProviderOrder::owned()->with('articles')->orderBy('created_at', 'DESC')->limit(10)->get();

        $providerorders = $providerorders->filter(function (ProviderOrder $providerOrder) {

            $total_count = 0;

            foreach ($providerOrder->articles as $product) {
                $total_count += $product->pivot->count - $providerOrder->getArticleEnteredCountByPivotId($product->pivot->id);
            }

            return (bool)$total_count;
        });

        return response()->json([
            'tag'  => 'selectProviderOrderDialog',
            'html' => view(get_template() . '.provider_orders.dialog.select_providerorder', compact('providerorders', 'request'))->render(),
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

        return response()->json([
            'id'         => $providerorder->id,
            'items_html' => view(get_template() . '.entrance.dialog.products_element', compact('providerorder', 'request'))->render(),
            'info'       => view(get_template() . '.provider_orders.contact-card', compact('providerorder', 'request'))->render(),
            'name'       => $providerorder->outputName()
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
        $provider_order = ProviderOrder::find($id);

        foreach ($provider_order->articles as $article) {
            $article->instock = $article->getCountInStoreId($provider_order->store_id);
            if ($article->instock >= $article->count) {
                $article->complited = true;
            } else {
                $article->complited = false;
            }
        }
        $total_complited = true;

        foreach ($provider_order->articles as $article) {
            if (!$article->complited) {
                $total_complited = false;
            }
        }

        $provider_order->total_complited = $total_complited;

        $request['fresh'] = true;
        $class = 'providerorderDialog' . $id;
        $inner = true;
        $content = view(get_template() . '.provider_orders.dialog.form_provider_order', compact('provider_order', 'class', 'request', 'inner'))->render();
        return response()->json([
            'html'     => $content,
            'target'   => 'providerorderDialog' . $id,
            'products' => []
        ]);
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
                    'article_id'        => $product['id'],
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
                    $entrance->freshPriceByArticleId($product['id'], $total);
                }
            }

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

            $provider_order->summ = $provider_order->articles()->sum('total');

            $provider_order->save();

            return response()->json([
                'message' => $this->message,
                'id'      => $provider_order->id,
                'event'   => 'ProviderOrderStored',
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
            'products' => $provider_order->articles()->get()]);
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

        $provider_orders = ProviderOrder::leftJoin('partners as partner', 'partner.id', '=', 'provider_orders.partner_id')
            ->leftJoin('partners as manager', 'manager.id', '=', 'provider_orders.manager_id')
            ->select(DB::raw('provider_orders.*, partner.fio, partner.foundstring as p_foundstring, manager.foundstring as m_foundstring, manager.fio, IF(partner.type != 2, partner.fio, partner.companyName) as partner_name, manager.fio as manager_name'))
            ->when(is_array($request['provider']), function ($query) use ($request) {
                $query->whereIn('provider_orders.partner_id', $request['provider']);
            })
            ->when(is_array($request['accountable']), function ($query) use ($request) {
                $query->whereIn('manager_id', $request['accountable']);
            })
            ->when($request['search'] != null, function ($query) use ($request) {
                $query->where('provider_orders.id', 'like', '%' . $request['search'] . '%')
                    ->orWhere('partner.foundstring', 'like', '%' . $request['search'] . '%')
                    ->orWhere('manager.foundstring', 'like', '%' . $request['search'] . '%');
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]),
                    Carbon::parse($request['dates'][1])]);
            })
            ->when($request['pay_status'] != null, function ($query) use ($request) {
                $query->where('pays', $request['pay_status']);
            })
            ->when($request['entrance_status'] != null, function ($query) use ($request) {
                $query->where('incomes', $request['entrance_status']);
            })
            ->where('provider_orders.company_id', Auth::user()->company_id)
            ->orderBy($field, $dir)
            ->paginate($size);

        return $provider_orders;
    }
}
