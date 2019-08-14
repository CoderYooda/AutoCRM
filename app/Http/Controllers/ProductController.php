<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CategoryController;
use App\Model\Catalog\Product;
use App\Models\Article;
use App\Models\Category;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Illuminate\Support\Facades\Validator;
use Auth;

class ProductController extends Controller
{
    public function _construct(){
        $status = 500;
        $message = 'Внутренняя ошибка сервера';
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

    public function delete($id)
    {
        $product = Article::where('id', $id)->first();

        $product->delete();
        $this->status = 200;
        $this->message = 'Товар удален';

        return response()->json(['product_id' => $product->id, 'message' => $this->message], $this->status);
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
        $stores = Store::where('company_id', Auth::user()->id)->get();
        $category = Category::where('id', $start_category_id)->first();
        return response()->json(['html' => view('product.dialog.form_product', compact('category', 'stores'))->render()]);
    }

    public static function editProductDialog($id = null)
    {
        $product = Article::where('id', $id)->first();
        $stores = Store::
            where('company_id', Auth::user()->id)
            ->with(['articles' => function($q) use ($product){
                $q->where('article_id', $product->id);
            }])
            ->get();
        return response()->json(['html' => view('product.dialog.form_product', compact('product', 'stores'))->render()]);
    }

    public function store(Request $request)
    {

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $article = Article::firstOrNew(['id' => (int)$request['id']]);
        $article->fill($request->only($article->fields));
        if($article->save()){
            $this->status = 200;
            $this->message = 'Товар сохранён';
        }
        $article->company()->associate(Auth::user()->company()->first());


        if($request['store'] != NULL){
            foreach ($request['store'] as $id => $store_elem){
                $store = Store::where('id', $id)->first();
                if(!Auth::user()->company()->first()->checkAccessToStore($store)){
                    $this->status = 403;
                    $this->message = 'Магазин, в который Вы сохраняете, Вам не принадлежит';
                    return response()->json(['message' => $this->message], $this->status);
                }
                if(isset($store_elem['isset']) && $store_elem['isset'] == true){
                    $store->articles()->syncWithoutDetaching($article->id);
                    $article->stores()->updateExistingPivot($id, ['location' => $store_elem['location']]);
                    $article->stores()->updateExistingPivot($id, ['isset' => $store_elem['isset']]);
                } else {
                    $article->stores()->updateExistingPivot($id, ['isset' => false]);
                }

            }
        }


        $categories = CategoryController::getCategories($request, 'product');
        $articles = ProductController::getArticles($request);
        $content = view('product.elements.table_container', compact('articles', 'categories'))->render();

        if($request->ajax()){
            return response()->json([
                'message' => $this->message,
                'container' => 'ajax-table',
                'redirect' => route('StoreIndex', ['category_id' => $article->category()->first()->id]),
                'html' => $content
                ], $this->status);
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

    private static function validateRules($request)
    {
        $rules = [
            'name' => ['required', 'min:4', 'string', 'max:255'],
            'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
            'supplier_id' => ['required', 'min:0', 'max:255', 'exists:suppliers,id'],
            'article' => ['required', 'string', 'max:64'],
        ];

        foreach($request['store'] as $id => $store){
            if(isset($store['isset']) && $store['isset'] == true){
                $rules['store.' . $id . '.location'] = [ 'max:250'];
                $rules['store.' . $id . '.isset'] = [ 'boolean'];
            }
        }

        return $rules;
    }
}
