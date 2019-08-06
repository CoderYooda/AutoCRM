<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CategoryController;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Auth;

class ProductController extends Controller
{


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
        return response()->json(['html' => view('product.dialog.add_product')->render()]);
    }

    public static function addProductCategoryDialog()
    {
        return response()->json(['html' => view('product.dialog.add_product_category')->render()]);
    }

    public function store(Request $request)
    {
        $article = new Article();
        $article->fill($request->all());
        $article->save();
        $article->company()->associate(Auth::user()->company()->first());

        $categories = CategoryController::getCategories($request, 'product');
        $articles = ProductController::getArticles($request);
        $content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        if($request->ajax()){
            return response()->json(['container' => 'ajax-table', 'html' => $content]);
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
        return Article::where('category_id', $request['category_id'])->orderBy('created_at', 'DESC')->paginate(17);
    }

}
