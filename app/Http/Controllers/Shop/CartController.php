<?php

namespace App\Http\Controllers\Shop;

use App\Events\ModelWasStored;
use App\Mail\Shop\FeedbackMail;
use App\Mail\Shop\NewOrderEmail;
use App\Models\DeliveryAddress;
use App\Http\Controllers\API\TinkoffMerchantAPI;
use App\Http\Requests\Shop\CartDeleteRequest;
use App\Http\Requests\Shop\CartOrderRequest;
use App\Http\Requests\Shop\CartSaveRequest;
use App\Http\Requests\Shop\CartStoreRequest;
use App\Interfaces\Shop\CartInterface;
use App\Http\Controllers\Controller;
use App\Mail\Shop\ModerateOrder;
use App\Models\Product;
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
const MODERATION_STATUS = 0;

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
        /** @var Partner $partner */
        $partner = Auth::user()->companyPartner ?? null;

        $deliveryAddresses = $partner->deliveryAddresses ?? [];

        $orders = $this->formatOrdersArray($cart->all());
        $storesTotal = [];

        $stores = Store::where('company_id', $this->shop->company_id)->get();

        $totalPrice = 0;

        foreach ($orders as $order) {
            $totalPrice += $order['price'] * $order['count'];
        }

        return view('shop.cart', compact('orders', 'stores', 'totalPrice', 'storesTotal', 'deliveryAddresses'))
            ->with('shop', $this->shop);
    }

    public function store(CartStoreRequest $request, CartInterface $cart)
    {
        $cart->addProduct($request->hash, $request->order, $request->count);

        return response()->json([
            'type'    => 'success',
            'message' => 'Продукт был добавлен в корзину.',
            'total'   => $cart->total()
        ]);
    }

    public function delete(CartDeleteRequest $request, CartInterface $cart)
    {
        $cart->removeProduct($request->hash);

        return response()->json([
            'type'    => 'success',
            'message' => 'Продукт был удалён из корзины.',
            'total'   => $cart->total()
        ]);
    }

    public function clear(CartInterface $cart)
    {
        $cart->clear();

        return response()->json([
            'type'    => 'success',
            'message' => 'Корзина успешно очищена.',
        ]);
    }

    public function save(CartSaveRequest $request, CartInterface $cart)
    {
        $cart->setProductCount($request->hash, $request->count);

        return response()->json([
            'type'    => 'success',
            'message' => 'Количество было успешно изменено.',
            'total'   => $cart->total()
        ]);
    }

    public function order(CartOrderRequest $request, CartInterface $cart, ShopManager $shopManager)
    {
        return DB::transaction(function () use ($cart, $shopManager, $request) {

            /** @var Partner $partner */
            $partner = null;

            $shop = $shopManager->getCurrentShop();

            $company = $shop->company;

            if (Auth::check()) {
                $partner = Auth::user()->companyPartner;
            } else {

                $uniqueFields = [
                    'company_id' => $company->id,
                    'store_id'   => $request->pickup_id,
                    'fio'        => ($request->surname . ' ' . $request->name . ' ' . $request->middlename)
                ];

                $types = ['fl', 'ip', 'ul'];

                $updateFields = $request->except('rules', 'password', 'delivery_address', 'basePhone', 'register', 'pay_type', 'delivery_type', 'pickup_id', 'register_type', 'name', 'surname', 'middlename');
                $updateFields['category_id'] = BUYER_CATEGORY;
                $updateFields['type'] = array_search($request->register_type, $types);

                if ($request->register) {
                    $user = User::updateOrCreate(['phone' => $request->basePhone], [
                        'password'   => bcrypt($request->password),
                        'company_id' => null
                    ]);

                    Auth::login($user, true);

                    $updateFields['user_id'] = $user->id;
                }

                /** @var Partner $partner */
                $partner = Partner::updateOrCreate($uniqueFields, $updateFields);

                $phones = [
                    [
                        'number' => $request->basePhone,
                        'main' => 1
                    ]
                ];

                $partner->upsertPhones($phones);

                if ($request->delivery_address) {
                    $deliveryAddress = $partner->deliveryAddresses()->create(['text' => $request->delivery_address]);

                    $request['delivery_id'] = $deliveryAddress->id;
                }
            }

            $totalPrice = 0;

            $cartOrders = $this->formatOrdersArray($cart->all());

            foreach ($cartOrders as $cartOrder) {
                $totalPrice += $cartOrder['price'] * $cartOrder['count'];
            }

            $order = Order::create([
                'company_id'    => $company->id,
                'partner_id'    => $partner->id,
                'total_price'   => $totalPrice,
                'status'        => MODERATION_STATUS,
                'comment'       => $request->comment,
                'email'         => $partner->email,
                'phone'         => $partner->firstActivePhoneNumber(),
                'pay_type'      => $request->pay_type,
                'delivery_type' => $request->delivery_type,
                'delivery_id'   => $request->delivery_id,
                'pickup_id'     => $request->pickup_id,
                'shop_id'       => $shop->id
            ]);

            $order->update(['hash' => md5($order->id . $partner->id)]);

            foreach ($cartOrders as $cartOrder) {

                $cartOrder = collect($cartOrder)->except('image', 'store_id');
                $cartOrder['order_id'] = $order->id;

                $fields = $cartOrder->except('max_count')->toArray();

                DB::table('order_positions')->insert($fields);
            }

            $orderEmails = $this->shop->orderEmails->pluck('email');

            Mail::to($orderEmails)->send(new NewOrderEmail($order));

            Mail::to($partner->email)->send(new ModerateOrder($order));

            $cart->clear();

            event(new ModelWasStored($shop->company_id, 'OrderStored'));

            return redirect($order->path());
        });
    }

    private function formatOrdersArray(array $cartOrders)
    {
        $cart = app(CartInterface::class);

        $orders = [];

        foreach ($cartOrders as $hash => $order) {
            $product = Product::with('stores')->find($order['data']['product_id'] ?? null);

            $store = null;

            if (isset($order['data']['store_id'])) $store = Store::find($order['data']['store_id']);

            $price = $order['data']['model']['hash_info']['price'] ?? $product->getPriceWithDiscount();
            $count = $cart->getProductCount($hash);

            if ($store) {
                if (!isset($storesTotal[$store->id])) $storesTotal[$store->id] = 0;
                $storesTotal[$store->id] += $price * $count;
            }

            $orders[$hash] = [
                'source'       => $store->name ?? $order['data']['model']['hash_info']['supplier'],
                'manufacturer' => $order['data']['model']['hash_info']['manufacturer'] ?? $product->supplier->name,
                'article'      => $order['data']['model']['hash_info']['article'] ?? $product->article,
                'name'         => $order['data']['name'] ?? $product->name,
                'price'        => $price,
                'image'        => $product->image_path ?? 'https://via.placeholder.com/150',
                'count'        => $count,
                'max_count'    => $store ? $product->getCountInStoreId($store->id) : $order['data']['model']['hash_info']['rest']
            ];

            if (isset($order['data']['store_id'])) $orders[$hash]['store_id'] = $order['data']['store_id'];
        }

        return $orders;
    }
}
