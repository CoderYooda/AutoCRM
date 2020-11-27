<?php

namespace App\Http\Controllers\Shop;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ShopManager\ShopManager;

class ProductController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function info(Article $product)
    {
        $view = view('shop.modal.product_info', compact('product'));

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function analogues(Article $product)
    {
        $providersOrders = [];

        $counts = [];

        if($this->shop->supplier_offers) {
            /** @var Providers $providers */
            $providers = app(Providers::class);

            /** @var ProviderInterface $provider */
            foreach ($providers->activated() as $provider_key => $provider) {

                $counts[$provider_key]['originals'] = 0;
                $counts[$provider_key]['analogues'] = 0;

                $providersOrders[$provider_key] = $provider->getStoresByArticleAndBrand($product->article, $product->supplier->name);

                foreach ($providersOrders[$provider_key] as $key => $order) {

                    $counts[$provider_key][$order['is_analogue'] ?  'analogues' : 'originals']++;

                    $price = $providersOrders[$provider_key][$key]['price'];

                    $providersOrders[$provider_key][$key]['price'] = $price + sum_percent($price, $this->shop->supplier_percent);
                    $providersOrders[$provider_key][$key]['model']['hash_info']['price'] = $price + sum_percent($price, $this->shop->supplier_percent);
                }
            }
        }

        $view = view('shop.includes.product_analogues', compact('providersOrders', 'counts'))
            ->with('shop', $this->shop);

        return response()->json([
            'html' => $view->render(),
            'providers' => $providersOrders
        ]);
    }
}
