<?php

namespace App\Http\Controllers\Api_v2;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function show(Request $request)
    {
//        $category = Category::with('parent')->find($request['category_id']);
//        $parent = Category::find($category->category_id);

        $category = Category::find($request['category_id']);
        $parent = Category::find($category->category_id);

        return response()->json([
            'id' => $category->id,
            'name' => $category->name,
            'parent_id' => $parent->id,
            'parent_name' => $parent->name,
        ]);

//        return response()->json($category);
    }
    public function get(Request $request)
    {
        $categories = Category::where('category_id', $request['category_id'])
            ->where('company_id', Auth::user()->company_id)
            ->get();

        return response()->json($categories);
    }
}
