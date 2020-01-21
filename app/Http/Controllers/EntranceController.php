<?php

namespace App\Http\Controllers;

use App\Models\ProviderOrder;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Entrance;
use Carbon\Carbon;
use App\Models\ArticleStock;
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
        $entrances = EntranceController::getEntrances($request);
        foreach($entrances as $entrance){
            $entrance->date = $entrance->created_at->format('Y.m.d/H:i');
        }
        return response()->json($entrances);
    }

    public function getEntranceProducts($id){
        $entrance = Entrance::where('id', $id)->first();

        return response()->json([
            'products' => $entrance->articles()->get()]);
    }

    public function store(Request $request){

        $entrance = Entrance::firstOrNew(['id' => $request['id']]);

        if($entrance->locked){
            return response()->json([
                'system_message' => view('messages.locked_error')->render(),
            ], 422);
        }

        $validation = Validator::make($request->all(), self::validateRules());

        #Подготовка Request`a
//            if($request['nds'] === null){$request['nds'] = false;}
//            if($request['nds_included'] === null){$request['nds_included'] = false;}
//            if($request['locked'] === null){$request['locked'] = false;}

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }


        # Склад с которым оперируем
        if(isset($entranceWasExisted) && $entranceWasExisted) {
            $store = $entrance->providerorder()->first()->store()->first();
        } else {
            $store = Auth::user()->getStoreFirst();
        }


        $messages = [];
        foreach($request['products'] as $id => $product) {

            $providerorder_id = $request['providerorder_id'];
            $providerorder = ProviderOrder::owned()->where('id', $providerorder_id)->first();
            $entrance_count = $providerorder->getArticleEntredCount($id, $entrance->id);
            $providers_count = $providerorder->getArticleCount($product['id']);
            $form_count = (int)$product['count'];

            if($entrance_count + $form_count > $providers_count){
                $messages['products[' . $id . '][count]'][] = 'Кол-во не может быть больше чем в заявке';
            }

            #Что то не понятно как дальше
//            for ($i = 0; $i <= (int)$product['count']; $i++) {
//                ArticleStock::loadProductToStore($product['id'], $store->id, $product['price']);
//            }

        }

        if(count($messages) > 0){
            return response()->json(['messages' => $messages], 422);
        }

        if($entrance->exists) {

            #Прибавляем к балансу предидущего партнера
            $entrance->providerorder()->first()->partner()->first()
                ->subtraction($entrance->totalPrice);

            //$old_store_id = $entrance->store_id;
            $entranceWasExisted = true;
            $request['partner_id'] = $entrance->partner()->first()->id;
        } else {
            $entranceWasExisted = false;
            $request['partner_id'] = Auth::user()->partner()->first()->id;
        }
        # Предварительно сохраняем поступление
            $entrance->fill($request->only($entrance->fields));
            //$entrance->totalPrice = 0;
            $entrance->company_id = Auth::user()->company()->first()->id;
            $entrance->partner_id = Auth::user()->partner()->first()->id;
            $entrance->save();




        # Исходные состояния товаров к поступлению до операции
            $previous_article_entrance = $entrance->articles()->get();

        # Собираем товары в массив id шников из Request`a
            $plucked_articles = [];
            foreach($request['products'] as $id => $product) {
                $plucked_articles[] = $id;
            }

        # Синхронизируем товары к складу
        //dd(Store::owned()->where('id', Auth::user()->getStoreFirst()->store_id)->first());

        $store->articles()->syncWithoutDetaching($plucked_articles, false);

        if(isset($entranceWasExisted) && $entranceWasExisted) {
            # Исходные состояния товаров к складу из поступления
                $previous_article_store = $store->articles()
                    ->whereIn('article_id', $previous_article_entrance
                        ->pluck('id')
                        )->get();
            # Отнимаем со склада все изначальные товары
                foreach($previous_article_store as $article){
                    $store->decreaseArticleCount($article->id, $entrance->getArticlesCountById($article->id));
                }
        }


        $article_entrance_pivot_data = [];
        foreach($request['products'] as $id => $product) {
            $article_entrance_pivot_data[$id] = self::calculatePivotArticleEntrance($request, $store, $product);
        }

        # Синхронизируем товары к поступлению
            $entrance->articles()->sync($article_entrance_pivot_data, true);

        #Обработка ответа
            if(isset($entranceWasExisted) && $entranceWasExisted) {
                $this->message = 'Поступление обновлено';
            } else {
                if(Auth::user() != null){ // Проверка для сидирования
                    $entrance->company_id = Auth::user()->company()->first()->id;
                } else {
                    $entrance->company_id = 1;
                }
                $this->message = 'Поступление сохранено';
            }

        #Сохраняем поступление
            $entrance->fill($request->only($entrance->fields));
            //$entrance->totalPrice = $entrance->articles()->sum('total');
            $entrance->save(); 

        #Если указана дата - сохраняем
            if($request['do_date'] != NULL){
                $entrance->created_at = $request['do_date'];
                $entrance->save();
            }

        #Добавляем на склад все товары из поступления
            foreach($entrance->articles()->get() as $article){
                $store->increaseArticleCount($article->id, $article->pivot->count);
                $store->recalculateMidprice($article->id);
            }

        #Добавляем к балансу контрагента
        $entrance->providerorder()->first()->partner()->first()
            ->addition($entrance->totalPrice);

        #Ответ сервера
            if($request->expectsJson()){
                return response()->json([
                    'message' => $this->message,
                    'id' => $entrance->id,
                    'event' => 'EntranceStored',
                ], 200);
            } else {
                return redirect()->back();
            }
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
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }
        if($field === null &&  $dir === null){
            $field = 'id';
            $dir = 'ASC';
        }

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        if($request['accountable'] == null){
            $request['accountable'] = [];
        }

        $entrances = Entrance::select(DB::raw('
            entrances.*, entrances.created_at as date, IF(partners.isfl = 1, partners.fio, partners.companyName) as partner, provider_orders.id as ordid
        '))
            ->from(DB::raw('(
            SELECT entrances.*, IF(partners.isfl = 1, partners.fio, partners.companyName) as manager
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

    private static function validateRules()
    {
        $rules = [
            'providerorder_id' => ['required', 'exists:provider_orders,id'],
//            'store_id' => ['required', 'exists:stores,id'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
        ];
        return $rules;
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
            $this->status = 200;
            $this->message = 'Поступление удалено';
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], 200);


    }
}
