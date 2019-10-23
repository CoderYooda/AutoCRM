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
    public static $breadcrumbs;

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
            'name' => ['required', 'min:3', 'string', 'max:120'],
            'category_id' => ['required', 'min:0', 'max:12', 'exists:categories,id'],
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

        $type = null;
        if($request['category_id'] != null){
            $parent = Category::owned()->where('id', (int)$request['category_id'])->first();
            if($parent && $parent->type != null){
                $type = $parent->type;
            }
        }

        $category = Category::firstOrNew(['id' => (int)$request['id']]);
        $category->fill($request->all());
        $category->creator_id = Auth::user()->id;
        $category->company_id = Auth::user()->company()->first()->id;
        $category->locked = false;
        $category->type = $type;
        $category->save();

        //$categories = self::getCategories($request);
        //$articles = ProductController::getArticles($request);

        //$content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        //$content = view('category.list', compact('articles', 'categories'))->render();

        if($request->expectsJson()){
            return response()->json([
                'message' => 'Категория сохранена',
//                'container' => $category->getRootType() . '_categories',
//                'html' => $content,
                'event' => 'CategoryStored'
            ]);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id)
    {
        $category = Category::where('id', $id)->first();
        $type = 'success';
        if($category->childs()->count() > 0 ||
            $category->articles()->count() > 0 ||
            $category->ddsarticles()->count() > 0 ||
            $category->partners()->count() > 0
        ){
            $this->status = 200;
            $type = 'error';
            $this->message = 'Удаляемая категория не пуста, удаление невозможно.';
        } else {
            $category->delete();
            $this->status = 200;
            $this->message = 'Категория удалена';
        }

        return response()->json([
            'id' => $category->id,
            'type' => $type,
            'message' => $this->message
        ], $this->status);
    }

    public static function categoryDialog($request)
    {
        $tag = 'categoryDialog';

        if($request['category_id']){
            $tag .= $request['category_id'];
            $category = Category::owned()->where('id', (int)$request['category_id'])->first();
        } else {
            $category = null;
        }

        if($request['category_select']){
            $start_category_id = $request['category_select'];
        } else {
            $start_category_id = 2;
        }

        $parent = Category::owned()->where('id', $start_category_id)->first();
        return response()->json([
            'tag' => $tag,
            'html' => view('category.dialog.form_category', compact('category', 'parent', 'request'))->render()
        ]);
    }

    public function select($id)
    {
        $category = Category::owned()->where('id', $id)->first();
        if(!$category){
            return response()->json([
                'message' => 'Категория не найдена, возможно она была удалёна',
            ], 422);
        }
        return response()->json([
            'id' => $category->id,
            'name' => $category->name
        ]);
    }

    public function dialogSearch(Request $request)
    {
        $root_category = Category::owned()->where('id', $request['root'])->first();
        if($request['string'] != null && $request['string'] != '' && $request['string'] != 'undefined'){
            $categories = Category::owned()
                ->where(function($q) use ($request){
                    $q->where('name', 'LIKE', '%' . $request['string'] .'%');
                })
                ->where('type',  $root_category->type )
                ->orderBy('name', 'DESC')->limit(10)->get();
            $searching = true;
            $content = view('category.dialog.select_category_inner', compact('categories','searching', 'request'))->render();
            return response()->json([
                'html' => $content
            ], 200);
        } else {
            $data = self::findSelectedId($request);
            $category = Category::owned()->where('id', (int)$data['selected_id'])->first();
            $root = $data['root'];
            $searching = false;
            return response()->json([
                'tag' => 'selectCategoryDialog',
                'html' => view('category.dialog.select_category_inner', compact('root', 'searching', 'category', 'request'))->render()
            ]);
        }

    }

    public static function editCategoryDialog($request)
    {
        if($request['params']){
            $category_id = (int)$request['category_id'];
        } else {
            abort(404);
        }

        $category = Category::owned()->where('id', $category_id)->first();

        return response()->json(['tag' => 'editCategory', 'html' => view('category.dialog.form_category', compact('category'))->render()]);
    }

    public function enterDialog(Request $request)
    {
        $class = 'selectCategoryDialog';
        $data = self::findSelectedId($request);
        $category = Category::owned()->where('id', (int)$data['selected_id'])->first();
        $root = $data['root'];
        $searching = false;
        return response()->json([
            'html' => view('category.dialog.select_category_inner', compact('root', 'class', 'searching', 'category', 'request'))->render()
        ]);
    }

    public static function selectCategoryDialog($request)
    {
        $data = self::findSelectedId($request);
        $category = Category::owned()->where('id', (int)$data['selected_id'])->first();
        $root = $data['root'];
        $searching = false;
        return response()->json([
            'tag' => 'selectCategoryDialog',
            'html' => view('category.dialog.select_category', compact('root', 'searching', 'category', 'request'))->render()
        ]);
    }

    private static function findSelectedId($request){
        $selected_id = null;
        $root = null;
        if($request['refer']){
            if(strpos($request['refer'], 'partnerDialog') !== false){
                $root = 3;
            }else if(strpos($request['refer'], 'employeeDialog') !== false){
                $root = 5;
            }else if(strpos($request['refer'], 'categoryDialog') !== false){
                $root = 1;
            }else if(strpos($request['refer'], 'productDialog') !== false){
                $root = 2;
            } else {
                return response()->json([
                    'message' => 'Не указан рефер',
                ], 422);
            }
        } else {
            return response()->json([
                'message' => 'Не найден рефер окна.',
            ], 422);
        }
        if($request['category_selected'] != null
            && $request['category_selected'] != 'null'
            && $request['category_selected'] != 'undefined'
        ){
            $selected_id = $request['category_selected'];
        }
        if($selected_id == null){
            $selected_id = $root;
        }
        $data['selected_id'] = $selected_id;
        $data['root'] = $root;
        return $data;
    }

    public static function getCategory($request, $root){
        if($request['category_id'] != NULL){
            $category = Category::owned()->where('id', $request['category_id'])->first();
        } else {
            $category = Category::owned()->where('id', $root)->first();
        }
        return $category;
    }

    public static function getCategories($request, $type = null)
    {
        if($request['search'] == null){

        if($request['category_id'] != null){
            $category_id = (int)$request['category_id'];
        }else if($type != null) {
            $category_id = Category::owned()->where('type', $type)->first()->id;
        }

        $parent = Category::where('id',$category_id)->first();
        dd($parent);

        if($parent == null){
            abort(404);
        }

        $categories['stack'] = $parent->childs()->orderBy('created_at', 'DESC')->get();
        $categories['parent'] = $parent;
        } else {
            $categories['stack'] = Category::owned()->where(function($q) use ($request){
                $q->where('name', 'like', '%' . $request['search'] . '%');
            })->get();
            $categories['parent'] = null;
        }
        return $categories;
    }

    public static function drawCrumbs($category, $root = 0){
        self::$breadcrumbs = collect();
        $html = '<ol class="breadcrumb mb-0">';
        self::rec($category, $root);
        foreach(self::$breadcrumbs as $index => $breadcrumb){

            if($breadcrumb->id == 1 || $index == self::$breadcrumbs->count()){
                $html .= '<li class="breadcrumb-item"><span>' . $breadcrumb->name . '</span></li>';
            } else {
                $html .= '<li class="breadcrumb-item"><a class="ajax-nav" href = "' . url()->current() . '?category_id=' . $breadcrumb->id . '" >' . $breadcrumb->name . '</a></li>';
            }
        }
        $html .= '</ol>';
        return $html;
    }

    public static function rec($category, $root){
        self::$breadcrumbs->prepend($category);

        $parent = $category->parent()->first();

        if($parent != null && $parent->id != 1 && $category->id != $root){
            self::rec($parent, $root);
        }
    }

//    public function drawCrumbs($request, $root){
//        $html = '<ol class="breadcrumb mb-0">';
//
//
//        $breadcrumbs = [];
//
//        $breadcrumbs[] = $this->rec($breadcrumbs, $root, 0);
//
//        dd($breadcrumbs);
//        foreach($breadcrumbs as $breadcrumb){
//            $html .= '<li class="breadcrumb-item"><a href="#">' . $breadcrumb->name . '</a></li>';
//        }
//
//
//        $html .= '</ol>';
//        return $html;
//    }
}
