<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\RegisterRequest;
use App\Models\Company;
use App\Models\Partner;
use App\Models\Shop;
use App\Models\User;
use App\Services\ShopManager\ShopManager;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function loginForm()
    {
        $view = view('shop.auth')
            ->with('shop', $this->shop);

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function loginAction(Request $request)
    {
        dd($request->all());
    }

    public function registerForm()
    {
        return view('shop.register')
            ->with('shop', $this->shop);
    }

    public function registerAction(RegisterRequest $request, ShopManager $shopManager)
    {
        dd($request->all());

        $company = $this->shop->company;

        $uniqueFields = [
            'basePhone' => $request->phone,
            'company_id' => $company->id,
            'store_id' => $request->store_id
        ];

        $types = ['fl', 'ip', 'up'];

        $updateFields = $request->except('rules', 'register_type', 'name', 'surname', 'middlename');
        $updateFields['fio'] = $request->surname . ' ' . $request->name . ' ' . $request->middlename;
        $updateFields['category_id'] = BUYER_CATEGORY;
        $updateFields['type'] = array_search($request->register_type, $types);

        $partner = Partner::updateOrCreate($uniqueFields, $updateFields);

        $user = User::create([
            'phone' => $request->basePhone,
            'password' => bcrypt($request->password),
            'company_id' => null
        ]);

        return redirect()->route('pages.index');
    }
}
