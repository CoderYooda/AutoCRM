<?php

namespace App\Http\Controllers;

use App\Models\ProviderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\Article;
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


    public function delete($id)
    {
        $provider_order = ProviderOrder::where('id', $id)->first();

        $provider_order->delete();
        $this->status = 200;
        $this->message = 'Продажа удален';

        return response()->json([
            'id' => $provider_order->id,
            'message' => $this->message
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }
        $provider_order = ProviderOrder::firstOrNew(['id' => $request['id']]);

        $request['do_date'] = Carbon::now();

        if($provider_order->exists){
            $this->message = 'Заказ поставщику обновлен';
        } else {
            $provider_order->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Заказ поставщику сохранен';
        }
        $provider_order->fill($request->only($provider_order->fields));
        $provider_order->summ = 0;
        $provider_order->balance = 0;
        $provider_order->itogo = 0;
        $provider_order->save();

        //$store = Store::where('id', $request['store_id'])->first();
        foreach($request['products'] as $id => $product) {

            $vcount = $product['count'];
            $vprice = $product['price'];

            $vtotal = $vprice * $vcount;

            $provider_order->summ += $vtotal;
            $actor_product = Article::where('id', $product['id'])->first();

            $article_provider_order = $provider_order->articles()->where('article_id', $product['id'])->count();

            ### Пересчёт кол-ва с учетом предидущего поступления #######################################
//            $store->articles()->syncWithoutDetaching($actor_product->id);
//            $beforeCount = $entrance->getArticlesCountById($actor_product->id);
//            $count = (int)$store->getArticlesCountById($actor_product->id) - (int)$beforeCount + (int)$vcount;
            //$count - Текущее кол-во на складе в наличии
            #############################################################################################

            $pivot_data = [
                'count' => $vcount,
                'price' => $vprice,
                'total' => $vtotal
            ];

            if($article_provider_order > 0){
                $provider_order->articles()->updateExistingPivot($product['id'], $pivot_data);
            } else {
                $provider_order->articles()->save($actor_product, $pivot_data);
            }

            //$store->articles()->updateExistingPivot($actor_product->id, ['count' => $count]);
        }

        $provider_order->articles()->sync(array_column($request['products'], 'id'));

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

        $provider_order->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
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
            'products.*.count' => ['integer', 'max:9999'],
            'products.*.price' => ['integer', 'max:999999'],
        ];

        return $rules;
    }
}
