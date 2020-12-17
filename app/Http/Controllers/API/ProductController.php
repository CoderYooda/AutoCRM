<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionController;
use App\Http\Requests\API\ProductRequest;
use App\Models\Article;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Auth;

class ProductController extends Controller
{
    public function show(Article $product)
    {
        return response()->json($product->load('specifications', 'supplier', 'image', 'category', 'stores'));
    }

    public function store(ProductRequest $request)
    {
        PermissionController::canByPregMatch('Редактировать товары');

        return DB::transaction(function () use($request) {

            if ($request['id'] != null) { //товар редактируется
                $compare = ['id' => $request['id']];
            } else {
                $compare = ['article' => $request['article'], 'supplier_id' => (int)$request['supplier_id']];
            }

            $existed_article = self::checkArticleUnique($request['id'], $request['article'], (int)$request['supplier_id']);
            if ($existed_article) {
                return response()->json([
                    'system_message' => view(get_template() . '.messages.product_already_exist', compact('existed_article'))->render(),
                ], 422);
            }

            $article = Article::with('specifications')->firstOrNew($compare);
            if ($article->exists) {
                $this->message = 'Товар обновлен';
            } else {
                $article->creator_id = Auth::id();
                $article->company_id = Auth::user()->company_id;
                $this->message = 'Товар сохранён';
            }

            #Кроссы
            $article->fill($request->only($article->fields));

            $article->fillShopFields($request);

            $article->slug = Str::slug($request->name . '-' . $article->id);

            $article->save();

            $article->syncSpecifications($request);

            $this->status = 200;
            if($request['storage']) {

                $stores = Store::owned()->whereIn('id', array_keys($request['storage']))->get();

                foreach ($stores as $store) {

                    $storage = $request['storage'][$store->id];

                    $store->articles()->syncWithoutDetaching($article->id);

                    $pivot_data = [
                        'storage_zone' => $storage['storage_zone'],
                        'storage_rack' => $storage['storage_rack'],
                        'storage_vertical' => $storage['storage_vertical'],
                        'storage_horizontal' => $storage['storage_horizontal']
                    ];

                    if(isset($storage['retail_price'])){
                        $pivot_data['retail_price'] = $storage['retail_price'];
                    }

                    $article->stores()->updateExistingPivot($store->id, $pivot_data);
                }
            }

            return response()->json([
                'message' => $this->message,
                'event' => 'ProductStored',
            ], $this->status);

        });
    }

    public function update(Article $product, ProductRequest $request)
    {

        PermissionController::canByPregMatch('Редактировать товары');
        return DB::transaction(function () use($request, $product) {

            $product->fill($request->only($product->fields));
            $product->category()->associate($request->category['id']);
            $product->supplier()->associate($request->supplier['id']);
            $product->syncSpecifications($request->specifications);
            $product->save();
            if($request['storage']) {

                $stores = Store::owned()->whereIn('id', array_keys($request['storage']))->get();

                foreach ($stores as $store) {

                    $storage = $request['storage'][$store->id];

                    $store->articles()->syncWithoutDetaching($product->id);

                    $pivot_data = [
                        'storage_zone' => $storage['storage_zone'],
                        'storage_rack' => $storage['storage_rack'],
                        'storage_vertical' => $storage['storage_vertical'],
                        'storage_horizontal' => $storage['storage_horizontal']
                    ];

                    if(isset($storage['retail_price'])){
                        $pivot_data['retail_price'] = $storage['retail_price'];
                    }

                    $product->stores()->updateExistingPivot($store->id, $pivot_data);
                }
            }



            return response()->json([
                'message' => 'Товар обновлен',
                'event' => 'ProductStored',
            ]);

        });
    }

}
