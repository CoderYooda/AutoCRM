<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\ProductController;
use Auth;

class CategoryController extends Controller
{
    public function _construct(){
        $status = 500;
        $message = 'Внутренняя ощибка сервера';
    }

    public function index()
    {
        $categories = Category::with('childs', 'parent')->get();
        dd($categories);
    }


    public function store(Request $request)
    {

        $category = Category::firstOrNew(['id' => (int)$request['id']]);
        $category->fill($request->all());
        $category->creator_id = Auth::user()->id;
        $category->company_id = Auth::user()->company()->first()->id;
        $category->locked = false;
        $category->save();

        $categories = self::getCategories($request);
        $articles = ProductController::getArticles($request);
        $content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        if($request->ajax()){
            return response()->json(['message' => 'Категория сохранена','container' => 'ajax-table', 'html' => $content]);
        } else {
            return redirect()->back();
        }
    }

    public function remove($id)
    {
        $category = Category::where('id', $id)->first();

        if($category->childs()->count() > 0 || $category->articles()->count() > 0){
            $this->status = 403;
            $this->message = 'В категории присутствуют товары или категории, удаление невозможно.';
        } else {
            $category->delete();
            $this->status = 200;
            $this->message = 'Категория удалена';
        }

        return response()->json(['category_id' => $category->id, 'message' => $this->message], $this->status);

    }

    public static function addCategoryDialog()
    {
        if(request()->params){
            $start_category_id = (int)request()->params;
        } else {
            $start_category_id = 2;
        }

        $parent = Category::where('id', $start_category_id)->first();
        return response()->json(['html' => view('product.dialog.form_category', compact('parent'))->render()]);
    }

    public static function editCategoryDialog()
    {
        if(request()->params){
            $category_id = (int)request()->params;
        } else {
            abort(404);
        }

        $category = Category::where('id', $category_id)->first();
        return response()->json(['html' => view('product.dialog.form_category', compact('category'))->render()]);
    }

    public function enterDialog(Request $request)
    {
        $category = Category::where('id', (int)$request['category_id'])->with('childs')->first();
        return response()->json(['html' => view('category.dialog.select_category_inner', compact('category'))->render()]);
    }

    public static function selectCategoryDialog()
    {
        $category = Category::where('id', (int)request()->params)->with('childs')->first();
        return response()->json(['html' => view('category.dialog.select_category', compact('category'))->render()]);
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
