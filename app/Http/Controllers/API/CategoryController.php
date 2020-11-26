<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserActionsController as UA;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     tags={"Categories"},
     *     summary="Полный список категорий",
     *     description="Полный список категорий",
     *     operationId="all",
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param $product_id
     * @return JsonResponse
     */

    public function all()
    {
        $categories = Category::owned()->get();

        foreach ($categories as $key => $category) {

            $categories[$key]['shop'] = [
                'image_id' => $category->image_id,
                'image_url' => $category->image->path ?? null
            ];

            unset($categories[$key]['image_id']);
            unset($categories[$key]['image']);
        }

        return response()->json($categories);
    }

    /**
     * @OA\Get(
     *     path="/api/categories/{id}",
     *     tags={"Categories"},
     *     summary="Информация о категории",
     *     description="Информация о категории",
     *     operationId="show",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID категории",
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
     *         response=400,
     *         description="Invalid ID supplier"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Product not found"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Category $category
     * @return JsonResponse
     */

    public function show(Category $category)
    {
        return response()->json([
            'id' => $category->id,
            'name' => $category->name,
            'category_id' => $category->category_id,
            'shop' => [
                'image_id' => $category->image_id,
                'image_url' => $category->image->path ?? null
            ]
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/categories",
     *     tags={"Categories"},
     *     summary="Создание категории",
     *     description="Создание категории",
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
     *         name="category_id",
     *         in="query",
     *         description="ID родительской категории",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
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
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Нет доступа к этому методу"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Неправильные входные данные"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Category $category
     * @return JsonResponse
     */

    public function store(CategoryRequest $request)
    {
        PermissionController::canByPregMatch('Создавать категории');

        $parentCategory = Category::find($request->category_id);

        $user = \Auth::user();

        $params = $request->validated();
        $params['company_id'] = $user->company_id;
        $params['type'] = $parentCategory->type;
        $params['creator_id'] = $user->id;

        $category = Category::create($params);

        $category->update(['slug' => Str::slug($category->name . '-' . $category->id)]);

        UA::makeUserAction($category, 'create');

        return response()->json($category);
    }

    /**
     * @OA\Patch(
     *     path="/api/categories/{id}",
     *     tags={"Categories"},
     *     summary="Обновление категории",
     *     description="Обновление категории",
     *     operationId="update",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID категории для обновления",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
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
     *         name="category_id",
     *         in="query",
     *         description="ID родительской категории",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
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
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Нет доступа к этому методу"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Неправильные входные данные"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Category $category
     * @return JsonResponse
     */

    public function update(Category $category, CategoryRequest $request)
    {
        PermissionController::canByPregMatch('Редактировать категории');

        $parentCategory = Category::find($request->category_id);

        $params = $request->validated();
        $params['type'] = $parentCategory->type;
        $params['slug'] = Str::slug($request->name . '-' . $category->id);

        $category->update($params);

        UA::makeUserAction($category, 'fresh');

        return response()->json($category);
    }

    /**
     * @OA\Get(
     *     path="/api/categories/{id}/children",
     *     tags={"Categories"},
     *     summary="Получение дочерних категорий",
     *     description="Получение дочерних категорий",
     *     operationId="children",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID категории",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
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
     *         response=422,
     *         description="Неправильные входные данные"
     *     ),
     *     security={
     *         {"api_key": {}}
     *     }
     * )
     * @param Category $category
     * @return JsonResponse
     */

    public function children(Category $category)
    {
        $childrenCategories = $category->childs;

        foreach ($childrenCategories as $key => $childrenCategory) {

            $categories[$key]['shop'] = [
                'image_id' => $childrenCategory->image_id,
                'image_url' => $childrenCategory->image->path ?? null
            ];

            unset($childrenCategories[$key]['image_id']);
            unset($childrenCategories[$key]['image']);
        }

        return response()->json([
            'parent' => [
                'id' => $category->id,
                'name' => $category->name
            ],
            'children' => $childrenCategories
        ]);
    }
}
