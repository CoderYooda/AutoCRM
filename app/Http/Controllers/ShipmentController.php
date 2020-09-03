<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentsRequest;
use App\Models\ClientOrder;
use App\Models\Entrance;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Article;
use App\Http\Controllers\UserActionsController as UA;

class ShipmentController extends Controller
{
    public static function shipmentDialog(Request $request)
    {
        $clientorder = null;
        if($request->clientorder_id) {
            $clientorder = ClientOrder::find((int)$request->clientorder_id);
            if(!$clientorder){
                return response()->json(['type' => 'error', 'message' => 'ошибка зависимости заказа',], 200);
            }
        }

        $preselect_articles = $clientorder ? $clientorder->notShippedArticles : null;
        if($preselect_articles != null){
            foreach ($preselect_articles as $article){
                $article->count = $clientorder->getAvailableToShippingArticlesCount($article->id);
            }
        }

        $shipment = Shipment::with('articles')->find($request->shipment_id);

        $tag = 'shipmentDialog' . ($shipment->id ?? '');

        if($clientorder) {
            $shipment = new Shipment();
            $shipment->id = null;
            $shipment->partner = $clientorder->partner;
            $shipment->clientorder_id = $clientorder->id;
            $shipment->articles = $clientorder->articles;

            $itogo = 0;

            foreach($shipment->articles as $article){
                $article->price = $article->pivot->price;
                $article->count = $article->pivot->count;
                $article->total = $article->pivot->total;

                $itogo += $article->total;
            }

            $shipment->summ = $shipment->itogo = $itogo;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.shipments.dialog.form_shipment', compact( 'shipment','request'))
                ->render()
        ]);
    }

    public static function selectShipmentDialog($request)
    {
        return self::selectShipmentInner($request);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectShipmentInner($request);
    }

    private static function selectShipmentInner($request)
    {
        $class = 'selectShipmentDialog';
        $shipments = Shipment::with('articles')->where('company_id', Auth::user()->company->id)
            ->when(isset($request['string']), function ($q) use ($request) {
                $q->where('foundstring', 'LIKE', '%' . str_replace(["-","!","?",".", ""],  "", trim($request['string'])) . '%');
            })
            ->when(isset($request['hide_paid']), function ($q) {
                $q->whereRaw('wsumm = itogo');

                $q->whereHas('articles', function (Builder $query) {
                    $query->whereRaw('refunded_count < count');
                });
            })
            ->orderBy('created_at', 'DESC')
            ->limit(30)
            ->get();

        $view = $request['inner'] ? 'select_shipment_inner' : 'select_shipment';

        $content = view(get_template() . '.shipments.dialog.' . $view, compact('shipments','class', 'request'))->render();
        return response()->json([
            'tag' => 'selectShipmentDialog',
            'html' => $content
        ]);
    }

    public function select(Shipment $shipment, Request $request)
    {
        $products = $shipment->load('refunds', 'refunds.articles')->notRefundedArticles()->get();

        $refunded_count = [];

        foreach ($shipment->refunds as $refund) {

            foreach ($refund->articles as $product) {
                $refunded_count[$product->id] = $product->count;
            }
        }

        if(!$shipment){
            return response()->json([
                'message' => 'Продажа не найдена, возможно она была удалёна',
            ], 422);
        }

        return response()->json([
            'id' => $shipment->id,
            'items_html' => view(get_template() . '.refund.dialog.products_element', compact('products', 'shipment', 'refunded_count', 'request'))->render(),
            'items' => $products,
            'partner' => $shipment->partner->outputName(),
            'balance' => $shipment->partner->balance,
            'name' => $shipment->outputName()
        ]);
    }

    public function getSideInfo(Request $request)
    {
        $shipment = Shipment::find($request['id']);
        $partner = $shipment->partner;
        $comment = $shipment->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(get_template() . '.shipments.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function tableData(Request $request)
    {
        $shipments = ShipmentController::getShipments($request);

        return response()->json(['data' => $shipments]);
    }

    public function fresh(Shipment $shipment, Request $request)
    {
        $request['fresh'] = true;
        $request['refer'] = is_array($request['refer'] ) ? null : $request['refer'];
        $class = 'shipmentDialog' . $shipment->id;
        $inner = true;
        $content = view(get_template() . '.shipments.dialog.form_shipment', compact( 'shipment', 'class', 'inner', 'request'))
            ->render();

        return response()->json([
            'html' => $content,
            'target' => 'shipmentDialog' . $shipment->id
        ], 200);
    }

    public function store(ShipmentsRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать продажи' : 'Создавать продажи');

        DB::beginTransaction();

        try {
            $request['inpercents'] = !($request['inpercents'] === null || $request['inpercents'] === false || $request['inpercents'] === 0 || $request['inpercents'] === '0');

            if ($request['inpercents']) {
                if ((int)$request['discount'] > 100) {
                    $request['discount'] = 100;
                }
                if ((int)$request['discount'] <= 0) {
                    $request['discount'] = 0;
                }
            }

            $shipment = Shipment::firstOrNew(['id' => $request['id']]);

            #Проверка наличия данного количества на складе
            $products = Article::whereIn('id', array_keys($request['products']))->get();

            $errors = [];

            foreach ($products as $product) {

                $count = $request['products'][$product->id]['count'];
                $shipment_count = $shipment->articles->find($product->id)->count ?? 0;

                if ($product->getEntrancesCount($count) < ($count - $shipment_count)) {
                    $name = 'products.' . $product->id . '.count';

                    $errors[$name] = ['В наличии нет такого количества.'];
                }
            }

            if (count($errors)) {
                return response()->json([
                    'messages' => $errors
                ], 422);
            }

            if ($shipment->exists) {
                $this->message = 'Продажа обновлена';
                #Отнимаем с баланса контакта
                $shipment->partner->addition($shipment->itogo);
            } else {
                $shipment->company_id = Auth::user()->company->id;
                $shipment->manager_id = Auth::user()->partner->id;
                $this->message = 'Продажа сохранена';
            }

            $shipment->fill($request->only($shipment->fields));
            $shipment->summ = 0;
            $shipment->balance = 0;
            $shipment->itogo = 0;
            $shipment->save();

            UA::makeUserAction($shipment, $shipment->wasRecentlyCreated ? 'create' : 'store');
            ##########################################################################

            $store = $shipment->store;

            if (!$shipment->wasRecentlyCreated) {
                foreach ($shipment->articles as $article) {
                    if ($shipment->clientOrder) {
                        $shipment->clientOrder->decreaseShippedCount($article->id, $article->count);
                    }
                }
            }

            # Синхронизируем товары к складу
            if (count($request['products'])) {
                $store->articles()->syncWithoutDetaching(array_keys($request['products']), false);
            }

            if (count($shipment->articles)) {

                #Возвращаем товары в те поступления, с которых он был взят
                $return_products = DB::table('article_shipment')->where('shipment_id', $shipment->id)->get();

                foreach ($return_products as $product) {
                    Entrance::decrementReleasedCount($product->entrance_id, $product->article_id, $product->count);
                }

                #Очищаем article_shipment
                $shipment->articles()->sync([]);
            }

            foreach ($products as $product) {
                $count = $request['products'][$product->id]['count'];
                $price = $request['products'][$product->id]['price'];

                $entrances_id = $product->incrementToEntrance($count);

                if($shipment->clientOrder){
                    $shipment->clientOrder->increaseShippedCount($product->id, $count);
                }

                foreach ($entrances_id as $entrance_id => $entrance_count) {

                    $v_total = $price * $entrance_count;
                    $shipment->summ += $v_total;

                    DB::table('article_shipment')->updateOrInsert(['shipment_id' => $shipment->id, 'article_id' => $product->id, 'entrance_id' => $entrance_id], [
                        'count' => (int)$entrance_count,
                        'price' => (double)$price,
                        'total' => (double)$v_total,
                        'status' => 'given',
                    ]);
                }
            }

            if ($request['inpercents']) {
                $shipment->itogo = $shipment->summ - ($shipment->summ / 100 * $request['discount']);
            }
            else {
                if ($request['discount'] >= $shipment->summ) {
                    $request['discount'] = $shipment->summ;
                }
                $shipment->discount = $request['discount'];
                $shipment->itogo = $shipment->summ - $request['discount'];
            }

            #Добавляем к балансу контакта
            $shipment->partner->subtraction($shipment->itogo);

            $shipment->foundstring = str_replace(["-", "!", "?", ".", ""], "", trim($shipment->id . $shipment->partner->foundstring));

            if ($request['created_at']) {
                $shipment->created_at = $request['created_at'];
            }

            $shipment->save();

            if ($shipment->clientOrder) {
                foreach ($shipment->articles as $article) {
                    $shipment->clientOrder->increaseShippedCount($article->id, $article->count);
                }
            }
        }
        catch (\Exception $exception)
        {
            DB::rollBack();

            throw $exception;
        }

        DB::commit();

        #Перенос Warrant ов с заказа на продажу, если продажа следствие заказа клиента
        if($shipment->clientOrder){
            $warrants = $shipment->clientOrder->load('warrants')->warrants;
            foreach($warrants as $warrant){
                $warrant->reason = 'Оплата отгрузки по заказу №' . $shipment->clientOrder->id;
                $warrant->payable_type = get_class($shipment);
                $warrant->payable_type = get_class($shipment);
                $warrant->payable_id = $shipment->id;
                $warrant->save();
            }
        }
        #Конец перенос

        return response()->json([
            'message' => $this->message,
            'id' => $shipment->id,
            'event' => 'ShipmentStored',
        ], 200);
    }

    //TODO check
    public function getShipmentProducts(Shipment $shipment)
    {
        return response()->json(['products' => $shipment->getArticles()]);
    }

    public static function getShipments($request)
    {
        $size = isset($request['size']) ? $request['size'] : 30;

        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        return Shipment::select(DB::raw('
                shipments.*, shipments.created_at as date, IF(partners.type != 2, partners.fio,partners.companyName) as partner, CONCAT(shipments.discount, IF(shipments.inpercents = 1, \' %\',\' ₽\')) as discount, shipments.summ as price, shipments.itogo as total
            '))
                ->leftJoin('partners',  'partners.id', '=', 'shipments.partner_id')
                ->where('shipments.company_id', Auth::user()->company_id)
                ->when($request['client'] != null, function($query) use ($request) {
                    $query->whereIn('shipments.partner_id', $request['client']);
                })
                ->when($request['dates_range'] != null, function($query) use ($request) {
                    $query->whereBetween('shipments.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
                })
                ->orderBy($field, $dir)
                ->paginate($size);

//        select shipments.id, shipments.created_at, IF(partners.type != 2, partners.fio,partners.companyName) as partner, shipments.discount, shipments.summ as price, shipments.itogo as total
//        from shipments
//        left join `partners` on `partners`.`id` = `shipments`.`partner_id`
//        and `shipments`.`company_id` = 2
//        group by `shipments`.`id`
//        order by `created_at` desc
    }

    public function events(Request $request)
    {
        $client_orders = Shipment::where(function(Builder $q) use ($request) {
                if(isset($request['start']) && $request['start'] != 'null' && $request['start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['start']));
                }
                if(isset($request['end']) && $request['end'] != 'null' && $request['end'] != ''){
                    $q->where('do_date', '<=', Carbon::parse($request['end']));
                }
            })
            ->get();

        $events = [];

        foreach($client_orders as $order) {
            $events[] = [
                'title' => 'Продажа №' . $order->id,
                'start' => $order->do_date,
                'end' => $order->do_date,
                'color' =>'#4caf50',
                'extendedProps' => [
                    'modal' => 'shipmentDialog',
                    'alias' => 'shipment_id',
                    'id' => $order->id
                ]
            ];
        }

        return response($events);
    }
}
