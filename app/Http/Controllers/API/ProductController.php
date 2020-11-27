<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserActionsController as UA;
use App\Http\Requests\ProductRequest;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * @OA\Info(title="CRM API", version="1.0")
     */

    /**
     * @OA\Get(
     *     path="/api/products/{id}",
     *     tags={"Products"},
     *     summary="Поиск продукта по ID",
     *     description="Поиск продукта по ID",
     *     operationId="show",
     *     @OA\Parameter(
     *         name="size",
     *         in="query",
     *         description="Количество на странице",
     *         required=false,
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

    public function all(Request $request)
    {
        $products = Article::with('supplier')->owned()->paginate($request->size ?? 30);

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/products/{id}",
     *     tags={"Products"},
     *     summary="Поиск продукта по ID",
     *     description="Поиск продукта по ID",
     *     operationId="show",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID продукта",
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
        return response()->json($product->load('image', 'stores'));
    }

    /**
     * @OA\Post(
     *     path="/api/products",
     *     tags={"Products"},
     *     summary="Создание продукта",
     *     description="Создание продукта",
     *     operationId="store",
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="Наименование",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="supplier_id",
     *         in="query",
     *         description="ID производителя",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="article",
     *         in="query",
     *         description="Артикул",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="ID категории",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="barcode",
     *         in="query",
     *         description="Штрихкод производителя",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="barcode_local",
     *         in="query",
     *         description="Штрихкод на складе",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_name",
     *         in="query",
     *         description="Наименование в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_desc",
     *         in="query",
     *         description="Описание в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="image_id",
     *         in="query",
     *         description="ID изображения",
     *         required=false,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_discount_price",
     *         in="query",
     *         description="Цена в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="numeric"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_discount",
     *         in="query",
     *         description="Сумма скидки(рубли/проценты)",
     *         required=false,
     *         @OA\Schema(
     *             type="numeric"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_discount_type",
     *         in="query",
     *         description="Тип скидки(рубли - 0, проценты - 1)",
     *         required=false,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_main",
     *         in="query",
     *         description="Отображение на главной странице в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="bool"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_stock",
     *         in="query",
     *         description="Статус акционного товара в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="bool"
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
     *         description="Продукт не найден"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Article $product
     * @return JsonResponse
     */

    public function store(ProductRequest $request)
    {
        return DB::transaction(function () use($request) {

            $params = $request->only(Article::$fields);

            Article::fillShopFields($request, $params);

            $params['creator_id'] = \Auth::id();
            $params['company_id'] = Auth::user()->company_id;

            $product = Article::create($params);

            $product->update(['slug' => Str::slug($request->name . '-' . $product->id)]);

            $product->freshSpecifications($request);

            $product->freshStoreges($request);

            UA::makeUserAction($product, 'create');

            return response()->json([
                'message' => 'Товар создан.',
                'event' => 'ProductStored',
            ]);
        });
    }

    /**
     * @OA\Patch(
     *     path="/api/products/{id}",
     *     tags={"Products"},
     *     summary="Обновление продукта",
     *     description="Обновление продукта",
     *     operationId="update",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID продукта",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="supplier_id",
     *         in="query",
     *         description="ID производителя",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="article",
     *         in="query",
     *         description="Артикул",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="ID категории",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="barcode",
     *         in="query",
     *         description="Штрихкод производителя",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="barcode_local",
     *         in="query",
     *         description="Штрихкод на складе",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_name",
     *         in="query",
     *         description="Наименование в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_desc",
     *         in="query",
     *         description="Описание в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="image_id",
     *         in="query",
     *         description="ID изображения",
     *         required=false,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_discount_price",
     *         in="query",
     *         description="Цена в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="numeric"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_discount",
     *         in="query",
     *         description="Сумма скидки(рубли/проценты)",
     *         required=false,
     *         @OA\Schema(
     *             type="numeric"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_discount_type",
     *         in="query",
     *         description="Тип скидки(рубли - 0, проценты - 1)",
     *         required=false,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_main",
     *         in="query",
     *         description="Отображение на главной странице в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="bool"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="sp_stock",
     *         in="query",
     *         description="Статус акционного товара в интернет магазине",
     *         required=false,
     *         @OA\Schema(
     *             type="bool"
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
     *         description="Продукт не найден"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Article $product
     * @return JsonResponse
     */

    public function update(Article $product, ProductRequest $request)
    {
        return DB::transaction(function () use($product, $request) {

            $params = $request->only(Article::$fields);
            $params['slug'] = Str::slug($request->name . '-' . $product->id);

            Article::fillShopFields($request, $params);

            $product->update($params);

            $product->freshSpecifications($request);

            $product->freshStoreges($request);

            UA::makeUserAction($product, 'fresh');

            return response()->json([
                'message' => 'Товар Обновлён.',
                'event' => 'ProductStored',
            ]);
        });
    }
}
