<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\ProductController;
use Auth;
use Illuminate\Support\Facades\Validator;

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
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3', 'string', 'max:255'],
            'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
        ]);

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($request['id'] == $request['category_id']){
            return response()->json([
                'system_message' => view('messages.category_loop')->render(),
            ], 422);
        }

        $category = Category::firstOrNew(['id' => (int)$request['id']]);
        $category->fill($request->all());
        $category->creator_id = Auth::user()->id;
        $category->company_id = Auth::user()->company()->first()->id;
        $category->locked = false;
        $category->save();

        $categories = self::getCategories($request);
        $articles = ProductController::getArticles($request);

        //$content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        $content = view('category.list', compact('articles', 'categories'))->render();

        if($request->ajax()){
            return response()->json(['message' => 'Категория сохранена','container' => $category->getRootType() . '_categories', 'html' => $content]);
        } else {
            return redirect()->back();
        }
    }

    public function remove($id)
    {
        $category = Category::where('id', $id)->first();

        if($category->childs()->count() > 0 || $category->articles()->count() > 0){
            $this->status = 403;
            $this->message = 'Удаляемая категория не пуста, удаление невозможно.';
        } else {
            $category->delete();
            $this->status = 200;
            $this->message = 'Категория удалена';
        }

        return response()->json(['category_id' => $category->id, 'message' => $this->message], $this->status);
    }

    public static function addCategoryDialog($request)
    {
        if($request['category_select']){
            $start_category_id = $request['category_select'];
        } else {
            $start_category_id = 2;
        }
        $parent = Category::where('id', $start_category_id)->first();
        return response()->json(['tag' => 'createCategory', 'html' => view('category.dialog.form_category', compact('parent'))->render()]);
    }

    public static function editCategoryDialog($request)
    {
        if($request['params']){
            $category_id = (int)$request['category_id'];
        } else {
            abort(404);
        }

        $category = Category::where('id', $category_id)->first();

        return response()->json(['tag' => 'editCategory', 'html' => view('category.dialog.form_category', compact('category'))->render()]);
    }

    public function enterDialog(Request $request)
    {
        $category = Category::where('id', (int)$request['category_id'])->with('childs')->first();
        return response()->json(['html' => view('category.dialog.select_category_inner', compact('category'))->render()]);
    }

    public static function selectCategoryDialog($request)
    {
        $selected_id = 1;
        if($request['selected_category_id'] != null){
            $selected_id = $request['selected_category_id'];
        }

        $category = Category::where('id', (int)$selected_id)->with('childs')->first();
        return response()->json(['tag' => 'selectCategory', 'html' => view('category.dialog.select_category', compact('category'))->render()]);
    }

    public static function getCategories($request, $type = null)
    {
        if($request['search'] == null){

        if($request['category_id'] != null){
            $category_id = (int)$request['category_id'];
        }else if($type != null) {
            $category_id = Category::where('type', $type)->first()->id;
        }
        $parent = Category::where('id',$category_id)->first();

        if($parent == null){
            abort(404);
        }

        $categories['stack'] = $parent->childs()->where('company_id', Auth::user()->company()->first()->id)->orderBy('created_at', 'DESC')->get();
        $categories['parent'] =  $parent;
        } else {
            $categories['stack'] = Category::where(function($q) use ($request){
                $q->where('name', 'like', '%' . $request['search'] . '%');
            })->get();
            $categories['parent'] = null;
        }
        return $categories;
    }
}
