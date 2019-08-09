<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CategoryController;
use App\Model\Catalog\Product;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Illuminate\Support\Facades\Validator;
use Auth;

class ProductController extends Controller
{
    public function _construct(){
        $status = 500;
        $message = 'Внутренняя ощибка сервера';
    }

    public function index(Request $request)
    { // точка входа в страницу
        $page_title = 'Товары';

        $target = HC::selectTarget(); // цель ajax подгрузки

        if($request['active_tab'] === NULL){ // Определяем табуляцию
            $request['active_tab'] = 'store';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json(['target' => $target ,'page' => $page_title, 'content' => $content->render()]);
        } else {
            return $content;
        }
    }

    public static function storeTab($request)
    {
        $articles = self::getArticles($request);
        $categories = CategoryController::getCategories($request, 'product');
        return view('product.store', compact('articles', 'categories', 'request'));
    }

    public static function addProductDialog()
    {
        if(request()->params){
            $start_category_id = (int)request()->params;
        } else {
            $start_category_id = 2;
        }
        $category = Category::where('id', $start_category_id)->first();
        return response()->json(['html' => view('product.dialog.form_product', compact('category'))->render()]);
    }

    public static function editProductDialog($id = null)
    {

        $product = Article::where('id', $id)->first();
        return response()->json(['html' => view('product.dialog.form_product', compact('product'))->render()]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:4', 'string', 'max:255'],
            'category_id' => ['required',  'max:255', 'exists:categories,id'],
            'article' => ['required', 'string', 'max:22'],
        ]);

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }


        $article = Article::firstOrNew(['id' => (int)$request['id']]);
        $article->fill($request->all());
        $article->save();
        $article->company()->associate(Auth::user()->company()->first());

        $categories = CategoryController::getCategories($request, 'product');
        $articles = ProductController::getArticles($request);
        $content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        if($request->ajax()){
            return response()->json(['message' => 'Товар сохранён', 'container' => 'ajax-table', 'html' => $content]);
        } else {
            return redirect()->back();
        }
    }

    public static function getProductCategories()
    {
        return response()->json(['html' => view('product.elements.table_folders')->render()]);
    }
    public static function getArticles($request)
    {
        $category = 0;
        if($request['category_id'] == null){
            if($request['active_tab'] == "store"){
                $category = 2;
            }
        } else {
            $category = (int)$request['category_id'];
        }
        return Article::where('category_id', $category)->orderBy('created_at', 'DESC')->paginate(24);
    }

}
