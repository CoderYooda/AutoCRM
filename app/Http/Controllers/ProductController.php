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
use App\Http\Controllers\Providers\TrinityController;
use stdClass;

class ProductController extends Controller
{
    public function _construct()
    {
        $status = 500;
        $message = 'Внутренняя ошибка сервера';
    }

    public function index(Request $request)
    { // точка входа в страницу
        $page_title = 'Товары';
        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }

        $target = HC::selectTarget(); // цель ajax подгрузки

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'store';
        }

        $classname = $request['active_tab'] . 'Tab';
        $content = self::$classname($request);

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json(['target' => $target,'page' => $page_title, 'content' => $content->render()]);
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
        $categories = CategoryController::getCategories($request, 'store');

        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('product.elements.table_container', compact('articles','categories', 'request'));
        }
        return view('product.store', compact('articles','categories', 'request', 'trinity'));
    }

    public static function providerTab($request)
    {
        $tp = new TrinityController('B61A560ED1B918340A0DDD00E08C990E');
        $brands = $tp->searchBrands($request['search'], $online = true, $asArray = false);
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('product.elements.provider.table_container', compact('brands','request'));
        }
        return view('product.provider', compact('brands', 'request'));
    }

    public static function addProductDialog($request)
    {
        if($request['category_select']){
            $category_select = (int)$request['category_select'];
        } else {
            $category_select = 2;
        }
        $stores = Store::where('company_id', Auth::user()->id)->get();
        $category = Category::where('id', $category_select)->first();
        return response()->json(['tag' => 'createProduct', 'html' => view('product.dialog.form_product', compact('category', 'stores', 'request'))->render()]);
    }

    public static function editProductDialog($request)
    {
        $tag = 'editProduct';
        if($request['product_id']){
            $tag .= $request['product_id'];
            $product = Article::where('id', (int)$request['product_id'])->first();
        } else {
            return response()->json(['message' => 'Недопустимое значение товара'], 500);
        }
        if($product){
            $stores = Store::
            where('company_id', Auth::user()->company()->first()->id)
                ->with(['articles' => function($q) use ($product){
                    $q->where('article_id', $product->id);
                }])
                ->get();
        }

        return response()->json(['tag' => $tag, 'html' => view('product.dialog.form_product', compact('product', 'stores'))->render()]);
    }

    public function store(Request $request)
    {
        if($request['new_supplier_name'] != NULL && $request['supplier_id'] == NULL){
            $supplier = SupplierController::silent_store($request);
            $request['supplier_id'] = $supplier->id;
        }

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        if($request['id'] != NULL){ //товар редактируется
            $compare = ['id' => $request['id']];
        } else {
            $compare = ['article' => $request['article'], 'supplier_id' => (int)$request['supplier_id']];
        }

        $existed_article = self::checkArticleUnique($request['id'], $request['article'], (int)$request['supplier_id']);
        if($existed_article){
            return response()->json([
                'system_message' => view('messages.product_already_exist', compact('existed_article'))->render(),
            ], 422);
        }

        $article = Article::firstOrNew($compare);
            if($article->exists){
                $this->message = 'Товар обновлен';
            } else {
                $article->creator_id = Auth::user()->id;
                $article->company_id = Auth::user()->company()->first()->id;
                $this->message = 'Товар сохранён';
            }
        $article->fill($request->only($article->fields));

        $article->save();
        $this->status = 200;

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
                'redirect' => route('StoreIndex', ['category_id' => $article->category()->first()->id, 'serach' => $request['search']]),
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

    public static function checkArticleUnique($id, $article, $brand_id) // Проверка на существование такого артикла + производителя в базе
    {
        $article = Article::where('article', $article)->where('supplier_id', $brand_id)->where('company_id', Auth::user()->company()->first()->id)->first();
        if($article && $article->id != $id){
            return $article;
        } else {
            return false;
        }
    }


    public static function getArticles($request)
    {

        $category = 0;

        if($request['category_id'] == null && $request['search'] == null){
            if($request['active_tab'] == "store"){
                $category = 2;
            }
        } else {
            $category = (int)$request['category_id'];
        }

        return Article::where('company_id', Auth::user()->company()->first()->id )->where(function($q) use ($request, $category){
            if($category != 0) {
                $q->where('category_id', $category);
            }
            if($request['search'] != null) {
                $q->where('article', 'like', '%' . $request['search'] . '%');
            }
        })->orderBy('created_at', 'DESC')->paginate(24);
    }

    public static function searchArticles($request)
    {
        $articles = Article::where('article', 'like', '%' . $request['search'] . '%')->orderBy('created_at', 'DESC')->paginate(24);
        dd($articles);
        return $articles;
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
