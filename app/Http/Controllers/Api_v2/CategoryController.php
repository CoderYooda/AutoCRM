<?php

namespace App\Http\Controllers\Api_v2;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public static function show(Request $request)
    {
        $category = Category::find($request['category_id']);
        $parent = Category::find($category->category_id);
//
//        $parent = null;
//
//        if($category) {
//            $parent = Category::find($category->category_id);
//        }
//
//        $class = 'categoryDialog' . ($category->id ?? '');
//
//        if($request['category_select']){
//            $parent = Category::find($request['category_select']);
//        }

        return response()->json([
            'id' => $category->id,
            'name' => $category->name,
            'parent_id' => $parent->id,
            'parent_name' => $parent->name,
        ]);
    }

}
