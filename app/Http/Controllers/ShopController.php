<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\Shop\StoreRequest;
use App\Http\Requests\Shop\UpdateAboutRequest;
use App\Http\Requests\Shop\UpdateAnalyticsRequest;
use App\Http\Requests\Shop\UpdateDeliveryRequest;
use App\Http\Requests\Shop\UpdatePaymentMethodsRequest;
use App\Http\Requests\Shop\UpdateRequest;
use App\Http\Requests\Shop\UpdateSettingsRequest;
use App\Http\Requests\Shop\UpdateWarrantyRequest;
use App\Mail\Shop\CanceledOrder;
use App\Mail\Shop\ConfirmOrder;
use App\Models\Product;
use App\Models\ClientOrder;
use App\Models\Order;
use App\Models\Markup;
use App\Models\Shop;
use App\Models\Supplier;
use App\Models\User;
use App\Repositories\Notification\NotificationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Facades\NotifyServiceFacade as Notify;

class ShopController extends Controller
{


    public function index(Request $request)
    {
        // точка входа в страницу
        $page_title = 'Интернет-магазин';

        $class = 'shop';

        // цель динамической подгрузки
        $target = HC::selectTarget();

        // Определяем табуляцию
        if ($request['active_tab'] === null || $request['active_tab'] == 'undefined') {
            $request['active_tab'] = 'contacts';
        }

        $classname = $request['active_tab'] . 'Tab';

        $view = self::$classname($request);

        $view->with('class', $class);

        $shop = Shop::with('phones', 'aboutImages', 'sliderImages')->where('company_id', Auth::user()->company_id)->first();

        $view->with('shop', $shop);

        if (class_basename($view) == "JsonResponse") {
            return $view;
        }

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page'   => $page_title,
                'shop'   => $shop,
                'html'   => $view->render()
            ]);
        }

        return $view;
    }

    public function contactsTab(Request $request)
    {
        return view(get_template() . '.shop.tabs.contacts', compact('request'));
    }

    public function aboutTab(Request $request)
    {
        return view(get_template() . '.shop.tabs.about', compact('request'));
    }

    public function deliveryTab(Request $request)
    {
        return view(get_template() . '.shop.tabs.delivery', compact('request'));
    }

    public function warrantyTab(Request $request)
    {
        return view(get_template() . '.shop.tabs.warranty', compact('request'));
    }

    public function settingsTab(Request $request)
    {
        $user = Auth::user();

        $prices = Markup::where('company_id', $user->company_id)->get();

        return view(get_template() . '.shop.tabs.settings', compact('request', 'prices'));
    }

    public function analyticsTab(Request $request)
    {
        return view(get_template() . '.shop.tabs.analytics', compact('request'));
    }

    public function payment_methodsTab(Request $request)
    {
        $shop = Auth::user()->shop;

        $filteredArray = [];

        if($shop) {
            $paymentMethods = $shop->paymentMethods ? $shop->paymentMethods->toArray() : [];

            foreach ($paymentMethods as $paymentMethod) {
                $paymentMethod['params'] = json_decode($paymentMethod['params'], true);
                $filteredArray[$paymentMethod['name']] = $paymentMethod;
            }
        }

        $paymentMethods = $filteredArray;

        return view(get_template() . '.shop.tabs.payment_methods', compact('request', 'paymentMethods'));
    }

    public function update(UpdateRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $shop = Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
                'name'               => $request->name,
                'address_name'       => $request->address_name,
                'address_coords'     => $request->address_coords,
                'address_desc'       => $request->address_desc,
                'seo_contacts_title' => $request->seo_contacts_title,
                'seo_contacts_desc'  => $request->seo_contacts_desc,
                'contacts_desc'      => $request->contacts_desc
            ]);

            $shop->phones()->delete();
            $shop->phones()->createMany($request->phones);

            $main_phone = $request->phones[$request->phones_main];
            $shop->phones()->where('number', $main_phone['number'])->update(['main' => 1]);

            $shop->contactEmails()->delete();
            $shop->contactEmails()->createMany($request->emails);

            $main_email = $request->emails[$request->emails_main];
            $shop->contactEmails()->where('email', $main_email['email'])->update(['main' => 1]);

            return response()->json([
                'type'    => 'success',
                'message' => 'Настройки успешно сохранены.'
            ]);
        });
    }

    public function getSideInfo(Request $request)
    {
        $order = Order::find($request->id);

        $comment = $order->comment;

        return response()->json([
            'info'    => view(get_template() . '.shop_orders.contact-card', compact('request', 'order'))->render(),
            'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render()
        ], 200);
    }

    public function tableData(Request $request)
    {
        $data = OrderController::getOrders($request);
        $data = json_encode($data);

        return $data;
    }

    public function updateAbout(UpdateAboutRequest $request)
    {
        $shop = Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
            'about_desc'      => $request->about_desc,
            'seo_about_title' => $request->seo_about_title,
            'seo_about_desc'  => $request->seo_about_desc
        ]);

        $images = [];

        foreach ($request->image_ids as $image_id) {
            $images[] = $image_id;
        }

        $shop->aboutImages()->sync($images);

        foreach ($shop->sliderImages as $key => $image) {
            $image->update(['rank' => $key]);
        }

        return response()->json([
            'type'    => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateDelivery(UpdateDeliveryRequest $request)
    {
        Shop::updateOrCreate(['company_id' => Auth::user()->company_id], $request->validated());

        return response()->json([
            'type'    => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateWarranty(UpdateWarrantyRequest $request)
    {
        Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
            'warranty_desc'      => $request->warranty_desc,
            'seo_warranty_title' => $request->seo_warranty_title,
            'seo_warranty_desc'  => $request->seo_warranty_desc
        ]);

        return response()->json([
            'type'    => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateAnalytics(UpdateAnalyticsRequest $request)
    {
        Shop::updateOrCreate(['company_id' => Auth::user()->company_id], $request->validated());

        return response()->json([
            'type'    => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateSettings(UpdateSettingsRequest $request)
    {

        return DB::transaction(function () use ($request) {

            $shop = Shop::where('company_id', Auth::user()->company_id)->first();

            if (!$shop || $shop->domain != $request->domain) {

                $domain = $request->domain;

                if (str_contains_cyrillic($domain)) $domain = idn_to_ascii($domain, IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46);
                exec('sh test.sh ' . $domain);
            }
            $shop = Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
                'show_empty'          => $request->show_empty,
                'show_amount'         => $request->show_amount,
                'storage_days'        => $request->storage_days,
                'image_favicon_id'    => $request->image_favicon_id,
                'image_logotype_id'   => $request->image_logotype_id,
                'image_header_id'     => $request->image_header_id,
                'image_background_id' => $request->image_background_id,
                'domain'              => $request->domain,
                'subdomain'           => $request->subdomain,
                'supplier_offers'     => $request->supplier_offers,
                'price_id'            => $request->price_id
            ]);

            $images = [];

            for ($i = 0; $i < count($request->image_ids); $i++) {

                $image_id = $request->image_ids[$i];
                $target_url = $request->image_urls[$i];

                $images[$image_id] = [
                    'target_url' => $target_url
                ];
            }

            $shop->sliderImages()->sync($images);

            foreach ($shop->sliderImages as $key => $image) {
                $image->update(['rank' => $key]);
            }

            $shop->orderEmails()->delete();
            $shop->orderEmails()->createMany($request->emails);

            return response()->json([
                'type'    => 'success',
                'message' => 'Настройки успешно сохранены.'
            ]);
        });
    }

    public function updatePaymentMethods(UpdatePaymentMethodsRequest $request)
    {
        $params = $request->validated();

        $user = Auth::user();

        /** @var Shop $shop */
        $shop = $user->shop;

        $methods = [];

        foreach ($params['methods'] as $method_name => $method_params) {
            $methods[] = [
                'name'   => $method_name,
                'params' => json_encode($method_params),
                'main'   => $request->methods_main == $method_name
            ];
        }

        $shop->paymentMethods()->delete();
        $shop->paymentMethods()->createMany($methods);

        return response()->json([
            'type'    => 'success',
            'message' => 'Настройки успешно сохранены'
        ]);
    }

    public function store(StoreRequest $request)
    {
        return DB::transaction(function () use ($request) {

            /** @var User $user */
            $user = Auth::user();

            /** @var Order $order */
            $order = Order::find($request->order_id);

            /** @var Shop $shop */
            $shop = $order->shop;

            $paymentMethod = $shop->getActivePaymentMethod();

            if ($order->pay_type == Order::PAYMENT_TYPE_ONLINE && $paymentMethod == []) {
                return response()->json([
                    'type'    => 'error',
                    'message' => 'Нет активных способов оплаты'
                ], 422);
            }

            /** @var ClientOrder $clientOrder */
            $clientOrder = null;

            $positions = (array)$request->products;

            $status = Order::CANCELED_STATUS;

            if ($request->status == 'accept') {

                $order->positions()->delete();
                $order->positions()->createMany($positions);

                $totalPrice = 0;

                foreach ($positions as $key => $position) {
                    $total = $position['price'] * $position['count'];
                    $totalPrice += $total;

                    $positions[$key]['total'] = $total;
                }

                $clientOrder = ClientOrder::create([
                    'company_id' => $user->company_id,
                    'manager_id' => $user->partner->id,
                    'partner_id' => $order->partner->id,
                    'store_id'   => $user->current_store,
                    'phone'      => $order->phone,
                    'comment'    => $order->comment,
                    'summ'       => $totalPrice,
                    'itogo'      => $totalPrice
                ]);

                foreach ($positions as $position) {

                    $uniqueFields = [
                        'company_id' => $user->company_id,
                        'name'       => $position['manufacturer']
                    ];

                    $supplier = Supplier::firstOrCreate($uniqueFields);

                    $uniqueFields = [
                        'company_id'  => $user->company_id,
                        'article'     => $position['article'],
                        'supplier_id' => $supplier->id
                    ];

                    $updateFields = [
                        'name' => $position['name']
                    ];

                    $product = Product::firstOrCreate($uniqueFields, $updateFields);

                    if ($product->wasRecentlyCreated) {
                        $product->update(['category_id' => 10]);
                    }

                    $pivotData = [
                        'price' => $position['price'],
                        'count' => $position['count'],
                        'total' => $position['price'] * $position['count'],
                    ];

                    $clientOrder->products()->attach($product->id, $pivotData);
                }

                $status = $order->pay_type == Order::PAYMENT_TYPE_ONLINE ? Order::WAIT_PAYMENT_STATUS : Order::WORKING_STATUS;

                if ($status == Order::PAYMENT_TYPE_ONLINE) {
                    $order->initPayment();
                } else {
                    Notify::sendMail($order, 'orderConfirmed', $order->email, 'Заказ подтвержден');
//                    $this->notify->sendMail($order, 'orderConfirmed', $order->email, 'Заказ подтвержден');
                }

                $clientOrder->update(['status' => $status]);
            } else {
                Notify::sendMail($order, 'orderCanceled', $order->email, 'Заказ отменен');
//                $this->notify->sendMail($order, 'orderCanceled', $order->email, 'Заказ отменен', 'order_canceled');

            }

            $order->update([
                'comment'        => $request->comment,
                'status'         => $status,
                'clientorder_id' => $clientOrder->id ?? null
            ]);

            event(new ModelWasStored($shop->company_id, 'OrderStored'));

            return response()->json([
                'type'    => 'success',
                'message' => 'Заказ успешно ' . ($status != Order::CANCELED_STATUS ? 'подтверждён' : 'отменён') . '.'
            ], 200);
        });
    }
}
