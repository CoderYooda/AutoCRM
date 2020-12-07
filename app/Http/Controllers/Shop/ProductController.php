<?php

namespace App\Http\Controllers\Shop;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ShopManager\ShopManager;
use Illuminate\Http\Request;

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

        if($this->shop->supplier_offers) {
            /** @var Providers $providers */
            $providers = app(Providers::class);

            /** @var ProviderInterface $provider */
            foreach ($providers->activated() as $provider_key => $provider) {

                $providersOrders[$provider_key] = $provider->getStoresByArticleAndBrand($product->article, $product->supplier->name);

                foreach (['originals', 'analogues'] as $type) {

                    foreach ($providersOrders[$provider_key][$type] as $key => $order) {

                        $price = $order['price'];

                        $providersOrders[$provider_key][$type][$key]['price'] = $price + sum_percent($price, $this->shop->supplier_percent);
                        $providersOrders[$provider_key][$type][$key]['model']['hash_info']['price'] = $price + sum_percent($price, $this->shop->supplier_percent);
                    }
                }
            }
        }

        $view = view('shop.includes.product_analogues', compact('providersOrders'))
            ->with('shop', $this->shop);

        return response()->json([
            'html' => $view->render(),
            'providers' => $providersOrders
        ]);
    }

    public function analoguesFilter(Article $product, Request $request)
    {
        /** @var Providers $providers */
        $providers = app(Providers::class);

        /** @var ProviderInterface $provider */
        $provider = $providers->find($request->selected_service);

        $orders = $provider->getStoresByArticleAndBrand($product->article, $product->supplier->name);

        foreach (['originals', 'analogues'] as $type) {

            foreach ($orders[$type] as $key => $order) {

                $price = $order['price'];

                $orders[$type][$key]['price'] = $price + sum_percent($price, $this->shop->supplier_percent);
                $orders[$type][$key]['model']['hash_info']['price'] = $price + sum_percent($price, $this->shop->supplier_percent);
            }
        }

        $orders = collect($orders);

        foreach (['originals', 'analogues'] as $type) {

            if($request->field) {
                $orders[$type] = collect($orders[$type])->sortBy($request->field, $request->is_desc ? SORT_DESC : SORT_ASC)->toArray();
            }

            if($request->is_desc == true) $orders[$type] = array_reverse($orders[$type]);
        }

        $orders = $orders->toArray();

        $view = view('shop.includes.analogues_body', compact('orders'))
            ->with('shop', $this->shop)
            ->with('type', $request->type);

        return response()->json([
            'html' => $view->render(),
            'orders' => $orders
        ]);
    }
}
