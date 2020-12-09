<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Article;
use App\Models\Category;
use App\Models\ProviderOrder;
use App\Models\Store;
use App\Models\Supplier;
use App\Models\System\Image;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    private static $root_category = 2;

    /** @var Article $product */
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

        $products = Article::whereIn('id', $request->products)->get();

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.product.dialog.form_cheque', compact('products', 'request', 'tag', 'cheque_types'))->render()
        ]);
    }

    public function getByUpc(Request $request)
    {
        $product = Article::owned()->where('barcode', $request['upc'])->first();

        return response()->json([
            'id' => $product->id ?? null,
        ], 200);
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
        }
        else {
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

    public function getPrice(Article $product, Request $request)
    {
        return response()->json(['price' => $product->getPrice($request->count)]);
    }

    public function restore(Article $product)
    {
        $product->update(['deleted_at' => null]);

        return response()->json([
            'id' => $product->id,
            'message' => 'Продукт был успешно восстановлен',
            'type' => 'success'
        ], 200);
    }

    public function addToList(Request $request)
    {
        if ($request['data'] != null && count($request['data']) > 0) {
            if ($request['type'] == 'providerorder') {
                $providerorder = ProviderOrder::find($request['providerorder_id']);
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
                $content = view(get_template() . '.entrance.dialog.product_element_array', compact('products', 'providerorder', 'request'))->render();
            }
            return response()->json([
                'products' => $products,
                'html' => $content
            ]);

        }

        $product = Article::find($request['article_id']);

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
        $product = Article::with('specifications', 'entrances', 'stores')->find($request['product_id']);

        $tag = 'productDialog' . ($product->id ?? '');

        if(!$product) {
            PermissionController::canByPregMatch('Создавать товары');
        }

        $category_select = $request['category_select'] ?? $product->category_id ?? 2;

        $stores = Store::owned()->get();

        $company = Auth::user()->company;

        $priceSource = $company->getSettingField('Источник цены');
        $globalMarkup = $company->getSettingField('Стандартная наценка (%)');

        $lastEntrance = DB::table('article_entrance')->where('article_id', $product->id)->orderByDesc('id')->first();

        $lastEntrancePrice = $lastEntrance->price ?? 0;

        $category = Category::find($category_select);

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
            'html' => view(get_template() . '.product.dialog.form_product', compact('product', 'category', 'company', 'request', 'stores', 'shopFields', 'globalMarkup', 'lastEntrancePrice', 'priceSource'))->render(),
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

        $products = Article::with('stores', 'supplier')->owned()->where(function ($q) use ($request) {
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
            ->whereIn('article_id', $products->pluck('id'))
            ->groupBy(['article_id'])
            ->selectRaw('id, article_id, SUM(count) as count, SUM(released_count) as released_count')
            ->get();

        foreach ($products as $product) {

            $availableCount = $availableCounts->where('article_id', $product->id)->first();

            $product->available = $availableCount ? ($availableCount->count - $availableCount->released_count) : 0;
            $product->price = $product->getPrice();
            $product->supplier_name = $product->supplier->name;
            $product->product_id = $product->id;
            $product->shipped_count = 0;
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

            $article = Article::with('specifications')->firstOrNew($compare);
            if ($article->exists) {
                $this->message = 'Товар обновлен';
            } else {
                $article->creator_id = Auth::id();
                $article->company_id = Auth::user()->company_id;
                $this->message = 'Товар сохранён';
            }

            self::$product = $article;

            #Кроссы
            $article->fill($request->only($article->fields));

            $article->fillShopFields($request);

            $article->slug = Str::slug($request->name . '-' . $article->id);

            $article->save();

            if(isset($request->shop['specifications'])) {

                $attributes = [];

                foreach ($request->shop['specifications'] as $key => $specification) {
                    $attributes[$key]['name'] = Str::slug($specification['label']);
                    $attributes[$key]['label'] = $specification['label'];
                    $attributes[$key]['value'] = $specification['value'];
                }

                $article->specifications()->delete();
                $article->specifications()->createMany($attributes);
            }

            $this->status = 200;
            if($request['storage']) {

                $stores = Store::owned()->whereIn('id', array_keys($request['storage']))->get();

                foreach ($stores as $store) {

                    $storage = $request['storage'][$store->id];

                    $store->articles()->syncWithoutDetaching($article->id);

                    $pivot_data = [
                        'storage_zone' => $storage['storage_zone'],
                        'storage_rack' => $storage['storage_rack'],
                        'storage_vertical' => $storage['storage_vertical'],
                        'storage_horizontal' => $storage['storage_horizontal']
                    ];

                    if(isset($storage['retail_price'])){
                        $pivot_data['retail_price'] = $storage['retail_price'];
                    }

                    $article->stores()->updateExistingPivot($store->id, $pivot_data);
                }
            }

            return response()->json([
                'message' => $this->message,
                'event' => 'ProductStored',
            ], $this->status);

        });
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

    public static function getArticles(Request $request)
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

        //$search = str_replace(['-'], '', $request->search));

        $articles = Article::selectRaw('articles.*, supplier.name as supplier')
            ->leftJoin('suppliers as supplier',  'articles.supplier_id', '=', 'supplier.id')
            ->where('articles.company_id', $company_id)
            ->when(isset($request->search) && $request->search != "", function ($q) use($request) {
                $q->where('articles.foundstring', 'LIKE', '%' . search_formatter($request->search) . '%');
            })
            ->when(isset($request['category_id']) && $request['category_id'] != "" && $request['category_id'] != self::$root_category && $request['category_id'] != "null", function ($q) use($request) {
                $q->where('articles.category_id', (int)$request['category_id']);
            })
            ->when($request->analogues, function (Builder $query) use($request) {
                $query->whereIn('articles.id', json_decode($request->analogues));
            })
            ->where('deleted_at', null) #fix soft delete
            ->orderBy($field, $dir)
            ->paginate($size);

        return $articles;
    }

    public static function searchByArticleAndBrand($articles)
    {
        if(!count($articles)) return collect();

        $prepare_data = [];

        foreach ($articles as $manufacture => $article) {
            $prepare_data[] = mb_strtolower($article . $manufacture);
        }

        return Article::owned()
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

        Article::whereIn('id', $products)->update(['category_id' => $category_id]);

        return response()->json([
            'type' => 'success',
            'message' => 'Перемещение произошло успешно.',
            'event' => 'CategorySelected'
        ]);
    }

    public function changeMarkupSource(Request $request)
    {
        $products = json_decode($request->products);
        $source = $request->markup_source;

        Article::whereIn('id', $products)->update(['markup_source' => $source]);

        return response()->json([
            'type' => 'success',
            'message' => 'Источник наценки успешно изменен.'
        ]);
    }
}
