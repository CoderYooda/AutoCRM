<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CategoryController;
use App\Http\Requests\ProductRequest;
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
use Illuminate\Support\Facades\Gate;
use stdClass;

class ProductController extends Controller
{
    private static $root_category = 2;

    public function _construct()
    {
        $status = 500;
        $message = 'Внутренняя ошибка сервера';
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять товары');
        $returnIds = null;
        if ($id == 'array') {
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

    public function addToList(Request $request)
    {
        if ($request['data'] != null && count($request['data']) > 0) {
            if ($request['type'] == 'providerorder') {
                $providerorder = ProviderOrder::owned()->where('id', $request['providerorder_id'])->first();
                $products = $providerorder->articles()->whereIn('article_id', array_column($request['data'], 'id'))->get();
                foreach ($products as $product) {
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


        if ($request['type'] && $request['type'] == 'clientOrder_quick') {

        } else {
            $article = Article::where('id', $request['article_id'])
                ->first();

            if (!$article) {
                return response()->json([
                    'message' => 'Товар не найден, возможно он был удалён',
                ], 422);
            }
            if (!$article->canUserTake()) {
                return response()->json([
                    'message' => 'Доступ к этому товару запрещен.',
                ], 422);
            }
        }

        if ($request['type'] && $request['type'] === 'shipment') {
            $product = $article;

            $content = view(env('DEFAULT_THEME', 'classic') . '.shipments.dialog.product_element', compact('product','request'))->render();

        } elseif ($request['type'] && $request['type'] === 'clientOrder') {
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.product_element', compact('product','request'))->render();

        } elseif ($request['type'] && $request['type'] === 'providerOrder') {
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.provider_orders.dialog.product_element', compact('product', 'request'))->render();

        } elseif ($request['type'] && $request['type'] === 'clientOrder_quick') {
            $product = new StdClass();
            $product->id = $request['article_id'];
            $product->count = $request['count'];
            $product->price = 0;
            $product->total = 0;
            $content = view(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.quick_product_element', compact('product', 'request'))->render();

        } elseif ($request['type'] && $request['type'] == 'adjustment') {
            $product = $article;
            $content = view(env('DEFAULT_THEME', 'classic') . '.adjustments.dialog.product_element', compact('product', 'request'))->render();

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
        PermissionController::canByPregMatch('Смотреть товары');

        $tag = 'productDialog';

        if ($request['product_id']) {
            $tag .= $request['product_id'];
            $product = Article::where('id', (int)$request['product_id'])->first();
        } else {
            PermissionController::canByPregMatch('Создавать товары');
            $product = null;
        }

        if ($request['category_select']) {
            $category_select = (int)$request['category_select'];
        } else {
            $category_select = 2;
        }

        $stores = Store::owned()->get();
        $category = Category::where('id', $category_select)->first();
        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.product.dialog.form_product', compact('product', 'category', 'stores', 'request'))->render()
        ]);
    }

    public static function selectProductDialog($request)
    {
        return self::selectProductInner($request);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectProductInner($request);
    }

    private static function selectProductInner($request)
    {
        $class = 'selectProductDialog';
        $stores = Store::owned()->get();
        $request['root_category'] = $request['root_category'] ? $request['root_category'] : self::$root_category;
        $request['category_id'] = $request['category_id'] ? $request['category_id'] : self::$root_category;

        $products = Article::owned()->where(function ($q) use ($request) {
            if ($request['store_id'] != null) {
                $q->whereHas('stores', function ($query) use ($request) {
                    return $query->where('store_id', $request['store_id']);
                });
            }
        })

            ->when($request['string'], function($q) use ($request){
                $q->where('foundstring', 'LIKE', '%' .  str_replace(array('(', ')', ' ', '-'), '', $request['string']) .'%');
            })

            ->when(!$request['string'], function($q) use ($request){
                $q->when($request['category_id'], function ($q) use ($request) {
                    $q->where('category_id', $request['category_id']);
                });
            })
            ->orderBy('created_at', 'ASC')
            ->limit(30)
            ->get();
        $categories = CategoryController::getModalCategories($request['root_category'], $request);

        $view = $request['inner'] ? 'select_product_inner' : 'select_product';

        $content = view(env('DEFAULT_THEME', 'classic') . '.product.dialog.' . $view, compact('products', 'stores', 'categories', 'class', 'request'))->render();
        return response()->json([
            'tag' => 'selectProductDialog',
            'html' => $content
        ]);
    }

    public function store(ProductRequest $request)
    {
        PermissionController::canByPregMatch('Редактировать товары');

        if ($request['id'] != null) { //товар редактируется
            $compare = ['id' => $request['id']];
        } else {
            $compare = ['article' => $request['article'], 'supplier_id' => (int)$request['supplier_id']];
        }

        $existed_article = self::checkArticleUnique($request['id'], $request['article'], (int)$request['supplier_id']);
        if ($existed_article) {
            return response()->json([
                'system_message' => view(env('DEFAULT_THEME', 'classic') . '.messages.product_already_exist', compact('existed_article'))->render(),
            ], 422);
        }

        $supplier = Supplier::owned()->where('id', $request['supplier_id'])->first();

        $article = Article::firstOrNew($compare);
        if ($article->exists) {
            $this->message = 'Товар обновлен';
        } else {
            $article->creator_id = Auth::user()->id;
            $article->company_id = Auth::user()->company()->first()->id;
            $this->message = 'Товар сохранён';
        }
        $article->fill($request->only($article->fields));

        $prepared_article = mb_strtolower(str_replace(' ', '', $request['article']));
        $prepared_supplier = mb_strtolower(str_replace(' ', '', $supplier->name));
        $prepared_name = mb_strtolower(str_replace(' ', '', $request['name']));
        $prepared_barcode = mb_strtolower(str_replace(' ', '', $request['barcode']));

        $article->foundstring = str_replace(["-","!","?",".", ""],  "", trim($prepared_article . $prepared_supplier . $prepared_barcode . $prepared_name));

        $article->save();
        $this->status = 200;
        if($request['storage'] != null){
            foreach ($request['storage'] as $store_id => $storage){
                $store = Store::where('id', $store_id)->first();
                if (Auth::user()->company()->first()->checkAccessToStore($store)) {
                    $this->status = 403;
                    $this->message = 'Магазин, в который Вы сохраняете, Вам не принадлежит';
                    return response()->json(['message' => $this->message], $this->status);
                }
                $store->articles()->syncWithoutDetaching($article->id);

                $article->stores()->updateExistingPivot($store_id, ['storage_zone' => $storage['storage_zone']]);
                $article->stores()->updateExistingPivot($store_id, ['storage_rack' => $storage['storage_rack']]);
                $article->stores()->updateExistingPivot($store_id, ['storage_vertical' => $storage['storage_vertical']]);
                $article->stores()->updateExistingPivot($store_id, ['storage_horizontal' => $storage['storage_horizontal']]);
            }
        }

        if ($request['store'] != null) {
            foreach ($request['store'] as $id => $store_elem) {
                $store = Store::where('id', $id)->first();
                if (!Auth::user()->company()->first()->checkAccessToStore($store)) {
                    $this->status = 403;
                    $this->message = 'Магазин, в который Вы сохраняете, Вам не принадлежит';
                    return response()->json(['message' => $this->message], $this->status);
                }
                if (isset($store_elem['isset']) && $store_elem['isset'] == true) {
                    $store->articles()->syncWithoutDetaching($article->id);


                    $article->stores()->updateExistingPivot($id, ['location' => $store_elem['location']]);
                    $article->stores()->updateExistingPivot($id, ['isset' => $store_elem['isset']]);
                } else {
                    $article->stores()->updateExistingPivot($id, ['isset' => false]);
                }
            }
        }

        if ($request->expectsJson()) {
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
        if ($article && $article->id != $id) {
            return $article;
        } else {
            return false;
        }
    }

    public static function getArticles($request)
    {

        $size = 30;
        if (isset($request['size'])) {
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if (isset($request['sorters'])) {
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if ($field === null && $dir === null) {
            $field = 'id';
            $dir = 'ASC';
        }

        $category = 0;

        if ($request['category_id'] === null || $request['serach'] != null) {
            if ($request['active_tab'] == "store") {
                $category = 2;
            }
        } else {
            $category = (int)$request['category_id'];
        }

        return Article::where('articles.company_id', Auth::user()->company()->first()->id)
            ->where(function ($q) use ($request) {
                if (isset($request->search) && $request->search != "") {
                    $q->where('articles.foundstring', 'LIKE', '%' . $request->search . '%');
                }
            })
            ->where(function ($q) use ($request) {
                if (isset($request['category_id']) && $request['category_id'] != "" && $request['category_id'] != self::$root_category && $request['category_id'] != "null") {
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

}
