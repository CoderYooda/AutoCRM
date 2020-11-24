<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories/{category_id}/breadcrumbs",
     *     tags={"Categories"},
     *     summary="Хлебные крошки",
     *     description="Возвращает хлебные крошки категории",
     *     operationId="breadcrumbs",
     *     @OA\Parameter(
     *         name="category_id",
     *         in="path",
     *         description="ID of category",
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
     * @param $product_id
     * @return \Illuminate\Http\JsonResponse
     */

    public function breadcrumbs($category_id)
    {
        $category = Category::findOrFail($category_id);

        $slugs = $category->getParentsSlugs();

        $slugs = explode('/', $slugs);

        unset($slugs[0]);

        return response()->json($slugs);
    }

    public function show($category_id)
    {
        $category = Category::findOrFail($category_id);

        return response()->json([
            'name' => $category->name,
            'category_id' => $category->id,
            'shop' => [
                'image_id' => $category->image->id
            ]
        ]);
    }
}
