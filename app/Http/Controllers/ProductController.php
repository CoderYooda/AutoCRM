<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Requests\ProductRequest;
use App\Models\Adjustment;
use App\Models\Company;
use App\Models\Product;
use App\Models\Category;
use App\Models\Markup;
use App\Models\ProviderOrder;
use App\Models\Store;
use App\Models\Supplier;
use App\Models\System\Image;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    private static $root_category = 2;

    /** @var Product $product */
    public static $product = null;

    public static function chequeDialog(Request $request)
    {
        $cheque_types = [
            'Простой',
            'Штрих-код',
            'Этикетка',
            'Термопринтер (29х20мм)',
            'Термопринтер (58х40мм)'
        ];

        $tag = 'chequeDialog';

        $request->products = explode(',', $request->products);

        $products = Product::whereIn('id', $request->products)->get();

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.product.dialog.form_cheque', compact('products', 'request', 'tag', 'cheque_types'))->render()
        ]);
    }

    public function getByUpc(Request $request)
    {
        $product = Product::owned()->with('specifications', 'supplier', 'entrances', 'stores')->where('barcode', $request['upc'])->first();

        $availableCounts = DB::table('article_entrance')
            ->where('product_id', $product->id)
            ->selectRaw('id, product_id, SUM(count) as count, SUM(released_count) as released_count')
            ->get();

        $availableCount = $availableCounts->where('product_id', $product->id)->first();

        $product->available = $availableCount ? ($availableCount->count - $availableCount->released_count) : 0;
        $product->price = $request->refer == 'providerorderDialog' ? $product->getRetailPriceInCurrentStore() : $product->getPrice();
        $product->supplier_name = $product->supplier->name;
        $product->product_id = $product->id;
        $product->shipped_count = 0;

        return response()->json([
            'id' => $product->id ?? null,
            'product' => $product,
        ], 200);
    }

    public function delete(Request $request)
    {
        PermissionController::canByPregMatch('Удалять товары');

        $id = $request->id;

        $returnIds = null;

        if (is_array($id)) {
            $products = Product::owned()->whereIn('id', $id);
            $this->message = 'Товары удалены';
            $returnIds = $products->get()->pluck('id');
            $products->delete();
        }
        else {
            $product = Product::where('id', $id)->first();
            $this->message = 'Товар удален';
            $returnIds = $product->id;
            $product->delete();
        }

        $this->status = 200;

        return response()->json([
            'id' => $returnIds,
            'type' => 'success',
            'message' => $this->message
        ], $this->status);
    }

    public function getPrice(Product $product, Request $request)
    {
        return response()->json(['price' => $product->getPrice($request->count)]);
    }

    public function restore(Request $request)
    {
        PermissionController::canByPregMatch('Создавать товары');

        $id = $request->id;

        $returnIds = null;

        if (is_array($id)) {
            $products = Product::owned()->onlyTrashed()->whereIn('id', $id);
            $this->message = 'Товары восстановлены';
            $returnIds = $products->get()->pluck('id');
            $products->restore();
        }
        else {
            $product = Product::where('id', $id)->onlyTrashed()->first();
            $this->message = 'Товар восстановлен';
            $returnIds = $product->id;
            $product->restore();
        }

        $this->status = 200;

        return response()->json([
            'id' => $returnIds,
            'type' => 'success',
            'message' => $this->message
        ], $this->status);

//        $product->update(['deleted_at' => null]);
//
//        return response()->json([
//            'id' => $product->id,
//            'message' => 'Продукт был успешно восстановлен',
//            'type' => 'success'
//        ], 200);
    }

    public function addToList(Request $request)
    {
        if ($request['data'] != null && count($request['data']) > 0) {
            if ($request['type'] == 'providerorder') {
                $providerorder = ProviderOrder::find($request['providerorder_id']);
                $products = $providerorder->products()->whereIn('product_id', array_column($request['data'], 'id'))->get();
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
                $content = view(get_template() . '.entrance.dialog.product_element_array', compact('products', 'providerorder', 'request'))->render();
            }
            return response()->json([
                'products' => $products,
                'html' => $content
            ]);

        }

        $product = Product::find($request['article_id']);

        if (!$product) {
            return response()->json([
                'message' => 'Товар не найден, возможно он был удалён',
            ], 422);
        }

        if (!$product->canUserTake()) {
            return response()->json([
                'message' => 'Доступ к этому товару запрещен.',
            ], 422);
        }

        $paths = [
            'shipment' => '.shipments.dialog.product_element',
            'clientOrder' => '.client_orders.dialog.product_element',
            'providerOrder' => '.provider_orders.dialog.product_element',
            'adjustment' => '.adjustments.dialog.product_element',
            'order' => '.shop_orders.dialog.product_element'
        ];

        //Берем путь из массива или если нет, то стандартный
        $path = $paths[$request['type']] ?? '.entrance.dialog.product_element';

        $content = view(get_template() . $path, compact('product', 'request'));

        return response()->json([
            'product' => $product,
            'html' => $content->render()
        ]);
    }

    public static function productDialog(Request $request)
    {
        $product = Product::with('specifications', 'entrances', 'stores')->find($request['product_id']);

        $tag = 'productDialog' . ($product->id ?? '');

        if(!$product) {
            PermissionController::canByPregMatch('Создавать товары');
        }

        $category_select = $request['category_select'] ?? $product->category_id ?? 2;

        $user = Auth::user();

        $stores = Store::owned()->get();

        $company = Auth::user()->company;

        //Цена

        $priceSource = $company->getSettingField('Источник цены');

        $lastEntrancePrice = 0;

        if($product) {
            $lastEntrance = DB::table('article_entrance')->where('product_id', $product->id)->orderByDesc('id')->first();

            $lastEntrancePrice = $lastEntrance->price ?? 0;
        }

        $category = Category::find($category_select);

        //Поступления

        $entrances = [];

        $adjustmentEntrances = [];

        if($product) {

            $entrances = $product->entrances;

            $adjustmentEntrances = DB::table('article_entrance')
                ->where('product_id', $product->id)
                ->whereRaw('count != released_count')
                ->get();
        }

        Cache::put('user[' . Auth::id() . '][entrances]', $adjustmentEntrances);

        $prices = Markup::where('company_id', $user->company_id)->get();

        //Интернет-магазин

        $shopFields = [
            'sp_main' => [
                'name' => 'Показать на главной странице',
            ],
            'sp_stock' => [
                'name' => 'Акционный товар',
                'onclick' => 'toggleStock'
            ],
        ];

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.product.dialog.form_product', compact('product', 'category', 'company', 'prices', 'request', 'stores', 'shopFields', 'lastEntrancePrice', 'priceSource', 'adjustmentEntrances', 'entrances'))->render(),
            'product' => $product
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
        $request['root_category'] = $request['root_category'] ? $request['root_category'] : self::$root_category;
        $request['category_id'] = $request['category_id'] ? $request['category_id'] : self::$root_category;

        $products = Product::with('stores', 'supplier')->owned()->where(function ($q) use ($request) {
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
            ->latest()
            ->where('deleted_at', null)
            ->limit(30)
            ->get();

        $availableCounts = DB::table('article_entrance')
            ->whereIn('product_id', $products->pluck('id'))
            ->groupBy(['product_id'])
            ->selectRaw('id, product_id, SUM(count) as count, SUM(released_count) as released_count')
            ->get();

        foreach ($products as $index => $product) {

            $availableCount = $availableCounts->where('product_id', $product->id)->first();

            $products[$index]['available'] = $availableCount ? ($availableCount->count - $availableCount->released_count) : 0;
            $products[$index]['price'] = $request->refer == 'providerorderDialog' ? $product->getRetailPriceInCurrentStore() : $product->getPrice();
            $products[$index]['supplier_name'] = $product->supplier->name;
            $products[$index]['product_id'] = $product->id;
            $products[$index]['shipped_count'] = 0;

//            dd($product);
        }

        $categories = CategoryController::getModalCategories($request['root_category'], $request);

        $view = $request['inner'] ? 'select_product_inner' : 'select_product';

        $content = view(get_template() . '.product.dialog.' . $view, compact('products', 'categories', 'class', 'request'));

        return response()->json([
            'tag' => 'selectProductDialog',
            'html' => $content->render(),
            'products' => $products,
        ]);
    }

    public function store(ProductRequest $request)
    {
        PermissionController::canByPregMatch('Редактировать товары');

        return DB::transaction(function () use($request) {

            if ($request['id'] != null) { //товар редактируется
                $compare = ['id' => $request['id']];
            } else {
                $compare = ['article' => $request['article'], 'supplier_id' => (int)$request['supplier_id']];
            }

            $existed_article = self::checkArticleUnique($request['id'], $request['article'], (int)$request['supplier_id']);
            if ($existed_article) {
                return response()->json([
                    'system_message' => view(get_template() . '.messages.product_already_exist', compact('existed_article'))->render(),
                ], 422);
            }

            $product = Product::where('company_id', Auth::user()->company_id)->with('specifications')->firstOrNew($compare);
            if ($product->exists) {
                $this->message = 'Товар обновлен';
            } else {
                $product->creator_id = Auth::id();
                $product->company_id = Auth::user()->company_id;
                $this->message = 'Товар сохранён';
            }

            $currentStore = Store::find(Auth::user()->current_store);

            self::$product = $product;

            #Кроссы
            $product->fill($request->only($product->fields));

            $product->fillShopFields($request);

            $product->save();

            if($request->adjustment_entrances) {

                $oldEntrancesState = Cache::get('user[' . Auth::id() . '][entrances]');

                $productEntranceId = null;


                foreach ($request->adjustment_entrances as $entrance_id => $params) {

                    if($entrance_id == 'new') {

                        $params['price'] = $params['price'] ?? $params['price'] ?? 0;

                        $company = Company::where('id',$product->company_id)->first();
                        $priceSource = $company->getSettingField('Источник цены');

                        if($params['price'] < 1 && $priceSource != 'purchase') continue;

                        $fields = [
                            'product_id' => $product->id,
                            'entrance_id' => null,
                            'company_id' => $product->company_id,
                            'store_id' => $currentStore->id,
                            'count' => $params['count'],
                            'price' => $params['price']
                        ];

                        $productEntranceId = DB::table('article_entrance')->insertGetId($fields);
                    }
                    else {

                        $oldEntranceState = $oldEntrancesState->where('id', $entrance_id)->first();

                        $productEntranceId = $oldEntranceState->id;

                        if($oldEntranceState->count == $params['count'] && $oldEntranceState->price == $params['price']) continue;

                        DB::table('article_entrance')
                            ->where('id', $entrance_id)
                            ->update([
                                'price' => $params['price'],
                                'count' => $oldEntranceState->released_count + $params['count']
                            ]);
                    }

                    if(!isset($adjustment)) {
                        $adjustment = Adjustment::create([
                            'company_id' => Auth::user()->company_id,
                            'manager_id' => Auth::user()->partner->id,
                            'store_id'   => Auth::user()->current_store,
                            'comment'    => ''
                        ]);
                    }

                    DB::table('article_adjustment')->insert([
                        'product_id'          => $product->id,
                        'adjustment_id'       => $adjustment->id,
                        'product_entrance_id' => $productEntranceId,
                        'store_id'            => Auth::user()->current_store,
                        'count'               => $params['count'],
                        'prev_count'          => $entrance_id == 'new' ? 0 : $oldEntranceState->count,
                        'deviation_count'     => $entrance_id == 'new' ? 0 : $params['count'] - $oldEntranceState->count,
                        'price'               => $params['price'],
                        'prev_price'          => $entrance_id == 'new' ? 0 : $oldEntranceState->price,
                        'deviation_price'     => $entrance_id == 'new' ? 0 : $params['price'] - $oldEntranceState->price,
                        'total'               => $params['price'] * $params['count']
                    ]);
                }
            }

            if(isset($request->shop['specifications'])) {

                $attributes = [];

                foreach ($request->shop['specifications'] as $key => $specification) {
                    $attributes[$key]['name'] = Str::slug($specification['label']);
                    $attributes[$key]['label'] = $specification['label'];
                    $attributes[$key]['value'] = $specification['value'];
                }

                $product->specifications()->delete();
                $product->specifications()->createMany($attributes);
            }

            if($request['storage']) {

                $stores = Store::owned()->whereIn('id', array_keys($request['storage']))->get();

                foreach ($stores as $store) {

                    $storage = $request['storage'][$store->id];

                    $store->products()->syncWithoutDetaching($product->id);

                    $pivot_data = [
                        'storage_zone' => $storage['storage_zone'],
                        'storage_rack' => $storage['storage_rack'],
                        'storage_vertical' => $storage['storage_vertical'],
                        'storage_horizontal' => $storage['storage_horizontal'],
                        'min_stock' => $request->min_stock
                    ];

                    if(isset($storage['retail_price'])){
                        $pivot_data['retail_price'] = $storage['retail_price'];
                    }

                    $product->stores()->updateExistingPivot($store->id, $pivot_data);
                }
            }

            event(new ModelWasStored($product->company_id, 'ProductStored'));

            return response()->json([
                'message' => $this->message
            ]);

        });
    }

    public static function checkArticleUnique($id, $product, $brand_id) // Проверка на существование такого артикла + производителя в базе
    {
        $product = Product::where('article', $product)->where('supplier_id', $brand_id)->where('company_id', Auth::user()->company()->first()->id)->first();
        if ($product && $product->id != $id) {
            return $product;
        } else {
            return false;
        }
    }

    public static function getProducts(Request $request)
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
            $dir = 'DESC';
        }

        $company_id = Auth::user()->company_id;

        /** @var Category $category */
        $category = Category::find($request->category_id);

        $childrenCategories = collect();
        $deleted = null;

        if($category && !$category->isRoot()) {
            $childrenCategories = $category->getDescendantsAndSelf();
        }

        return Product::selectRaw('products.*, supplier.name as supplier')
            ->leftJoin('suppliers as supplier',  'products.supplier_id', '=', 'supplier.id')
            ->where('products.company_id', $company_id)
            ->when(isset($request->search) && $request->search != "", function ($q) use($request) {
                $q->where('products.foundstring', 'LIKE', '%' . search_formatter($request->search) . '%');
            })
            ->when($category && !$category->isRoot() && !$category->isTrashed(), function ($q) use($request, $childrenCategories) {
                $q->whereIn('products.category_id', $childrenCategories->pluck('id'));
            })
            ->when($request->analogues, function (Builder $query) use($request) {
                $query->whereIn('products.id', json_decode($request->analogues));
            })
            ->trashedCondition($category)
            ->orderBy($field, $dir)
            ->paginate($size);
    }

    public function deleteProduct(Request $request) {

        $category = Category::where('type','del')->first()->id;

        $fake_request = new Request();
        $fake_request['products'] = $request->products;
        $fake_request['category_id'] = $category;

        return $this->move($fake_request);

    }

    public function getCategoryById(Request $request) {

        $category =  Category::find($request->id);
        return response()->json([
            'type' => 'success',
            'category' => $category->toArray(),
        ]);
    }

    public static function searchByArticleAndBrand($articles)
    {
        if(!count($articles)) return collect();

        $prepare_data = [];

        foreach ($articles as $manufacture => $article) {
            $prepare_data[] = mb_strtolower($article . $manufacture);
        }

        return Product::owned()
            ->where(function (Builder $query) use($prepare_data) {
                foreach ($prepare_data as $string) {
                    $query->orWhere('foundstring', 'like', "{$string}%");
                }
            })
            ->get();
    }

    public function move(Request $request)
    {
        $products = json_decode($request->products);
        $category_id = $request->category_id;

        Product::whereIn('id', $products)->update(['category_id' => $category_id]);

        return response()->json([
            'type' => 'success',
            'message' => 'Перемещение произошло успешно.',
            'event' => 'CategorySelected'
        ]);
    }

    public function changeMarkupSource(Request $request)
    {
        $products = json_decode($request->products);

        Product::whereIn('id', $products)->update(['price_id' => $request->markup_source]);

        return response()->json([
            'type' => 'success',
            'message' => 'Источник наценки успешно изменен.'
        ]);
    }
}
