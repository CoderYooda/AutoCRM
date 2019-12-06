<?php

namespace App\Http\Controllers;

use App\Models\Adjustment;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Auth;

class AdjustmentController extends Controller
{
    public static function adjustmentDialog($request)
    {
        $tag = 'adjustmentDialog';

        if($request['adjustment_id']){
            $adjustment = Adjustment::where('id', (int)$request['adjustment_id'])->first();
            $tag .= $adjustment->id;
        } else {
            $adjustment = null;
        }

        $stores = Store::where('company_id', Auth::user()->id)->get();

        return response()->json([
            'tag' => $tag,
            'html' => view('adjustments.dialog.form_adjustment', compact( 'adjustment', 'stores',  'request'))->render()
        ]);
    }

    public function store(Request $request)
    {
        $request['partner_id'] = Auth::user()->partner()->first()->id;

        if($request['do_date'] == null){
            $request['do_date'] = Carbon::now();
        }

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $adjustment = Adjustment::firstOrNew(['id' => $request['id']]);

        if($adjustment->exists){

            $articles = $adjustment->articles()->get();
            $prev_data = [];
            $store = $adjustment->store()->first();
            foreach($articles as $article){
                $prev_data[$article->id]['id'] = $article->id;
                $prev_data[$article->id]['prev_count'] = $article->prev_count;
                $prev_data[$article->id]['prev_price'] = $article->prev_price;


                //$store->setArticleCount($article->id, $article->pivot->);
               // $store->setArticleMidPrice($article->id, $vprice);
            }

            //$store = $client_order->store()->first();
            $this->message = 'Корректировка обновлена';
            $wasExisted = true;

//            #Возвращаем на склад все товары из заказа
//            if($client_order->status === 'complete') {
//                foreach ($client_order->articles()->get() as $article) {
//                    $store = $client_order->store()->first();
//                    $store->increaseArticleCount($article->id, $article->pivot->count);
//                }
//            }

        } else {
            $adjustment->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Корректировка сохранена';
            $wasExisted = false;
        }


        $adjustment->fill($request->only($adjustment->fields));

        $adjustment->save();
        $adjustment_data = [];
        $store = $adjustment->store()->first();

        foreach($request['products'] as $id => $product) {


                //$store->decreaseArticleCount($id, $product['count']);

            $fact = $product['fact'];
            $vprice = $product['price'];


            $deviation_count = $store->getArticlesCountById($id) - $fact;
            $deviation_price = $store->getMidPriceById($id) - $vprice;

            $store->setArticleCount($id, $fact);
            $store->setArticleMidPrice($id, $vprice);

            $pivot_data = [
                'article_id' => (int)$product['id'],
                'adjustment_id' => $adjustment->id,
                'prev_count' => (int)$fact + $deviation_count,
                'count' => (int)$fact,
                'price' => (double)$vprice,
                'prev_price' => (double)$vprice + $deviation_price,
                'deviation_count' => (int)$deviation_count,
                'deviation_price' => (double)$deviation_price
            ];
            $adjustment_data[] = $pivot_data;
        }

        #Удаление всех отношений и запись новых (кастомный sync)
        $adjustment->articles()->sync($adjustment_data, true);

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $adjustment->id,
                'event' => 'AdjustmentStored',
            ], 200);
        } else {
            return redirect()->back();
        }

    }

    private static function validateRules($request)
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'store_id' => ['required', 'exists:stores,id'],
            'products' => ['required'],
            'products.*.fact' => ['required', 'integer', 'min:0', 'max:9999'],
            //'products.*.deviation' => ['required', 'numeric', 'between:1,1000000.00'],
        ];

        return $rules;
    }

    public function fresh($id, Request $request)
    {
        $adjustment = Adjustment::where('id', (int)$id)->first();

        $adjustment->articles = $adjustment->articles()->get();

        $stores = Store::where('company_id', Auth::user()->id)->get();

        foreach($adjustment->articles as $article){
            $article->instock = $article->getCountInStoreId($adjustment->store_id);
            if($article->instock >= $article->pivot->count){
                $article->complited = true;
            } else {
                $article->complited = false;
            }
        }

        $request['fresh'] = true;
        $class = 'AdjustmentDialog' . $id;
        $content = view('adjustments.dialog.form_adjustment', compact( 'adjustment', 'stores', 'class', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'adjustmentDialog' . $id,
        ], 200);
    }


    public static function getAdjustments($request)
    {
        $client_orders = Adjustment::owned()
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

        return $client_orders;
    }
}
