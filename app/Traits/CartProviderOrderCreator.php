<?php


namespace App\Traits;


use App\Http\Controllers\SupplierController;
use App\Http\Requests\SupplierRequest;
use App\Models\Article;
use App\Models\Partner;
use App\Models\ProviderOrder;
use Illuminate\Support\Facades\DB;

trait CartProviderOrderCreator
{
    public function createProviderOrder(array $data)
    {
        $products = [];

        $supplierController = new SupplierController();
        $supplierRequest = new SupplierRequest();

        $totalPrice = 0;
        $totalCount = 0;

        foreach ($data['orders'] as $order) {
            $orderInfo = json_decode($order->data, true);

            //Создание производителя
            $supplierRequest['name'] = $orderInfo['brand'];

            $supplierController->store($supplierRequest);
            $supplier = $supplierController::$supplier;

            //Создание продукта

            $uniqueFields = [
                'supplier_id' => $supplier->id,
                'article' => $orderInfo['hash_info']['article']
            ];

            $dataFields = [
                'company_id' => $this->company->id,
                'category_id' => 2,
                'creator_id' => $this->user->id,
                'supplier_id' => $supplier->id,
                'foundstring' => Article::makeFoundString($orderInfo['hash_info']['article'] . $supplier->name . $orderInfo['description']),
                'article' => $orderInfo['hash_info']['article'],
                'name' => $orderInfo['description'],
                'fapi_id' => $supplier->fapi_id ?? null
            ];

            $product = Article::firstOrCreate($uniqueFields, $dataFields);

            $products[] = [
                'id' => $product->id,
                'count' => $order->count,
                'price' => $orderInfo['hash_info']['price']
            ];

            $totalPrice += $orderInfo['hash_info']['price'] * $order->count;
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
            'itogo' => $totalPrice
        ]);

        foreach ($products as $product) {

            $totalPrice = ($product['price'] * $product['count']);

            DB::table('article_provider_orders')->insert([
                'article_id' => $product['id'],
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
