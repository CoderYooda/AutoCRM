<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CategoryController;
use App\Model\Catalog\Product;
use App\Models\Adjustment;
use App\Models\Article;
use App\Models\Category;
use App\Models\ProviderOrder;
use App\Models\Shipment;
use App\Models\Store;
use App\Models\Supplier;
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

    public function delete($id, Request $request)
    {
        $returnIds = null;
        if($id == 'array'){
            $products = Article::owned()->whereIn('id', $request['ids']);
            $this->message = 'Товары удалены';
            $returnIds = $products->get()->pluck('id');
            $products->delete();
        } else {
            $product = Article::where('id', $id)->first();
            $this->message = 'Товар удален';
            $returnIds = $product->id;
            $product->delete();
        }
        $this->status = 200;


        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], $this->status);
    }

    public static function selectProductDialog($request)
    {
        $stores = Store::owned()->get();
        $products = Article::owned()->orderBy('id', 'DESC')->limit(10)->get();
        return response()->json([
            'tag' => 'selectProductDialog',
            'html' => view('product.dialog.select_product', compact('products', 'stores', 'request'))->render(),
        ]);
    }



    public function addToList(Request $request)
    {
        if($request['data'] != null && count($request['data']) > 0){
            if($request['type'] == 'providerorder'){
                $providerorder = ProviderOrder::owned()->where('id', $request['providerorder_id'])->first();
                $products = $providerorder->articles()->whereIn('article_id', array_column($request['data'], 'id'))->get();
                foreach($products as $product) {
                    foreach ($request['data'] as $item) {
                        if ($item['id'] === $product->id) {
                            $count = $item['count'];
                        }
                    }
                    if ($count != null) {
                        $product->count = $count;
                    } else {
                        $product->count = 0;
                    }
                }
                $content = view(env('DEFAULT_THEME', 'classic') . '.entrance.dialog.product_element_array', compact('products', 'providerorder', 'request'))->render();
            }
            return response()->json([
                'products' => $products,
                'html' => $content
            ]);

        }


        if($request['type'] && $request['type'] == 'clientOrder_quick'){

        } else {
            $article = Article::where('id', $request['article_id'])
                ->first();

            if(!$article){
                return response()->json([
                    'message' => 'Товар не найден, возможно он был удалён',
                ], 422);
            }
            if(!$article->canUserTake()){
                return response()->json([
                    'message' => 'Доступ к этому товару запрещен.',
                ], 422);
            }
        }

        if($request['type'] && $request['type'] === 'shipment'){
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.shipments.dialog.product_element', compact('product', 'request'))->render();

        } elseif($request['type'] && $request['type'] === 'clientOrder'){
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.product_element', compact('product', 'request'))->render();

        } elseif($request['type'] && $request['type'] === 'providerOrder'){
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.provider_orders.dialog.product_element', compact('product', 'request'))->render();

        } elseif($request['type'] && $request['type'] === 'clientOrder_quick') {
            $product = new StdClass();
            $product->id = $request['article_id'];
            $product->count = $request['count'];
            $product->price = 0;
            $product->total = 0;
            $content = view(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.quick_product_element', compact('product', 'request'))->render();

        } elseif($request['type'] && $request['type'] == 'adjustment'){
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.adjustments.dialog.product_element', compact('product','request'))->render();

        } else {
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.entrance.dialog.product_element', compact('product', 'request'))->render();

        }
        return response()->json([
            'product' => $product,
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
        $stores = Store::owned()->get();
        $products = Article::owned()->where(function($q) use ($request){
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
        ->orderBy('id', 'DESC')->limit(10)->get();

        $content = view('product.dialog.select_product_inner', compact('products', 'stores', 'request'))->render();
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

        $supplier = Supplier::owned()->where('id', $request['supplier_id'])->first();

        $article = Article::firstOrNew($compare);
            if($article->exists){
                $this->message = 'Товар обновлен';
            } else {
                $article->creator_id = Auth::user()->id;
                $article->company_id = Auth::user()->company()->first()->id;
                $this->message = 'Товар сохранён';
            }
        $article->fill($request->only($article->fields));

        $prepared_article = mb_strtolower (str_replace(' ', '', $request['article']));
        $prepared_supplier = mb_strtolower (str_replace(' ', '', $supplier->name));
        $prepared_name = mb_strtolower (str_replace(' ', '', $request['name']));
        $prepared_barcode = mb_strtolower (str_replace(' ', '', $request['barcode']));

        $article->foundstring = $prepared_article.$prepared_supplier.$prepared_barcode.$prepared_name;

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

        $size = 30;
        if(isset($request['size'])){
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if($field === null &&  $dir === null){
            $field = 'id';
            $dir = 'ASC';
        }

        $category = 0;

        if($request['category_id'] === null || $request['serach'] != null){
            if($request['active_tab'] == "store"){
                $category = 2;
            }
        } else {
            $category = (int)$request['category_id'];
        }
        return Article::
        join('suppliers','suppliers.id','=','articles.supplier_id')
        ->leftJoin('article_store', function($join)
        {
            $join->on('article_store.article_id', '=', 'articles.id')
                ->where('article_store.store_id', Auth::user()->getStoreFirst()->id);
        })
        ->select('suppliers.name as supplier',
            'article_store.count as isset',
            'article_store.midprice as price',
            'articles.*')
        ->where('articles.company_id', Auth::user()->company()->first()->id)
        ->where(function($q) use ($request){
            if(isset($request['search']) && $request['search'] != ""){
                $q->where('articles.foundstring', 'LIKE' , '%' . mb_strtolower (str_replace(' ', '', $request['search'])) . '%');
            }
        })
        ->where(function($q) use ($request){
            if(isset($request['category_id']) && $request['category_id'] != "" && $request['category_id'] != "null"){
                $q->where('articles.category_id', (int)$request['category_id']);
            }
        })
        ->orderBy($field, $dir)
        ->paginate($size);

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
