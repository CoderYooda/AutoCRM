<?php

namespace App\Http\Controllers\Shop;

use App\Models\Article;
use App\Models\Shop;
use App\Models\Supplier;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ShopManager\ShopManager;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index(Request $request, Providers $providers)
    {
        $brands = [];

        if($this->shop->supplier_offers) {

            /** @var ProviderInterface $provider */
            foreach ($providers->activated() as $provider_key => $provider) {

                $brands = array_merge($brands, $provider->searchBrandsCount($request->search));
            }
        }

        $brands = array_unique($brands);

        return view('shop.search', compact('brands'))
            ->with('shop', $this->shop);
    }

    public function providerBrands(Request $request, Providers $providers)
    {
        $provider = $providers->find($request->selected_provider);

        $brands = $provider->searchBrandsCount($request->search);

        $view = view('shop.includes.search.brands', compact('brands'))
            ->with('provider_key', $request->selected_provider);

        return response()->json([
            'html' => $view->render(),
            'brands' => $brands
        ]);
    }

    public function providerOffers(Request $request, Providers $providers)
    {
        $product = Article::with('stores')
            ->where('company_id', $this->shop->company_id)
            ->where('article', $request->article)
            ->whereHas('supplier', function (Builder $query) use($request) {
                $query->where('name', $request->manufacturer);
            })
            ->first();

        $providersOrders = [];

        foreach ($providers->activated() as $provider_key => $provider) {
            $providersOrders[$provider_key] = $provider->getStoresByArticleAndBrand($request->article, $request->manufacturer);
        }

        $view = view('shop.includes.search.warehouses', compact('product', 'providersOrders'))
            ->with('shop', $this->shop);

        return response()->json([
            'html' => $view->render(),
            'providers' => $providersOrders,
            'product' => $product
        ]);
    }

    public function providerOffersFilter(Request $request, Providers $providers)
    {
        $provider = $providers->find($request->selected_service);

        $orders = $provider->getStoresByArticleAndBrand($request->article, $request->manufacturer);

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
