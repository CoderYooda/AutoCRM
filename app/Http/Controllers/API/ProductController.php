<?php

namespace App\Http\Controllers\API;

use App\Events\ModelWasStored;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionController;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /** @var Product $product */
    public static $product = null;

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

            $product = Product::with('specifications')->firstOrNew($compare);
            if ($product->exists) {
                $this->message = 'Товар обновлен';
            } else {
                $product->creator_id = Auth::id();
                $product->company_id = Auth::user()->company_id;
                $this->message = 'Товар сохранён';
            }

            self::$product = $product;

            #Кроссы
            $product->fill($request->only($product->fields));

            $product->fillShopFields($request);

            $product->save();

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
                        'storage_horizontal' => $storage['storage_horizontal']
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
        $product = Product::where('article', $product)->where('supplier_id', $brand_id)
            ->where('company_id', Auth::user()->company()->first()->id)
            ->first();

        if ($product && $product->id != $id) {
            return $product;
        } else {
            return false;
        }
    }
}
