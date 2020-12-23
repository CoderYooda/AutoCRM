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

    public function index(Request $request)
    {
        $brands = $this->getUniqueBrands($request);

        return view('shop.search', compact('brands'))
            ->with('shop', $this->shop);
    }

    public function providerBrands(Request $request)
    {
        $brands = $this->getUniqueBrands($request);

        $view = view('shop.includes.search.brands', compact('brands'));

        return response()->json([
            'html' => $view->render(),
            'brands' => $brands
        ]);
    }

    private function getUniqueBrands(Request $request)
    {
        /** @var Providers $providers */
        $providers = app(Providers::class);

        $products = Article::with('supplier')->where('company_id', $this->shop->company_id)
            ->where('article', $request->search)
            ->get();

        $brands = [];

        if($this->shop->supplier_offers) {
            /** @var ProviderInterface $provider */
            foreach ($providers->activated() as $provider_key => $provider) {
                $brands = array_merge($brands, $provider->searchBrandsCount($request->search));
            }
        }

        foreach ($products as $product) {

            if($this->isBrandAlreadyInArray($product->supplier->name, $product->article, $brands)) continue;

            $brands[$product->supplier->name] = [
                'article' => $product->article,
                'desc' => $product->getShopName()
            ];
        }

        return $brands;
    }

    private function isBrandAlreadyInArray($searchBrand, $searchArticle, $brands)
    {
        foreach ($brands as $brand => $info) {
            if(strtoupper($brand) == strtoupper($searchBrand) && strtoupper($info['article']) == strtoupper($searchArticle)) return true;
        }

        return false;
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
            $this->applyPriceSettingsOnOrders($providersOrders[$provider_key]);
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

        $this->applyPriceSettingsOnOrders($orders);

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

    private function applyPriceSettingsOnOrders(array &$orders)
    {
        $price = $this->shop->price;

        foreach (['originals', 'analogues'] as $type) {
            foreach ($orders[$type] as $key => $order) {

                $productPrice = $order['price'];

                $percent = $price->getPercentByAmount($productPrice);

                $orders[$type][$key]['price'] = $productPrice + sum_percent($productPrice, $percent);
                $orders[$type][$key]['model']['hash_info']['price'] = $productPrice + sum_percent($productPrice, $percent);
            }
        }
    }
}
