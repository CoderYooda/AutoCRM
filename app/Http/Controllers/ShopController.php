<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\Shop\UpdateRequest;
use App\Models\Company;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        if ($request['active_tab'] === NULL || $request['active_tab'] == 'undefined') {
            $request['active_tab'] = 'contacts';
        }

        $classname = $request['active_tab'] . 'Tab';

        $view = self::$classname($request);

        $view->with('class', $class);

        if (class_basename($view) == "JsonResponse") {
            return $view;
        }

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $view->render()
            ]);
        }

        return $view;
    }

    public function update(UpdateRequest $request)
    {
        $company = Auth::user()->company;

        $shop = Shop::updateOrCreate(['company_id' => $company->id], [
            'name' => $request->name,
            'address_name' => $request->address_name,
            'address_coords' => $request->address_coords
        ]);

//        $shop->phones()->sync([
//
//        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function contactsTab(Request $request)
    {
        $shop = Auth::user()->company->shop;

        return view(get_template() . '.shop.tabs.contacts', compact('request', 'shop'));
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
        return view(get_template() . '.shop.tabs.settings', compact('request'));
    }
}
