<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\Shop\UpdateRequest;
use App\Models\Company;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        return DB::transaction(function () use($request) {

            $shop = Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
                'name' => $request->name,
                'address_name' => $request->address_name,
                'address_coords' => $request->address_coords,
                'address_desc' => $request->address_desc
            ]);

            $shop->phones()->delete();
            $shop->phones()->createMany($request->phones);

            $main_phone = $request->phones[$request->phones_main];
            $shop->phones()->where('number', $main_phone['number'])->update(['main' => 1]);

            $shop->emails()->delete();
            $shop->emails()->createMany($request->emails);

            $main_email = $request->emails[$request->emails_main];
            $shop->emails()->where('email', $main_email['email'])->update(['main' => 1]);

            return response()->json([
                'type' => 'success',
                'message' => 'Настройки успешно сохранены.'
            ]);
        });
    }

    public function contactsTab(Request $request)
    {
        $shop = Shop::with('phones')->where('company_id', Auth::user()->company_id)->first();

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
