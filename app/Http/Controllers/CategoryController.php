<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\ProductController;
use Auth;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::with('childs', 'parent')->get();
        dd($categories);
    }


    public function store(Request $request)
    {

        $category = new Category();
        $category->fill($request->all());
        $category->creator_id = Auth::user()->id;
        $category->company_id = Auth::user()->company()->first()->id;
        $category->locked = false;
        $category->save();

        $categories = self::getCategories($request);
        $articles = ProductController::getArticles($request);
        $content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        if($request->ajax()){
            return response()->json(['container' => 'ajax-table', 'html' => $content]);
        } else {
            return redirect()->back();
        }
    }

    public static function getCategories($request, $type = null)
    {

     if($request['category_id'] != null){
         $category_id = (int)$request['category_id'];
     }else if($type != null) {
         $category_id = Category::where('type', $type)->first()->id;
     }
     $categories['stack'] = Category::where('id',$category_id)->first()->childs()->orderBy('created_at', 'DESC')->get();
     $categories['parent'] =  Category::where('id',$category_id)->first();
        return $categories;
    }
}
