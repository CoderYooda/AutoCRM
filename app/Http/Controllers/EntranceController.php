<?php

namespace App\Http\Controllers;

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
use Illuminate\Support\Facades\Gate;
use Auth;

class EntranceController extends Controller
{
    public static function entranceDialog($request)
    {

        if($request['params'] && $request['entrance_id'] != null){
            $id = (int)$request['entrance_id'];
            $entrance = Entrance::where('id', $id)->first();
            $tag = 'entranceDialog'.$entrance->id;
        } else {
            $entrance = null;
            $tag = 'entranceDialog';
        }

        $stores = Store::owned()->get();

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.entrance.dialog.form_entrance', compact('entrance','stores', 'request'))->render()
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
            'products' => $entrance->articles()->get()]);
    }

    public function store(EntranceRequest $request)
    {
        PermissionController::canByPregMatch( 'Создавать поступления');

        $store = Store::find(session('store_id'));

        $providerorder = ProviderOrder::owned()->find($request['providerorder_id']);

        #проверка валидации
        $messages = [];

        foreach($request['products'] as $id => $product) {
            $entrance_count = $providerorder->getArticleEntredCount($id);
            $providers_count = $providerorder->getArticleCount($id);
            $form_count = (int)$product['count'];
            if($entrance_count + $form_count > $providers_count){
                $messages['products[' . $id . '][count]'][] = 'Кол-во не может быть больше чем в заявке поставщику';
            }
        }

        if(count($messages)){
            return response()->json(['messages' => $messages], 422);
        }

        $entrance = Entrance::create([
            'manager_id' => Auth::user()->partner->id,
            'partner_id' => $providerorder->partner->id,
            'company_id' => Auth::user()->company->id,
            'comment' => $request->comment,
            'providerorder_id' => $providerorder->id
        ]);

        foreach ($request->products as $product) {
            $price = $providerorder->articles->find($product['id'])->pivot->price;

            $entrance->articles()->attach($product['id'], [
                'store_id' => $providerorder->store_id,
                'company_id' => $entrance->company_id,
                'count' => $product['count'],
                'price' => $price,
            ]);

            $store->increaseArticleCount($product['id'], $product['count']);
            $store->recalculateMidprice($product['id']);
        }

        $product_ids = array_column($request->products, 'id');
        $store->articles()->syncWithoutDetaching($product_ids, false);

        #Обработка ответа
        $entrance->company_id = Auth::user()->company_id ?? 1;

        #Добавляем к балансу контакта
        $entrance->providerorder->partner->addition($entrance->totalPrice);
        UA::makeUserAction($entrance,'create');

        #Ответ сервера
        return response()->json([
            'message' => 'Поступление было успешно создано.',
            'id' => $entrance->id,
            'event' => 'EntranceStored',
        ], 200);
    }

    public function fresh($id, Request $request)
    {
        $entrance = Entrance::where('id', (int)$id)->first();
        $stores = Store::owned()->get();
        $request['fresh'] = true;
        $class = 'entranceDialog' . $id;
        $inner = true;
        $content = view(env('DEFAULT_THEME', 'classic') . '.entrance.dialog.form_entrance', compact( 'entrance', 'stores', 'class', 'inner', 'request'))
            ->render();

        return response()->json([
            'html' => $content,
            'target' => 'entranceDialog' . $id,
        ], 200);
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
        $products = null;

        if(!$entrance) {
            return response()->json([
                'message' => 'Поступление не найдено, возможно оно было удалёно',
            ], 422);
        }

        $view = null;

        if(strpos($request->refer, 'entranceRefundDialog') !== false) {

            $products = $entrance->articles;
            $entrance_refunded = $entrance->entrancerefunds->load('articles');

            $refunded_count = [];

            foreach ($entrance_refunded as $entrance_refund) {
                foreach ($entrance_refund->articles as $product) {
                    if(!isset($refunded_count[$product->id])) $refunded_count[$product->id] = 0;
                    $refunded_count[$product->id] += $product->pivot->count;
                }
            }

            $view = view(get_template() . '.entrance_refunds.dialog.products_element', compact('entrance', 'refunded_count', 'products', 'request'))->render();
        }

        return response()->json([
            'id' => $entrance->id,
            'items_html' => $view,
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
        $query = Entrance::with('partner')
            ->where('company_id', Auth::user()->company->id)
            ->when($request['string'], function (Builder $q) use ($request) {
                $q->where('id', 'LIKE', '%' . str_replace(["-","!","?",".", ""],  "", trim($request['string'])) . '%');
            })
            ->orderBy('created_at', 'DESC')
            ->limit(15);

        $entrances = $query->get();

        $view = $request['inner'] ? 'select_entrance_inner' : 'select_entrance';

        $content = view(get_template() . '.entrance.dialog.' . $view, compact('entrances','class', 'request'))->render();
        return response()->json([
            'tag' => 'selectEntranceDialog',
            'html' => $content
        ]);
    }

    public static function getEntrances($request){

        $size = 30;
        if(isset($request['size'])){
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        if($field === null &&  $dir === null){
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        if($request['accountable'] == null){
            $request['accountable'] = [];
        }

        $entrances = Entrance::select(DB::raw('
            entrances.*, entrances.created_at as date, IF(partners.type != 2, partners.fio, partners.companyName) as partner, provider_orders.id as ordid
        '))
            ->from(DB::raw('(
            SELECT entrances.*, IF(partners.type != 2, partners.fio, partners.companyName) as manager
            FROM entrances
            left join partners on partners.id = entrances.partner_id
            GROUP BY entrances.id)
             entrances
        '))

            ->leftJoin('provider_orders',  'provider_orders.id', '=', 'entrances.providerorder_id')
            ->leftJoin('partners',  'partners.id', '=', 'provider_orders.partner_id')
            ->when($request['provider'] != [], function($query) use ($request) {
                $query->whereHas('providerorder', function($query) use ($request){
                    $query->whereIn('partner_id', $request['provider']);
                });
            })
            ->when($request['accountable'] != [], function($query) use ($request) {
                $query->whereIn('entrances.partner_id', $request['accountable']);
            })
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('entrances.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->where('entrances.company_id', Auth::user()->company()->first()->id)
            ->groupBy('entrances.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);
            return $entrances;

    }

    public function getPartnerSideInfo(Request $request){

        $entrance = Entrance::owned()->where('id', $request['id'])->first();
        $provider_order = $entrance->providerorder()->first();
        $partner = $provider_order->partner()->first();
        $comment = $entrance->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(env('DEFAULT_THEME', 'classic') . '.entrance.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact( 'comment','request'))->render(),
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

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch( $request['id'] ? 'Редактировать поступления' : 'Создавать поступления');

        if(!Gate::allows('Удалять поступления')){
            return PermissionController::closedResponse('Вам запрещено это действие.');
        }
        $returnIds = null;

        if($id == 'array'){
            $entrances = Entrance::whereIn('id', $request['ids']);
            $this->message = 'Поступления удалены';
            $returnIds = $entrances->get()->pluck('id');
            foreach($entrances->get() as $entrance){
                $store = $entrance->providerorder()->first()->store()->first();
                foreach($entrance->articles()->get() as $article){
                    $store->decreaseArticleCount($article->id, $entrance->getArticlesCountById($article->id));
                }

                $entrance->articles()->sync(null);

                $entrance->delete();
                UA::makeUserAction($entrance, 'delete');
            }
        } else {
            $entrance = Entrance::where('id', $id)->first();
            # Склад с которым оперируем
            $store = $entrance->providerorder()->first()->store()->first();
            foreach($entrance->articles()->get() as $article){
                $store->decreaseArticleCount($article->id, $entrance->getArticlesCountById($article->id));
            }
            $returnIds = $entrance->id;
            $entrance->articles()->sync(null);

            $entrance->delete();
            UA::makeUserAction($entrance, 'delete');
            $this->status = 200;
            $this->message = 'Поступление удалено';
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], 200);


    }
}
