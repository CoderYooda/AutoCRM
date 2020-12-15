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
    /**
     * @OA\Info(title="CRM API", version="1.0")
     */

    /**
     * @OA\Get(
     *     path="/api/products/{id}",
     *     tags={"Products"},
     *     summary="Find product by ID",
     *     description="Returns a single product",
     *     operationId="show",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of product to return",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Нет доступа к этому методу"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Product not found"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Article $product
     * @return JsonResponse
     */

    public function show(Article $product)
    {
//        $storePrices = [];
//
//        foreach ($product->stores as $store) {
//            $storePrices[$store->id] = $store->pivot->retail_price;
//        }


        return response()->json($product->load('specifications', 'supplier', 'image', 'category'));

//        return response()->json([
//            'id' => $product->id,
//            'name' => $product->name,
//            'article' => $product->article,
//            'supplier' => $product->supplier->name,
//            'supplier_id' => $product->supplier->id,
//            'category' => $product->category->name,
//            'category_id' => $product->category->id,
//            'barcode' => $product->barcode,
//            'barcode_local' => $product->barcode_local,
//            'prices' => [
//                'default' => $product->getPrice(),
//                'retail' => $storePrices,
//                'shop' => $product->getPriceWithDiscount()
//            ],
//            'shop' => [
//                'name' => $product->sp_name,
//                'desc' => $product->sp_desc,
//                'show_main' => $product->sp_main,
//                'stock' => $product->sp_stock,
//                'discount' => $product->sp_discount,
//                'discount_type' => $product->sp_discount_type,
//                'image' => [
//                    'image_id' => $product->image_id,
//                    'image_path' => $product->image->url ?? null
//                ],
//                'specifications' => $specifications
//            ]
//        ]);
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

            if(isset($request->shop['specifications'])) {

                $attributes = [];

                foreach ($request->shop['specifications'] as $key => $specification) {
                    $attributes[$key]['name'] = Str::slug($specification['label']);
                    $attributes[$key]['label'] = $specification['label'];
                    $attributes[$key]['value'] = $specification['value'];
                }

                $article->specifications()->delete();
                $article->specifications()->createMany($attributes);
            }

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

            $this->message = 'Товар обновлен';

            #Кроссы
            $product->fill($request->only($product->fields));

            $product->fillShopFields($request);

            $product->slug = Str::slug($request->name . '-' . $product->id);

            $product->save();

            if(isset($request->shop['specifications'])) {

                $attributes = [];

                foreach ($request->shop['specifications'] as $key => $specification) {
                    $attributes[$key]['name'] = Str::slug($specification['label']);
                    $attributes[$key]['label'] = $specification['label'];
                    $attributes[$key]['value'] = $specification['value'];
                }

                $product->specifications()->delete();
                $product->specifications()->createMany($attributes);
            }

            $this->status = 200;
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
                'message' => $this->message,
                'event' => 'ProductStored',
            ], $this->status);

        });
    }

    public static function checkArticleUnique($id, $article, $brand_id) // Проверка на существование такого артикла + производителя в базе
    {
        $article = Article::where('article', $article)->where('supplier_id', $brand_id)
            ->where('company_id', Auth::user()->company()->first()->id)
            ->first();

        if ($article && $article->id != $id) {
            return $article;
        } else {
            return false;
        }
    }
}
