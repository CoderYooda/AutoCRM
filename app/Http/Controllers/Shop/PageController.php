<?php

namespace App\Http\Controllers\Shop;

use App\Models\Product;
use App\Models\Category;
use App\Models\Company;
use App\Models\Shop;
use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ShopManager\ShopManager;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PageController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index()
    {
        $params = [
            'type' => 'store',
            'category_id' => 2,
            'company_id' => $this->shop->company_id
        ];

        $categories = Category::with('image')->where($params)->paginate(8);

        $stockProducts = Product::with('company', 'stores', 'supplier', 'image', 'markup')
            ->where('company_id', $this->shop->company_id)
            ->where('sp_main', 1)
            ->get();

        return view('shop.index', compact('categories', 'stockProducts'))
            ->with('shop', $this->shop);
    }

    public function about()
    {
        return view('shop.about-company')->with('shop', $this->shop);
    }

    public function delivery()
    {
        return view('shop.delivery')->with('shop', $this->shop);
    }

    public function warranty()
    {
        return view('shop.warranty')->with('shop', $this->shop);
    }

    public function contacts()
    {
        return view('shop.contacts')->with('shop', $this->shop);
    }

    public function catalogue()
    {
        $params = [
            'type' => 'store',
            'category_id' => 2,
            'company_id' => $this->shop->company_id
        ];

        $categories = Category::with('image')->where($params)->paginate(12);

        return view('shop.catalogue', compact('categories'))
            ->with('shop', $this->shop);
    }

    public function personalData()
    {
        return view('shop.personal_data')
            ->with('shop', $this->shop);
    }

    public function show(string $path)
    {
        $slugs = explode('/', $path);

        $slug = end($slugs);

        $category = Category::where('company_id', $this->shop->company_id)->where('slug', $slug)->first();

        $product = Product::where('slug', $slug)->first();

        abort_if($category == null && $product == null, 404, "Страница не найдена.");

        return $product ? $this->showProductPage($product) : $this->showCategoryPage($category);
    }

    protected function showCategoryPage(Category $selectedCategory)
    {
        $categories = $selectedCategory->getDescendantsAndSelf(['id']);

        $products = Product::with('company', 'supplier', 'entrances', 'image')
            ->whereIn('category_id', $categories->pluck('id'))
            ->paginate(15);
        
        $articleEntrances = DB::table('article_entrance')
            ->whereIn('product_id', $products->pluck('id'))
            ->when(!$this->shop->show_empty, function ($query) {
                $query->whereRaw('count != released_count');
            })
            ->get();

        foreach ($products as $index => $product) {

            $totalCount = $articleEntrances->where('product_id', $product->id)->sum('count');
            $releasedCount = $articleEntrances->where('product_id', $product->id)->sum('released_count');

            $products[$index]['count'] = $totalCount - $releasedCount;
        }

        return view('shop.category', compact('products', 'selectedCategory'))
            ->with('shop', $this->shop);
    }

    protected function showProductPage(Product $product)
    {
        $selectedCategory = $product->category->load('childs');

        return view('shop.product', compact('product', 'selectedCategory'))
            ->with('shop', $this->shop);
    }
}
