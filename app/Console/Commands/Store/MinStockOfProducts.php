<?php

namespace App\Console\Commands\Store;

use App\Models\Store;
use App\Models\System\StockOfProduct;
use App\Traits\OwnedTrait;
use Illuminate\Console\Command;
use SystemMessage;


class MinStockOfProducts extends Command
{
    use OwnedTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product:checkOutOfStock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Уведомление о том, что на складе кончается товар';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $stores = Store::with('products')->get();

        foreach ($stores as $store) {

            $items = [];
            foreach ($store->products as $product) {

                $countInStore = $product->getCountInStoreId($store->id);
                $minCount = $product->pivot->min_stock;;

                if ($countInStore < $minCount) {
                    $items[] = [
                        'price' => floatval($product->pivot->retail_price),
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'product_article' => $product->article
                    ];

                }
            }


            if ($items != []) {

                $latestStocks = StockOfProduct::where('company_id', $store->company_id)->latest()->first();
                $latestArray = json_decode($latestStocks->data, true);
                $newArray = $items;
                if (array_diff_assoc_recursive($latestArray, $newArray) != 0) {

                    $stocks = new StockOfProduct();
                    $stocks->company_id = $store->company_id;
                    $stocks->data = json_encode($items);
                    $stocks->processed = false;
                    $stocks->save();

                    SystemMessage::sendToCompany(
                        $store->company_id,
                        'warning',
                        'На складе кончаются товары, нажмите чтобы посмотреть',
                        $stocks,
                        'App\Events\SystemMessage');

                }
            }
        }
    }

}
