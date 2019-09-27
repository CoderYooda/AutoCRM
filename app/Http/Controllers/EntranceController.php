<?php

namespace App\Http\Controllers;

use App\Models\Article;
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
            'html' => view('entrance.dialog.form_entrance', compact('entrance','stores'))->render()
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

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($request['nds'] === null){$request['nds'] = false;}
        if($request['nds_included'] === null){$request['nds_included'] = false;}
        if($request['locked'] === null){$request['locked'] = false;}

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($entrance->exists){
            $this->message = 'Поступление обновлено';
        } else {
            if(Auth::user() != null){
                $entrance->company_id = Auth::user()->company()->first()->id;
            } else {
                $entrance->company_id = 1;
            }
            $this->message = 'Поступление сохранено';
        }
        $entrance->fill($request->only($entrance->fields));
        $entrance->totalPrice = 0;
        $entrance->save();

        $store = Store::where('id', $request['store_id'])->first();

        foreach($request['products'] as $id => $product) {

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

            $entrance->totalPrice += $vtotal;
            $actor_product = Article::where('id', $product['id'])->first();
            $article_entrance = $entrance->articles()->where('article_id', $product['id'])->count();

            ### Пересчёт кол-ва с учетом предидущего поступления #######################################
            $store->articles()->syncWithoutDetaching($actor_product->id);
            $beforeCount = $entrance->getArticlesCountById($actor_product->id);
            $count = (int)$store->getArticlesCountById($actor_product->id) - (int)$beforeCount + (int)$vcount;
            //$count - Текущее кол-во на складе в наличии
            #############################################################################################

            $pivot_data = [
                'store_id' => $store->id,
                'count' => $vcount,
                'price' => $vprice,
                'total' => $vtotal,
                'nds' => round($vnds, 2),
                'nds_percent' => round($vnds_percent, 2),
                'nds_included' => $request['nds_included']
            ];


            if($article_entrance > 0){
                $entrance->articles()->updateExistingPivot($product['id'], $pivot_data);
            } else {
                $entrance->articles()->save($actor_product, $pivot_data);
            }

            $store->articles()->updateExistingPivot($actor_product->id, ['count' => $count]);
        }
        $entrance->save();

        if($request->ajax()){
            return response()->json([
                'message' => $this->message,
                'container' => 'ajax-table-entrance',
                'event' => 'EntranceStored',
            ], 200);
        } else {
            return redirect()->back();
        }
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

    private static function validateRules($request)
    {
        $rules = [
            'partner_id' => ['required', 'exists:partners,id'],
            'store_id' => ['required', 'exists:stores,id'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'max:9999'],
            'products.*.price' => ['integer', 'max:999999'],
        ];

        return $rules;
    }
}
