<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Entrance;
use Carbon\Carbon;
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

        $stores = Store::where('company_id', Auth::user()->id)->get();
        return response()->json([
            'tag' => $tag,
            'html' => view('entrance.dialog.form_entrance', compact('entrance','stores', 'request'))->render()
        ]);
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
            if($request['nds'] === null){$request['nds'] = false;}
            if($request['nds_included'] === null){$request['nds_included'] = false;}
            if($request['locked'] === null){$request['locked'] = false;}

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($entrance->exists) {

            #Прибавляем к балансу предидущего партнера
            $entrance->partner()->first()
                ->subtraction($entrance->totalPrice);

            $old_store_id = $entrance->store_id;
            $entranceWasExisted = true;
        }

        # Предварительно сохраняем поступление
            $entrance->fill($request->only($entrance->fields));
            $entrance->totalPrice = 0;
            $entrance->company_id = Auth::user()->company()->first()->id;
            $entrance->save();

        # Склад с которым оперируем
            if(isset($entranceWasExisted) && $entranceWasExisted) {
                $store = Store::owned()->where('id', $old_store_id)->first();
            } else {
                $store = Store::owned()->where('id', $request['store_id'])->first();
            }

        # Исходные состояния товаров к поступлению до операции
            $previous_article_entrance = $entrance->articles()->get();

        # Собираем товары в массив id шников из Request`a
            $plucked_articles = [];
            foreach($request['products'] as $id => $product) {
                $plucked_articles[] = $id;
            }

        # Синхронизируем товары к складу
            Store::owned()->where('id', $request['store_id'])->first()
                ->articles()->syncWithoutDetaching($plucked_articles, false);

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
            $entrance->totalPrice = $entrance->articles()->sum('total');
            $entrance->save();

        #Если указана дата - сохраняем
            if($request['do_date'] != NULL){
                $entrance->created_at = $request['do_date'];
                $entrance->save();
            }

        #Добавляем на склад все товары из поступления
            foreach($entrance->articles()->get() as $article){
                Store::owned()->where('id', $request['store_id'])->first()
                    ->increaseArticleCount($article->id, $article->pivot->count);
            }

        #Добавляем к балансу контрагента
        $entrance->partner()->first()
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

        $content = view('entrance.dialog.form_entrance', compact( 'entrance', 'stores', 'class', 'request'))
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
            'store_id' => $store->id,
            'count' => $product['count'],
            'price' => $product['price'],
            'total' => $vtotal,
            'nds' => round($vnds, 2),
            'nds_percent' => round($vnds_percent, 2),
            'nds_included' => $request['nds_included'],
        ];
        return $data;
    }

    public static function getEntrances($request){
        return Entrance::where('company_id', Auth::user()->company()->first()->id)
            ->orderBy('created_at', 'DESC')
            ->where(function($q) use ($request){
                if(isset($request['date_start']) && $request['date_start'] != 'null' && $request['date_start'] != ''){
                    $q->where('created_at',  '>=',  Carbon::parse($request['date_start']));
                }
                if(isset($request['date_end']) && $request['date_end'] != 'null' && $request['date_end'] != ''){
                    $q->where('created_at', '<=', Carbon::parse($request['date_end']));
                }
            })
            ->where(function($q) use ($request){
                if(isset($request['search']) && $request['search'] !== 'null') {
                    if (mb_strlen($request['search']) === 1) {
                        $q->whereHas('partner', function ($q) use ($request) {
                            $q->where('fio', 'LIKE', $request['search'] . '%' )
                                ->orWhere('companyName', 'LIKE', $request['search'] . '%');
                        });
                    } else {
                        $q->whereHas('partner', function ($q) use ($request) {
                            $q->where('fio', 'LIKE', '%' . $request['search'] . '%')
                                ->orWhere('companyName', 'LIKE', '%' . $request['search'] . '%')
                                ->orWhereHas('phones', function ($query) use ($request) {
                                    $query->where('number', 'LIKE', '%' . $request['search'] . '%');
                                });
                        });
                    }
                }
            })
            ->paginate(16);
    }

    private static function validateRules()
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'providerorder_id' => ['required', 'exists:provider_orders,id'],
            'store_id' => ['required', 'exists:stores,id'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'max:9999'],
            'products.*.price' => ['integer', 'max:999999'],
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

    public function delete($id)
    {
        $entrance = Entrance::where('id', $id)->first();

        # Склад с которым оперируем
            $store = $entrance->store()->first();

        foreach($entrance->articles()->get() as $article){
            $store->decreaseArticleCount($article->id, $entrance->getArticlesCountById($article->id));
        }

        $entrance->delete();
        $this->status = 200;
        $this->message = 'Поступление удалено';

        return response()->json([
            'id' => $entrance->id,
            'message' => $this->message
        ], 200);
    }
}
