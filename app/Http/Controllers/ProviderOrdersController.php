<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\ProviderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\Article;
use App\Models\Store;
use Auth;

class ProviderOrdersController extends Controller
{
    public static function providerorderDialog($request)
    {
        $tag = 'providerorderDialog';

        if($request['provider_order_id']){
            $provider_order = ProviderOrder::where('id', (int)$request['provider_order_id'])->first();
            $tag .= $provider_order->id;
        } else {
            $provider_order = null;
        }

        $stores = Store::where('company_id', Auth::user()->id)->get();

        return response()->json([
            'tag' => $tag,
            'html' => view('provider_orders.dialog.form_provider_order', compact( 'provider_order', 'stores',  'request'))->render()
        ]);
    }

    public static function selectProviderOrderDialog($request)
    {
        $providerorders = ProviderOrder::owned()->orderBy('id', 'DESC')->limit(10)->get();
        return response()->json([
            'tag' => 'selectProviderOrderDialog',
            'html' => view('provider_orders.dialog.select_providerorder', compact('providerorders',  'request'))->render(),
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
        return response()->json([
            'id' => $providerorder->id,
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


    public function delete($id)
    {
        $provider_order = ProviderOrder::where('id', $id)->first();

        #Отнимаем с баланса контрагента
        $provider_order->partner()->first()->subtraction($provider_order->itogo);

        $provider_order->delete();
        $this->status = 200;
        $this->message = 'Продажа удален';

        return response()->json([
            'id' => $provider_order->id,
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
        $content = view('provider_orders.dialog.form_provider_order', compact( 'provider_order', 'stores', 'class', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'providerorderDialog' . $id,
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), self::validateRules($request));

        #Подготовка Request`a
        if($request['nds'] === null){$request['nds'] = false;} else {$request['nds'] = true;}
        if($request['inpercents'] === null){$request['inpercents'] = false;} else {$request['inpercents'] = true;}
        if($request['nds_included'] === null){
            $request['nds_included'] = false;
        } else {$request['nds_included'] = true;}
        if($request['locked'] === null){$request['locked'] = false;}


        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $partner = Partner::owned()->where('id', $request['partner_id'])->first();

        if($request['inpercents']){
            if((int)$request['discount'] >= 100){
                $request['discount'] = 100;
            }
            if((int)$request['discount'] <= 0){
                $request['discount'] = 0;
            }
        }
        $provider_order = ProviderOrder::firstOrNew(['id' => $request['id']]);

        $request['do_date'] = Carbon::now();

        if($provider_order->exists){
            $store = Store::owned()->where('id', $request['store_id'])->first();

            if($store->id !== $provider_order->store()->first()->id){
                foreach($provider_order->entrances()->get() as $entrance){
                    $entrance->migrateInStore($provider_order->store()->first(), $store);
                }
            }

            #Отнимаем с баланса контрагента
            $provider_order->partner()->first()->subtraction($provider_order->itogo);


            $this->message = 'Заказ поставщику обновлен';

            $wasExisted = true;
        } else {

            $provider_order->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Заказ поставщику сохранен';
            $wasExisted = false;
        }
        $provider_order->fill($request->only($provider_order->fields));
        $provider_order->summ = 0;
        $provider_order->balance = 0;
        $provider_order->itogo = 0;
        $provider_order->save();

//        foreach($provider_order->entrances()->get() as $entrance){
//            $entrance->increaseInStore($provider_order->store()->first());
//        }

        //$store = Store::where('id', $request['store_id'])->first();

        foreach($request['products'] as $id => $product) {

            $vcount = $product['count'];
            $vprice = $product['price'];

            $vtotal = $vprice * $vcount;

            $provider_order->summ += $vtotal;
            $actor_product = Article::where('id', $product['id'])->first();

            $article_provider_order = $provider_order->articles()->where('article_id', $product['id'])->count();

            ### Пересчёт кол-ва с учетом предидущего поступления #######################################
            #$store->articles()->syncWithoutDetaching($actor_product->id);
            #$beforeCount = $entrance->getArticlesCountById($actor_product->id);
            #$count = (int)$store->getArticlesCountById($actor_product->id) - (int)$beforeCount + (int)$vcount;
            #$count - Текущее кол-во на складе в наличии
            #############################################################################################

            $pivot_data = self::calculatePivotArticleProviderOrder($request, $product);

            if($article_provider_order > 0){
                $provider_order->articles()->updateExistingPivot($product['id'], $pivot_data);
            } else {
                $provider_order->articles()->save($actor_product, $pivot_data);
            }

            foreach($provider_order->entrances()->get() as $entrance){
                $entrance->freshPriceByArticleId($product['id'], $vprice);
            }

            $store = Store::where('id', $request['store_id'])->first();
            $store->recalculateMidprice($product['id']);

        }


//        $article_providerorder_pivot_data = [];
//        foreach($request['products'] as $id => $product) {
//            $article_providerorder_pivot_data[$id] = self::calculatePivotArticleProviderOrder($request, $product);
//        }
//
//        $provider_order->articles()->sync($article_providerorder_pivot_data, true);



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

        #Добавляем к балансу контрагента
        $provider_order->partner()->first()->addition($provider_order->itogo);

        $provider_order->summ = $provider_order->articles()->sum('total');
        $provider_order->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $provider_order->id,
                'event' => 'providerOrderStored',
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
        $provider_orders = providerorder::owned()
            ->orderBy('created_at', 'DESC')
            ->where(function($q) use ($request){
                if(isset($request['date_start']) && $request['date_start'] != 'null' && $request['date_start'] != ''){
                    $q->where('do_date',  '>=',  Carbon::parse($request['date_start']));
                }
                if(isset($request['date_end']) && $request['date_end'] != 'null' && $request['date_end'] != ''){
                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
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

        return $provider_orders;
    }

    private static function validateRules($request)
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:1000000', 'min:0'],
            'products' => ['required'],
            'products.*.count' => ['required', 'integer', 'min:0', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00'],
        ];

        return $rules;
    }
}
