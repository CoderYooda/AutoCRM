<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\LoginRequest;
use App\Http\Requests\Shop\RegisterRequest;
use App\Models\Company;
use App\Models\Partner;
use App\Models\Shop;
use App\Models\User;
use App\Models\VehicleMark;
use App\Models\VehicleModel;
use App\Models\VehicleModify;
use App\Services\ShopManager\ShopManager;
use Illuminate\Http\Request;
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
        $marks = VehicleMark::limit(10)->get();
        $models = VehicleModel::limit(10)->get();
        $modifications = VehicleModify::limit(10)->get();

        return view('shop.user', compact('marks', 'models', 'modifications'))
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

    public function registerAction(RegisterRequest $request)
    {
        $company = $this->shop->company;

        $uniqueFields = [
            'basePhone' => $request->phone,
            'company_id' => $company->id,
            'store_id' => $request->store_id
        ];

        $types = ['fl', 'ip', 'ul'];

        $updateFields = $request->except('rules', 'password', 'register_type', 'name', 'surname', 'middlename');
        $updateFields['fio'] = $request->surname . ' ' . $request->name . ' ' . $request->middlename;
        $updateFields['category_id'] = BUYER_CATEGORY;
        $updateFields['type'] = array_search($request->register_type, $types);

        $user = User::updateOrCreate(['phone' => $request->basePhone], [
            'password' => bcrypt($request->password),
            'company_id' => null
        ]);

        $updateFields['user_id'] = $user->id;

        $partner = Partner::updateOrCreate($uniqueFields, $updateFields);

        Auth::loginUsingId($user->id, true);

        Session::flush();

        return redirect()->route('pages.index');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('pages.index');
    }
}
