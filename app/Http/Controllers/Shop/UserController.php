<?php

namespace App\Http\Controllers\Shop;

use App\Interfaces\Shop\CartInterface;
use App\Http\Requests\Shop\LoginRequest;
use App\Http\Requests\Shop\RegisterRequest;
use App\Http\Requests\Shop\SaveDeliveryRequest;
use App\Http\Requests\Shop\SaveUserRequest;
use App\Models\Partner;
use App\Models\Shop;
use App\Models\User;
use App\Models\VehicleMark;
use App\Models\VehicleModel;
use App\Models\VehicleModify;
use App\Services\ShopManager\ShopManager;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

const BUYER_CATEGORY = 7;

class UserController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index()
    {
        $partner = Auth::user()->companyPartner;

        $marks = VehicleMark::all();
        $models = VehicleModel::where('mark_id', $marks->first()->id)->get();
        $modifications = VehicleModify::where('model_id', $models->first()->id)->get();

        $deliveryAddresses = $partner->deliveryAddresses;

        $orders = $partner->orders()->with('positions')->paginate(15);

        $ordersTotal = $partner->orders()->sum('total_price');
        $ordersWait = $partner->orders()->where('status', '<', 2)->count();
        $ordersDebt = $partner->orders()->where('status', '<', 2)->sum('total_price');

        $vehicles = $partner->vehicles;

        return view('shop.user', compact('marks', 'models', 'modifications', 'deliveryAddresses', 'orders', 'ordersDebt', 'ordersWait', 'ordersTotal', 'vehicles'))
            ->with('shop', $this->shop);
    }

    public function loginForm()
    {
        $view = view('shop.auth')
            ->with('shop', $this->shop);

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function loginAction(LoginRequest $request)
    {
        if(!Auth::attempt($request->validated(), $request->has('remember'))) {
            return response()->json([
                'type' => 'error',
                'message' => 'Неправильный логин или пароль.'
            ], 422);
        }

        $user = User::where(['phone' => $request['phone']])->first();

        $user->createPartnerIfNotExists();

        Auth::login($user, true);

        Session::flush();

        return response([
            'redirect' => redirect()->back()
        ], 200);
    }

    public function registerForm()
    {
        return view('shop.register')
            ->with('shop', $this->shop);
    }

    public function registerAction(RegisterRequest $request, CartInterface $cart)
    {
        $company = $this->shop->company;

        $types = ['fl', 'ip', 'ul'];

        $fields = $request->except('rules', 'password', 'register_type', 'name', 'basePhone', 'surname', 'middlename');
        $fields['fio'] = $request->surname . ' ' . $request->name . ' ' . $request->middlename;
        $fields['category_id'] = BUYER_CATEGORY;
        $fields['type'] = array_search($request->register_type, $types);
        $fields['company_id'] = $company->id;

        $user = User::updateOrCreate(['phone' => $request->basePhone], [
            'password' => bcrypt($request->password),
            'company_id' => null
        ]);

        $fields['user_id'] = $user->id;

        $partner = Partner::create($fields);

        $phones = [
            [
                'number' => $request->basePhone,
                'main' => 1
            ]
        ];

        $partner->upsertPhones($phones);

        $products = $cart->all();

        $cart->clear();

        Auth::loginUsingId($user->id, true);

        Session::flush();

        foreach ($products as $hash => $product) {
            $cart->addProduct($hash, $product['data'], $product['count']);
        }

        return redirect()->route('pages.index');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('pages.index');
    }

    public function save(SaveUserRequest $request)
    {
        if($request['field'] == 'password') $request['value'] = bcrypt($request['value']);

        $partner = Auth::user()->companyPartner;

        $partner->update([$request['field'] => $request['value']]);

        return response()->json([
            'type' => 'success',
            'message' => 'Информация обновлена.'
        ]);
    }

    public function saveDelivery(SaveDeliveryRequest $request)
    {
        $partner = Auth::user()->companyPartner;

        $data = [];

        foreach ($request->addresses as $address) {
            $data[] = [
                'text' => $address
            ];
        }

        $partner->deliveryAddresses()->delete();
        $partner->deliveryAddresses()->createMany($data);

        return response()->json([
            'type' => 'success',
            'message' => 'Информация обновлена.'
        ]);
    }
}
