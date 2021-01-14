<?php

namespace App\Jobs;

use App\Events\StoreImportFinish;
use App\Events\StoreImportIteration;
use App\Models\Product;
use App\Models\Category;
use App\Models\Company;
use App\Models\Supplier;
use App\Models\User;
use App\Models\VehicleMark;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StoreImportProduct implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $products = [];
    protected $params = [];

    protected $vehicle_marks = [];

    protected $success_article_ids = [];

    public function __construct(array $params, array $products)
    {
        $this->params = $params;
        $this->products = $products;

        $this->vehicle_marks = VehicleMark::all();
    }

    public function handle()
    {
        $info = [
            'success'    => [],
            'duplicates' => [],
            'errors'     => []
        ];

        $count_products = count($this->products);

        $last_percent = 0;

        foreach ($this->products as $index => $attributes) {

            $response = $this->importProduct($attributes);

            $info[$response][] = [
                'line'    => $index,
                'article' => $attributes['article'] ?? 'Пусто'
            ];

            $current_percent = (int)($index * 100 / $count_products);

            if ($current_percent % 2 == 0) {

                if ($last_percent != $current_percent) {
                    $last_percent = $current_percent;
                    event(new StoreImportIteration($current_percent, $this->params['user_id']));
                }
            }
        }

        event(new StoreImportFinish($this->params, $info));

        $user = User::with('partner', 'company', 'partner.store')->find($this->params['user_id']);

        $company = Company::find($this->params['company_id']);

        Product::where('company_id', $company->id)
            ->where('price_id', 0)
            ->update(['price_id' => $company->prices->first()->id]);

        DB::table('import_history')->insert([
            'partner_id' => $user->partner->id,
            'company_id' => $user->company_id,
            'store_id'   => $user->partner->store->id,
            'list'       => implode(',', $this->success_article_ids),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }

    public function importProduct(array $attributes)
    {
        $store = $this->params['store'];
        $company_id = $this->params['company_id'];
        $user_id = $this->params['user_id'];

        #Проверка массива на правильность вхождения данных
        $validator = Validator::make($attributes, [
            'name'                 => ['string', 'max:255'],
            'manufacturer'         => ['required', 'string', 'max:255'],
            'article'              => ['required', 'string', 'max:64'],
            'categories'           => ['array'],
            'categories.*'         => ['string', 'max:200'],
            'warehouse'            => ['array'],
            'warehouse.*'          => ['string', 'max:2'],
            'count'                => ['integer', 'between:0,1000000'],
            'price'                => ['numeric', 'between:0,1000000'],
            'barcode_manufacturer' => ['string'],
            'barcode_warehouse'    => ['string']
        ]);

        if ($validator->fails()) {
            return 'errors';
        }

        $attributes = $validator->validated();

        $search_manufacturer_name = mb_strtoupper($attributes['manufacturer']);

        $supplier = Supplier::firstOrCreate(['company_id' => $company_id, 'name' => $search_manufacturer_name]);

        #Создание категорий по товару
        $category_id = count($attributes['categories']) != 0 ? 2 : 10;

        foreach ($attributes['categories'] as $category_name) {

            if (strlen($category_name) < 2) continue;

            $category_name = trim($category_name, ' ');

            $category = Category::updateOrCreate(['name' => $category_name, 'company_id' => $company_id, 'type' => 'store', 'category_id' => $category_id], [
                'name'        => $category_name,
                'company_id'  => $company_id,
                'creator_id'  => $user_id,
                'category_id' => $category_id,
                'type'        => 'store'
            ]);

            $category_id = $category->id;
        }

        $product = Product::updateOrCreate(['company_id' => $company_id, 'article' => Product::makeCorrectArticle($attributes['article']), 'supplier_id' => $supplier->id], [
            'name'          => $attributes['name'],
            'creator_id'    => $user_id,
            'supplier_id'   => $supplier->id,
            'barcode'       => $attributes['barcode_manufacturer'],
            'barcode_local' => $attributes['barcode_warehouse']
        ]);

        if ((int)$attributes['count'] > 0) {
            DB::table('article_entrance')->insert([
                'product_id'     => $product->id,
                'entrance_id'    => null,
                'company_id'     => $company_id,
                'store_id'       => $store->id,
                'count'          => $attributes['count'],
                'price'          => $attributes['price'],
                'released_count' => 0,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now()
            ]);
        }

        if (!$product->wasRecentlyCreated) {
            return 'duplicates';
        }

        #Запись склада по товару
        $store->products()->syncWithoutDetaching($product->id);

        $product->update(['category_id' => $category_id]);

        $product->stores()->updateExistingPivot($store->id, [
            'retail_price'       => $attributes['price'],
            'storage_zone'       => $attributes['warehouse'][0] ?? '',
            'storage_rack'       => $attributes['warehouse'][1] ?? '',
            'storage_vertical'   => $attributes['warehouse'][2] ?? '',
            'storage_horizontal' => $attributes['warehouse'][3] ?? '',
        ]);

        $this->success_article_ids[] = $product->id;

        return 'success';
    }
}
