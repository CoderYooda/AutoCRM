<?php

namespace App\Http\Controllers;

use App\Events\EntranceWasSaved;
use App\Events\ModelWasStored;
use App\Events\RecalculateEntranceAvailableCount;
use App\Http\Requests\EntranceRequest;
use App\Models\EntranceRefund;
use App\Models\ProviderOrder;
use App\Models\Store;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Entrance;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use App\Models\ArticleStock;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Auth;

class EntranceController extends Controller
{
    public static function entranceDialog(Request $request)
    {
        $entrance = Entrance::find($request['entrance_id']);
        $class = 'entranceDialog' . ($entrance->id ?? '');

        /** @var ProviderOrder $providerorder */
        $providerorder = $entrance->providerorder ?? null;

        $items = $entrance ? $entrance->products->toArray() : [];

        foreach ($items as $key => $item) {
            $items[$key]['product_id'] = $item['id'];
            $items[$key]['pivot_id'] = $item['pivot']['id'];
            $items[$key]['price'] = $item['pivot']['price'];
            $items[$key]['entered_count'] = $providerorder->getArticleEnteredCountByPivotId($item['pivot']['provider_pivot_id'] ?? $item['pivot']['id']);
            $items[$key]['total_count'] = $providerorder->getArticleCountByPivotId($item['pivot']['provider_pivot_id'] ?? $item['pivot']['id']);
            $items[$key]['count'] = $providerorder ? $item['pivot']['count'] : ($item['total_count'] - $item['entered_count']);
        }

        $prefs = [
            'use_nds' => false,
            'can_add_items' => false,
            'nds' => 0,
            'freeze' => $entrance ? true : false,
            'nds_included' => false
        ];

        $view = view(get_template() . '.entrance.dialog.form_entrance', compact('entrance', 'providerorder', 'request', 'class'))
            ->with('items', json_encode($items))
            ->with('prefs', json_encode($prefs));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $entrances = self::getEntrances($request);

        return response()->json(['data' => $entrances]);
    }

    public function getEntranceProducts($id){
        $entrance = Entrance::where('id', $id)->first();

        return response()->json([
            'products' => $entrance->products()->get()]);
    }

    public function store(EntranceRequest $request)
    {
        PermissionController::canByPregMatch( 'Создавать поступления');

        return DB::transaction(function () use($request) {
            $user = Auth::user();

            $providerorder = ProviderOrder::find($request['providerorder_id']);

            //Проверка валидации
            $messages = [];

            $providerPivotProducts = DB::table('article_provider_orders')->whereIn('id', array_column($request->products, 'pivot_id'))->get();

            foreach($request['products'] as $index => $product) {

                $pivot_id = $product['pivot_id'];

                $entrance_count = ProviderOrder::getEnteredProductCountByProviderId($pivot_id);

                $provider_count = (int)$providerPivotProducts->where('id', $pivot_id)->first()->count;

                $form_count = (int)$product['count'];

                if($entrance_count + $form_count > $provider_count){
                    $messages['products[' . $index . '][count]'][] = 'Кол-во не может быть больше чем в заявке поставщику';
                }
            }

            if(count($messages)){
                return response()->json(['messages' => $messages], 422);
            }

            $entrance = Entrance::create([
                'manager_id' => $user->partner->id,
                'partner_id' => $providerorder->partner->id,
                'company_id' => $user->company_id,
                'comment' => $request->comment,
                'providerorder_id' => $providerorder->id,
                'invoice' => $request->invoice
            ]);

            $totalPrice = 0;

            foreach ($request->products as $index => $product) {

                $pivot_id = $product['pivot_id'];

                $price = $providerorder->products->find($product['product_id'])->pivot->price;

                $entrance->products()->attach($product['product_id'], [
                    'store_id' => $user->current_store,
                    'company_id' => $entrance->company_id,
                    'count' => $product['count'],
                    'price' => $price,
                    'provider_pivot_id' => $pivot_id
                ]);

                $totalPrice += $product['count'] * $price;
            }

            #Добавляем к балансу контакта
            $entrance->providerorder->partner->addition($totalPrice);
            UA::makeUserAction($entrance,'create');

            $entrance->providerorder->updateIncomeStatus();

            event(new ModelWasStored($entrance->company_id, 'EntranceStored'));

            #Ответ сервера
            return response()->json([
                'message' => 'Поступление было успешно создано.',
                'id' => $entrance->id,
            ], 200);
        });
    }

    public function fresh(Entrance $entrance, Request $request)
    {
        $request['inner'] = 1;
        $request['entrance_id'] = $entrance->id;

        return self::entranceDialog($request);
    }

    private static function calculatePivotArticleEntrance($request, $store, $product){
        ### Рассчет товара для поступления ##########################
        $data = [];

        $vcount = $product['count'];
        //$vprice = $product['price'];

        //$vtotal = $vprice * $vcount;
        $vnds = 0.00;

        $data = [
            'store_id' => $store->id,
            'count' => $product['count'],
            'price' => $product['price'],
            'company_id' => Auth::user()->company()->first()->id,
            //'total' => $vtotal,
        ];
        return $data;
    }

