<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\Shop\UpdateAboutRequest;
use App\Http\Requests\Shop\UpdateDeliveryRequest;
use App\Http\Requests\Shop\UpdateRequest;
use App\Http\Requests\Shop\UpdateSettingsRequest;
use App\Http\Requests\Shop\UpdateWarrantyRequest;
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

        $shop = Shop::with('phones', 'aboutImages', 'sliderImages')->where('company_id', Auth::user()->company_id)->first();
        $view->with('shop', $shop);

        if (class_basename($view) == "JsonResponse") {
            return $view;
        }

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'shop' => $shop,
                'html' => $view->render()
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
        return view(get_template() . '.shop.tabs.settings', compact('request'));
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

            $shop->contactEmails()->delete();
            $shop->contactEmails()->createMany($request->emails);

            $main_email = $request->emails[$request->emails_main];
            $shop->contactEmails()->where('email', $main_email['email'])->update(['main' => 1]);

            return response()->json([
                'type' => 'success',
                'message' => 'Настройки успешно сохранены.'
            ]);
        });
    }

    public function updateAbout(UpdateAboutRequest $request)
    {
        $shop = Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
            'about_desc' => $request->about_desc
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
            'type' => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateDelivery(UpdateDeliveryRequest $request)
    {
        Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
            'delivery_desc' => $request->delivery_desc,
            'seo_delivery_title' => $request->seo_delivery_title,
            'seo_delivery_desc' => $request->seo_delivery_desc
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateWarranty(UpdateWarrantyRequest $request)
    {
        Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
            'warranty_desc' => $request->warranty_desc,
            'seo_warranty_title' => $request->seo_warranty_title,
            'seo_warranty_desc' => $request->seo_warranty_desc
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Настройки успешно сохранены.'
        ]);
    }

    public function updateSettings(UpdateSettingsRequest $request)
    {
        return DB::transaction(function () use($request) {

            $shop = Shop::updateOrCreate(['company_id' => Auth::user()->company_id], [
                'show_empty' => $request->show_empty,
                'show_amount' => $request->show_amount,
                'storage_days' => $request->storage_days,
                'image_logotype_id' => $request->image_logotype_id,
                'image_header_id' => $request->image_header_id,
                'image_background_id' => $request->image_background_id,
                'domain' => $request->domain,
                'subdomain' => $request->subdomain,
                'supplier_offers' => $request->supplier_offers,
                'supplier_percent' => $request->supplier_percent,
                'supplier_id' => $request->supplier_id
            ]);

            $images = [];

            for($i = 0; $i < count($request->image_ids); $i++) {

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
                'type' => 'success',
                'message' => 'Настройки успешно сохранены.'
            ]);
        });
    }

    private function removeSelectedImages(Shop $shop, Request $request)
    {
        if($request->delete_image_ids != null) {

            foreach ($request->delete_image_ids as $image_id) {
                $shop->removeImageById($image_id);
            }
        }
    }

    private function uploadRequestFiles(Shop $shop, Request $request)
    {
        $files = [];

        if($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $fileParams = $shop->uploadImage($file);

                $image = $shop->aboutImages()->create($fileParams);

                $files[] = $image;
            }
        }

        return $files;
    }
}
