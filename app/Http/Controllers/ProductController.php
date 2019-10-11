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
use sngrl\SphinxSearch\SphinxSearch;
use App\Http\Controllers\Providers\TrinityController;
use stdClass;

class ProductController extends Controller
{
    public function _construct()
    {
        $status = 500;
        $message = 'Внутренняя ошибка сервера';
    }

    public function delete($id)
    {
        $product = Article::where('id', $id)->first();

        $product->delete();
        $this->status = 200;
        $this->message = 'Товар удален';

        return response()->json([
            'id' => $product->id,
            'message' => $this->message
        ], $this->status);
    }

    public static function selectProductDialog($request)
    {
        $stores = Store::where('company_id', Auth::user()->id)->get();
        $products = Article::owned()->orderBy('id', 'DESC')->limit(30)->get();
        return response()->json([
            'tag' => 'selectProductDialog',
            'html' => view('product.dialog.select_product', compact('products', 'stores', 'request'))->render()
        ]);
    }

    public function addToList($id, Request $request){
        $product = Article::where('id', $id)->first();
        if(!$product){
            return response()->json([
                'message' => 'Товар не найден, возможно он был удалён',
            ], 422);
        }
        if(!$product->canUserTake()){
            return response()->json([
                'message' => 'Доступ к этому товару запрещен.',
            ], 422);
        }
        if($request['type'] && $request['type'] === 'shipment'){
            $content = view('shipments.dialog.product_element', compact('product', 'request'))->render();
        } else {
            $content = view('entrance.dialog.product_element', compact('product', 'request'))->render();
        }
        return response()->json([
            'id' => $product->id,
            'html' => $content
        ]);
    }

    public static function productDialog($request)
    {
        $tag = 'productDialog';

        if($request['product_id']){
            $tag .= $request['product_id'];
            $product = Article::where('id', (int)$request['product_id'])->first();
        } else {
            $product = null;
        }

        if($request['category_select']){
            $category_select = (int)$request['category_select'];
        } else {
            $category_select = 2;
        }

        $stores = Store::where('company_id', Auth::user()->id)->get();
        $category = Category::where('id', $category_select)->first();
        return response()->json([
            'tag' => $tag,
            'html' => view('product.dialog.form_product', compact('product', 'category', 'stores', 'request'))->render()
        ]);
    }

    public function dialogSearch(Request $request)
    {
        $products = Article::where(function($q) use ($request){
            if($request['store_id'] != NULL) {
                $q->whereHas('stores', function ($query) use ($request) {
                    return $query->where('store_id', $request['store_id']);
                });
            }
        })
        ->where(function($q) use ($request){
            $q->where('name', 'LIKE', '%' . $request['string'] .'%');
            $q->orWhere('article', 'LIKE', '%' . $request['string'] .'%');
            $q->orWhereHas('supplier', function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request['string'] .'%');
            });
        })

        ->orderBy('id', 'DESC')->limit(30)->get();

        $content = view('product.dialog.select_product_inner', compact('products', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

//    public static function editProductDialog($request)
//    {
//        $tag = 'editProduct';
//        if($request['product_id']){
//            $tag .= $request['product_id'];
//            $product = Article::where('id', (int)$request['product_id'])->first();
//        } else {
//            return response()->json(['message' => 'Недопустимое значение товара'], 500);
//        }
//        if($product){
//            $stores = Store::
//            where('company_id', Auth::user()->company()->first()->id)
//                ->with(['articles' => function($q) use ($product){
//                    $q->where('article_id', $product->id);
//                }])
//                ->get();
//        }
//
//        return response()->json(['tag' => $tag, 'html' => view('product.dialog.form_product', compact('product', 'stores'))->render()]);
//    }

    public function store(Request $request)
    {
        if($request['new_supplier_name'] != NULL && $request['supplier_id'] == NULL){
            $supplier = SupplierController::silent_store($request);
            $request['supplier_id'] = $supplier->id;
        }

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
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

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'event' => 'ProductStored',
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

        if($request['category_id'] === null || $request['serach'] != null){
            if($request['active_tab'] == "store"){
                $category = 2;
            }
        } else {
            $category = (int)$request['category_id'];
        }

        return Article::owned()->where(function($q) use ($request, $category){
            if($category != 0) {
                $q->where('category_id', $category);
            }
            if($request['search'] != null) {
                $q->where('name', 'LIKE', '%' . $request['search'] .'%');
                $q->orWhere('article', 'LIKE', '%' . $request['search'] .'%');
                $q->orWhere('barcode', 'LIKE', $request['search']);
                $q->orWhere('barcode_local', 'LIKE', $request['search']);
                $q->orWhere('storeCode', 'LIKE', $request['search']);
                $q->orWhereHas('supplier', function ($query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request['search'] .'%');
                });
            }
        })->orderBy('created_at', 'DESC')->paginate(21);
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

        return $rules;
    }

    public function search(Request $request){ //DEPRECATED

        $categories = CategoryController::getCategories($request, 'store');
        $cat_info = [];
        $cat_info['route'] = 'StoreIndex';
        $cat_info['params'] = ['active_tab' => 'store', 'target' => 'ajax-table-store'];
        $content = view('store.elements.table_container', compact('categories', 'cat_info', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-store',
        ], 200);
    }
}
