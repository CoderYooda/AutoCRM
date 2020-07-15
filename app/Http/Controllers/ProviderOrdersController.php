<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProviderOrdersRequest;
use App\Models\Partner;
use App\Models\ProviderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Article;
use App\Http\Controllers\UserActionsController as UA;
use App\Models\Store;
use Illuminate\Support\Facades\Gate;
use Auth;

class ProviderOrdersController extends Controller
{
    public static function providerorderDialog($request)
    {
        $tag = 'providerorderDialog';

        if($request['provider_order_id'] || $request['providerorder_id']){
            $po_id = isset($request['provider_order_id']) ? $request['provider_order_id'] : $request['providerorder_id'];
            $provider_order = ProviderOrder::where('id', (int)$po_id)->first();
            $tag .= $provider_order->id;
        } else {
            $provider_order = null;
        }

        $stores = Store::owned()->get();

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.provider_orders.dialog.form_provider_order', compact( 'provider_order', 'stores',  'request'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $providerorders = ProviderOrdersController::getPoviderOrders($request);

        return response()->json(['data' => $providerorders]);
    }

    public static function selectProviderOrderDialog($request)
    {
        $providerorders = ProviderOrder::owned()->orderBy('created_at', 'DESC')->limit(25)->get();
        return response()->json([
            'tag' => 'selectProviderOrderDialog',
            'html' => view(env('DEFAULT_THEME', 'classic') . '.provider_orders.dialog.select_providerorder', compact('providerorders',  'request'))->render(),
        ]);
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

    public function select($id)
    {
        $providerorder = ProviderOrder::owned()->where('id', $id)->first();
        if(!$providerorder){
            return response()->json([
                'message' => 'Заявка клиента не найдена, возможно она была удалёна',
            ], 422);
        }
        $request = request();
        return response()->json([
            'id' => $providerorder->id,
            'items_html' => view(env('DEFAULT_THEME', 'classic') . '.entrance.dialog.products_element', compact('providerorder', 'request'))->render(),
            'info' => view(env('DEFAULT_THEME', 'classic') . '.provider_orders.contact-card', compact( 'providerorder','request'))->render(),
            'name' => $providerorder->outputName()
        ]);
    }

    public function dialogSearch(Request $request)
    {
        $providerorders = ProviderOrder::owned()
            ->where(function($q) use ($request){
                $q->where('name', 'LIKE', '%' . $request['string'] .'%');
                $q->orWhere('article', 'LIKE', '%' . $request['string'] .'%');
                $q->orWhereHas('supplier', function ($query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request['string'] .'%');
                });
            })
            ->orderBy('id', 'DESC')->limit(10)->get();

        $content = view('provider_orders.dialog.select_providerorder_inner', compact('providerorders', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

    public function loadItems($id, Request $request){
        $providerorder = ProviderOrder::owned()->where('id', $id)->first();
        return response()->json([
            'html' => view('provider_orders.dialog.select_providerorder_items', compact( 'providerorder',  'request'))->render()
        ]);
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять заявки поставщикам');
        $returnIds = null;
        if($id == 'array'){
            $provider_orders = ProviderOrder::whereIn('id', $request['ids']);
            $this->message = 'Заказы поставщику удалены';
            $returnIds = $provider_orders->get()->pluck('id');
            foreach($provider_orders->get() as $provider_order){
                if($provider_order->entrances()->count() > 0){
                    return response()->json([
                        'type' => 'error',
                        'message' => 'Заявка не может быть удалена, имеются поступившие товары'
                    ], 200);
                } else {
                    if($provider_order->delete()){
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
            if($provider_order->entrances()->count() > 0){
                return response()->json([
                    'type' => 'error',
                    'message' => 'Заявка не может быть удалена, имеются поступившие товары'
                ], 200);
            } else{
                if($provider_order->delete()){
                    #Отнимаем с баланса контакта
                    $provider_order->partner()->first()->subtraction($provider_order->itogo);
                    UA::makeUserAction($provider_order, 'delete');
                }
            }
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], 200);
    }

    public function fresh($id, Request $request)
    {
        $provider_order = ProviderOrder::where('id', (int)$id)->first();

        $provider_order->articles = $provider_order->articles()->get();

        foreach($provider_order->articles as $article){
            $article->instock = $article->getCountInStoreId($provider_order->store_id);
            if($article->instock >= $article->count){
                $article->complited = true;
            } else {
                $article->complited = false;
            }
        }
        $total_complited = true;

        foreach($provider_order->articles as $article){
            if(!$article->complited){
                $total_complited = false;
            }
        }

        $provider_order->total_complited = $total_complited;

        $request['fresh'] = true;
        $class = 'providerorderDialog' . $id;
        $inner = true;
        $content = view(env('DEFAULT_THEME', 'classic') . '.provider_orders.dialog.form_provider_order', compact( 'provider_order', 'class', 'request', 'inner'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'providerorderDialog' . $id,
        ], 200);
    }

    public function store(ProviderOrdersRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать заявки поставщикам' : 'Создавать заявки поставщикам');

        $provider_order = ProviderOrder::firstOrNew(['id' => $request['id']]);

        $request['do_date'] = Carbon::now();

        if($provider_order->exists){
            $store = Store::owned()->where('id', $request['store_id'])->first();

            if($store->id !== $provider_order->store()->first()->id){
                foreach($provider_order->entrances()->get() as $entrance){
                    $entrance->migrateInStore($provider_order->store()->first(), $store);
                }
            }

            #Отнимаем с баланса контакта
            $provider_order->partner()->first()->subtraction($provider_order->itogo);

            $this->message = 'Заказ поставщику обновлен';

            $wasExisted = true;
        } else {
            $provider_order->company_id = Auth::user()->company()->first()->id;
            $provider_order->manager_id = Auth::user()->partner()->first()->id;
            $this->message = 'Заказ поставщику сохранен';
            $wasExisted = false;
        }
        $provider_order->fill($request->only($provider_order->fields));
        $provider_order->summ = 0;
        $provider_order->balance = 0;
        $provider_order->itogo = 0;
        $provider_order->save();

        UA::makeUserAction($provider_order, $wasExisted ? 'fresh' : 'create');

        $provider_order_pivot_data = [];

        $errors = [];

        foreach($request['products'] as $id => $product) {

            $vcount = $product['count'];

            $entred_count = $provider_order->getArticleEntredCount($id);

            if($entred_count > $vcount){
                $errors['products.' . $id . '.count'] = 'Кол-во в заявке не может быть меньше чем поступивших товаров.';
            }

            $vprice = $product['price'];

            $vtotal = $vprice * $vcount;

            $provider_order->summ += $vtotal;
            //$actor_product = Article::where('id', $product['id'])->first();

            //$article_provider_order = $provider_order->articles()->where('article_id', $product['id'])->count();

            ### Пересчёт кол-ва с учетом предидущего поступления #######################################
            #$store->articles()->syncWithoutDetaching($actor_product->id);
            #$beforeCount = $entrance->getArticlesCountById($actor_product->id);
            #$count = (int)$store->getArticlesCountById($actor_product->id) - (int)$beforeCount + (int)$vcount;
            #$count - Текущее кол-во на складе в наличии
            #############################################################################################

            $pivot_data = self::calculatePivotArticleProviderOrder($request, $product);

            $provider_order_pivot_data[$id] = $pivot_data;

//            if($article_provider_order > 0){
//                $provider_order->articles()->updateExistingPivot($product['id'], $pivot_data);
//            } else {
//                $provider_order->articles()->save($actor_product, $pivot_data);
//            }

            foreach($provider_order->entrances()->get() as $entrance){
                $entrance->freshPriceByArticleId($product['id'], $vprice);
            }

            $store = Store::where('id', $request['store_id'])->first();
//            $store->recalculateMidprice($product['id']);

        }
        $provider_order->freshWsumm();


        if(count($errors) > 0){
            if($request->expectsJson()){
                return response()->json(['messages' => $errors], 422);
            }
        }

        # Синхронизируем товары к заявке
        $provider_order->articles()->sync($provider_order_pivot_data);

        if($request['inpercents']){
            $provider_order->itogo = $provider_order->summ - ($provider_order->summ / 100 * $request['discount']);
        } else {
            if($request['discount'] >= $provider_order->summ){
                $request['discount'] = $provider_order->summ;
            }
            if($request['discount'] <= 0){
                $request['discount'] = 0;
            }
            $provider_order->discount = $request['discount'];
            $provider_order->itogo = $provider_order->summ - $request['discount'];
        }

        #Добавляем к балансу контакта
        $provider_order->partner()->first()->addition($provider_order->itogo);

        $provider_order->summ = $provider_order->articles()->sum('total');

        $provider_order->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $provider_order->id,
                'event' => 'ProviderOrderStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getPartnerSideInfo(Request $request){

        $provider_order = ProviderOrder::owned()->where('id', $request['id'])->first();
        $partner = $provider_order->partner()->first();
        $comment = $provider_order->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(env('DEFAULT_THEME', 'classic') . '.provider.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getProviderOrderProducts($id){
        $provider_order = ProviderOrder::where('id', $id)->first();

        return response()->json([
            'products' => $provider_order->articles()->get()]);
    }

    public static function getPoviderOrders($request)
    {
        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';
        $size = $request['size'] ? (int)$request['size'] : 30;

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        $provider_orders = ProviderOrder::owned()->with('partner', 'manager')
            ->when(is_array($request['provider']), function($query) use ($request) {
                $query->whereHas('partner', function($query) use ($request){
                    $query->whereIn('id', $request['provider']);
                });
            })
            ->when(is_array($request['accountable']), function($query) use ($request) {
                $query->whereHas('manager', function($query) use ($request){
                    $query->whereIn('id', $request['accountable']);
                });
            })
            ->when($request['search'] != null, function($query) use ($request) {
                $query->where('id', 'like', '%'.$request['search'].'%')
                    ->orWhereHas('partner', function($query) use ($request){
                        $query->where('company_id', Auth::user()->company_id)
                            ->where(function($q) use ($request){
                                $q->where('fio', 'like', '%'.$request['search'].'%')
                                    ->orWhere('companyName', 'like', '%'.$request['search'].'%')
                                    ->orWhere('foundstring', 'like', '%'.$request['search'].'%');
                            });
                    });
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]),
                    Carbon::parse($request['dates'][1])]);
            })
            ->when($request['pay_status'] != null, function($query) use ($request) {
                $query->where('pays', $request['pay_status']);
            })
            ->when($request['entrance_status'] != null, function($query) use ($request) {
                $query->where('incomes', $request['entrance_status']);
            })
            ->orderBy($field, $dir)
            ->paginate($size);

        foreach ($provider_orders as $provider_order) {
            $provider_order['manager_name'] = $provider_order->manager->official_name;
            $provider_order['partner_name'] = $provider_order->partner->official_name;
        }

        return $provider_orders;
    }
}
