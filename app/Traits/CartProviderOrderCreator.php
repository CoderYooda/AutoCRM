<?php


namespace App\Traits;

use App\Http\Controllers\SupplierController;
use App\Http\Requests\SupplierRequest;
use App\Models\Product;
use App\Models\Partner;
use App\Models\ProviderOrder;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait CartProviderOrderCreator
{
    public function createProviderOrder(array $data)
    {
        $products = [];

        $supplierController = new SupplierController();
        $supplierRequest = new SupplierRequest();
        $currentStore = Store::query()->find(Auth::user()->current_store);

        $totalPrice = 0;
        $totalCount = 0;

        foreach ($data['orders'] as $order) {
            $orderInfo = json_decode($order->data, true);

            //Создание производителя
            $supplierRequest['name'] = $orderInfo['model']['hash_info']['manufacturer'];

            $supplierController->store($supplierRequest);
            $supplier = $supplierController::$supplier;

            //Создание продукта

            $uniqueFields = [
                'supplier_id' => $supplier->id,
                'article' => $orderInfo['model']['hash_info']['article']
            ];

            $dataFields = [
                'company_id' => $this->company->id,
                'category_id' => 10,
                'creator_id' => $this->user->id,
                'supplier_id' => $supplier->id,
                'article' => $orderInfo['model']['hash_info']['article'],
                'name' => $orderInfo['model']['hash_info']['desc'],
                'price_id' => $this->company->getSettingField('Источник формирования цены для новых товаров')
            ];

            $product = Product::firstOrCreate($uniqueFields, $dataFields);

            if($product->wasRecentlyCreated) {

                $currentStore->products()->syncWithoutDetaching($product->id);

                $product->stores()->updateExistingPivot($currentStore->id,['retail_price' => $orderInfo['model']['hash_info']['price'] ]);


                DB::table('article_entrance')->insert([
                    'product_id' => $product->id,
                    'entrance_id' => null,
                    'company_id' => $product->company_id,
                    'store_id' => $currentStore->id,
                    'count' => 0,
                    'price' => $orderInfo['model']['hash_info']['price']
                ]);
            }

            $products[] = [
                'id' => $product->id,
                'count' => $order->count,
                'price' => $orderInfo['model']['hash_info']['price']
            ];

            $totalPrice += $orderInfo['model']['hash_info']['price'] * $order->count;
            $totalCount += $order->count;
        }

        $providerPartner = Partner::firstOrCreate([
            'company_id' => $this->company->id,
            'category_id' => 6,
            'store_id' => $this->user->current_store,
            'type' => 2,
            'comment' => 'Автоматически созданный контакт',
            'opf' => 'ООО',
            'companyName' => $this->name,
        ]);

        $providerOrder = ProviderOrder::create([
            'company_id' => $this->company->id,
            'store_id' => $this->user->current_store,
            'partner_id' => $providerPartner->id,
            'manager_id' => $this->user->partner->id,
            'nds' => 1,
            'nds_included' => 1,
            'summ' => $totalPrice
        ]);

        foreach ($products as $product) {

            $totalPrice = ($product['price'] * $product['count']);

            DB::table('article_provider_orders')->insert([
                'product_id' => $product['id'],
                'provider_order_id' => $providerOrder->id,
                'count' => $product['count'],
                'price' => $product['price'],
                'total' => $totalPrice,
                'nds' => ($totalPrice / 100) * 20,
                'nds_percent' => 20,
                'nds_included' => 1
            ]);
        }
    }
}