    public function select(Entrance $entrance, Request $request)
    {
        $products = [];

        if(!$entrance) {
            return response()->json([
                'message' => 'Поступление не найдено, возможно оно было удалёно',
            ], 422);
        }

        $view = null;

        if(strpos($request->refer, 'entranceRefundDialog') !== false) {

            $products = $entrance->products;
            $entrance_refunded = $entrance->entrancerefunds->load('products');

            $available_count = [];

            foreach ($entrance->products as $product) {
                $available_count[$product->id] = $product->pivot->count - $product->pivot->released_count;
            }

            foreach ($entrance_refunded as $entrance_refund) {
                foreach ($entrance_refund->products as $product) {
                    $available_count[$product->id] -= $product->pivot->count;
                }
            }

            foreach ($products as $key => $product) {
                $products[$key]['pivot_id'] = $product['pivot']['id'];
                $products[$key]['product_id'] = $product['id'];
                $products[$key]['price'] = $product['pivot']['price'];
                $products[$key]['count'] = $product['pivot']['count'];
                $products[$key]['released_count'] = $product['pivot']['released_count'];
                $products[$key]['provider_pivot_id'] = $product['pivot']['provider_pivot_id'];
            }
        }

        return response()->json([
            'id' => $entrance->id,
            'items' => $products,
            'partner' => $entrance->partner->outputName(),
            'partner_id' => $entrance->partner->id,
            'balance' => $entrance->partner->balance,
            'name' => $entrance->outputName()
        ]);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectEntranceDialog($request);
    }

    public static function selectEntranceDialog(Request $request)
    {
        $class = 'selectEntranceDialog';
        $query = Entrance::with('partner', 'products', 'entrancerefunds', 'entrancerefunds.products')
            ->where('company_id', Auth::user()->company->id)
            ->when($request['string'], function (Builder $q) use ($request) {
                $q->where('id', 'LIKE', '%' . str_replace(["-","!","?",".", ""],  "", trim($request['string'])) . '%');
            })
            ->whereHas('products', function (Builder $query) {
                $query->whereRaw('released_count < count');
            })
            ->orderBy('created_at', 'DESC')
            ->limit(15);

        $entrances = $query->get();

        foreach ($entrances as $key => $entrance) {
            $refunded_count = 0;

            $entrance_refunded = $entrance->entrancerefunds;

            foreach ($entrance_refunded as $entrance_refund) {
                foreach ($entrance_refund->products as $product) {
                    $refunded_count += $product->pivot->count;
                }
            }

            if($refunded_count == $entrance->products->sum('pivot.count')) unset($entrances[$key]);
        }

        $view = $request['inner'] ? 'select_entrance_inner' : 'select_entrance';

        $content = view(get_template() . '.entrance.dialog.' . $view, compact('entrances','class', 'request'))->render();
        return response()->json([
            'tag' => 'selectEntranceDialog',
            'html' => $content
        ]);
    }

    public static function getEntrances($request)
    {
        if($request['dates_range']) {

            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';
        $size = $request['size'] ? (int)$request['size'] : 30;

        $entrances = Entrance::with('partner', 'manager')
            ->where('company_id', Auth::user()->company_id)
            ->when($request['provider'] != [], function($query) use ($request) {
                $query->whereHas('providerorder', function($query) use ($request) {
                    $query->where('company_id', Auth::user()->company_id)
                        ->whereIn('partner_id', $request['provider']);
                });
            })
            ->when($request['accountable'] != [], function($query) use ($request) {
                $query->whereIn('partner_id', $request['accountable']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->when($request['search'], function ($query) use($request) {
                $query->where(function ($query) use($request) {
                    $query->where('entrances.id', 'like', "%{$request->search}%")
                        ->orWhereHas('partner', function ($query) use($request) {
                            $query->where('company_id', Auth::user()->company_id)
                                ->where('foundstring', 'like', "%{$request->search}%");
                        })
                        ->orWhereHas('manager', function ($query) use($request) {
                            $query->where('company_id', Auth::user()->company_id)
                                ->where('foundstring', 'like', "%{$request->search}%");
                        })
                        ->orWhereHas('providerorder', function($query) use ($request) {
                            $query->where('company_id', Auth::user()->company_id)
                                ->where('id', 'like', "%{$request->search}%");
                        });
                });
            })
            ->groupBy('id')
            ->orderBy($field, $dir)
            ->paginate($size);

        foreach ($entrances as $index => $entrance) {
            $entrances[$index]['partner_name'] = $entrance->partner->official_name;
            $entrances[$index]['manager_name'] = $entrance->manager->official_name;
        }

        return $entrances;

    }

    public function getPartnerSideInfo(Request $request){

        $entrance = Entrance::owned()->where('id', $request['id'])->first();
        $provider_order = $entrance->providerorder()->first();
        $partner = $provider_order->partner()->first();
        $comment = $entrance->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(get_template() . '.entrance.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function events(Request $request){
        $entrances = Entrance::owned()
            ->where(function($q) use ($request){
                if(isset($request['start']) && $request['start'] != 'null' && $request['start'] != ''){
                    $q->where('created_at',  '>=',  Carbon::parse($request['start']));
                }
                if(isset($request['end']) && $request['end'] != 'null' && $request['end'] != ''){
                    $q->where('created_at', '<=', Carbon::parse($request['end']));
                }
            })->get();
        $events = [];
        foreach($entrances as $entrance){
            $events[] = [
                'title' => 'Поступление #' . $entrance->id,
                'start' => $entrance->created_at,
                'end' => $entrance->created_at,
                'color' => '#00bcd4',
                'extendedProps' => [
                    'modal' => 'entranceDialog',
                    'alias' => 'entrance_id',
                    'id' => $entrance->id
                ]
            ];
        }
        return response($events);
    }
}
