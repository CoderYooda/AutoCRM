<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\CartDeleteRequest;
use App\Http\Requests\Shop\CartOrderRequest;
use App\Http\Requests\Shop\CartSaveRequest;
use App\Http\Requests\Shop\CartStoreRequest;
use App\Interfaces\Shop\CartInterface;
use App\Http\Controllers\Controller;
use App\Mail\Shop\SuccessOrder;
use App\Models\Article;
use App\Models\Order;
use App\Models\Partner;
use App\Models\Shop;
use App\Models\Store;
use App\Models\User;
use App\Services\ShopManager\ShopManager;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

const BUYER_CATEGORY = 7;

class CartController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index(CartInterface $cart)
    {
        $orders = $this->formatOrdersArray($cart->all());
        $storesTotal = [];

        $stores = Store::where('company_id', $this->shop->company_id)->get();

        $totalPrice = 0;

        foreach ($orders as $order) {
            $totalPrice += $order['price'] * $order['count'];
        }

        return view('shop.cart', compact('orders', 'stores', 'totalPrice', 'storesTotal'))
            ->with('shop', $this->shop);
    }

    public function store(CartStoreRequest $request, CartInterface $cart)
    {
        $cart->addProduct($request->hash, $request->order, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был добавлен в корзину.',
            'total' => $cart->total()
        ]);
    }

    public function delete(CartDeleteRequest $request, CartInterface $cart)
    {
        $cart->removeProduct($request->hash);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был удалён из корзины.',
            'total' => $cart->total()
        ]);
    }

    public function clear(CartInterface $cart)
    {
        $cart->clear();

        return response()->json([
            'type' => 'success',
            'message' => 'Корзина успешно очищена.',
        ]);
    }

    public function save(CartSaveRequest $request, CartInterface $cart)
    {
        $cart->setProductCount($request->hash, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Количество было успешно изменено.',
            'total' => $cart->total()
        ]);
    }

    public function order(CartOrderRequest $request, CartInterface $cart, ShopManager $shopManager)
    {
        return DB::transaction(function () use($cart, $shopManager, $request) {

            /** @var Partner $partner */
            $partner = null;

            $shop = $shopManager->getCurrentShop();

            $company = $shop->company;

            if(Auth::check()) {
                $partner = Auth::user()->companyPartner;
            }
            else {

                $uniqueFields = [
                    'basePhone' => $request->phone,
                    'company_id' => $company->id,
                    'store_id' => $request->store_id
                ];

                $types = ['fl', 'ip', 'up'];

                $updateFields = $request->except('rules', 'password', 'register', 'pay_type', 'delivery_type', 'store_id', 'register_type', 'name', 'surname', 'middlename');
                $updateFields['fio'] = $request->surname . ' ' . $request->name . ' ' . $request->middlename;
                $updateFields['category_id'] = BUYER_CATEGORY;
                $updateFields['type'] = array_search($request->register_type, $types);

                if($request->register) {
                    $user = User::updateOrCreate(['phone' => $request->basePhone], [
                        'password' => bcrypt($request->password),
                        'company_id' => null
                    ]);

                    Auth::login($user, true);

                    $updateFields['user_id'] = $user->id;
                }

                $partner = Partner::updateOrCreate($uniqueFields, $updateFields);

            }

            $totalPrice = 0;

            $cartOrders = $this->formatOrdersArray($cart->all());

            foreach ($cartOrders as $cartOrder) {
                $totalPrice += $cartOrder['price'] * $cartOrder['count'];
            }

            $order = Order::create([
                'company_id' => $company->id,
                'partner_id' => $partner->id,
                'total_price' => $totalPrice,
                'status' => 0,
                'comment' => $request->comment,
                'email' => $partner->email,
                'phone' => $partner->basePhone
            ]);

            foreach ($cartOrders as $cartOrder) {
                DB::table('order_articles')->insert([
                    'order_id' => $order->id,
                    'manufacturer' => $cartOrder['manufacturer'],
                    'article' => $cartOrder['article'],
                    'name' => $cartOrder['name'],
                    'price' => $cartOrder['price'],
                    'count' => $cartOrder['count']
                ]);
            }

            Mail::to($partner->email)->send(new SuccessOrder($order));

            $cart->clear();

            return redirect()->route('orders.success', ['order' => $order->id]);
        });
    }

    private function formatOrdersArray(array $cartOrders)
    {
        $cart = app(CartInterface::class);

        $orders = [];

        foreach ($cartOrders as $hash => $order) {
            $product = Article::with('stores')->find($order['data']['product_id']);

            $store = null;

            if(isset($order['data']['store_id'])) $store = Store::find($order['data']['store_id']);

            $price = $order['data']['model']['hash_info']['price'] ?? $product->stores->find($store->id)->pivot->retail_price;
            $count = $cart->getProductCount($hash);

            if($store) {
                if(!isset($storesTotal[$store->id])) $storesTotal[$store->id] = 0;
                $storesTotal[$store->id] += $price * $count;
            }

            $orders[$hash] = [
                'manufacturer' => $order['data']['model']['hash_info']['manufacturer'] ?? $product->supplier->name,
                'article' => $order['data']['model']['hash_info']['article'] ?? $product->article,
                'name' => $product->name,
                'price' => $price,
                'image' => $product->image_path,
                'count' => $count
            ];

            if(isset($order['data']['store_id'])) $orders[$hash]['store_id'] = $order['data']['store_id'];
        }

        return $orders;
    }
}
