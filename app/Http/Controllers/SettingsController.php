<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Cashbox;
use App\Models\DdsArticle;
use App\Models\Store;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public $page_title = 'Настройки';

    public function index(Request $request)
    {

        $this->page_title = 'Настройки';
        $target = HC::selectTarget(); // цель ajax подгрузки


        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'index';
        }

        $classname = $request['active_tab'] . 'Tab';
        $content = self::$classname($request);

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $this->page_title,
                'html' => $content->render()]);
        } else {
            return $content;
        }
    }

    public static function indexTab($request)
    {

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view('settings.index', compact('request'));
        }
        return view('settings.index', compact('request'));
    }

    public static function cashboxTab($request)
    {
        $cashboxes = Cashbox::owned()->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view('settings.cashbox', compact('cashboxes', 'request'));
        }
        return view('settings.cashbox', compact('cashboxes','request'));
    }

    public static function storeTab($request)
    {
        $stores = Store::all();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view('settings.store', compact('stores', 'request'));
        }
        return view('settings.store', compact('stores','request'));
    }

    public static function DdsarticleTab($request)
    {
        $Ddsarticles = DdsarticleController::getDdsarticles($request);
        $categories = CategoryController::getCategories($request, 'dds');

        $cat_info = [];
        $cat_info['route'] = 'SettingsIndex';
        $cat_info['params'] = ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content'];


        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view('settings.ddsarticle', compact('Ddsarticles','categories', 'cat_info', 'request'));
        }
        return view('settings.ddsarticle', compact('Ddsarticles','categories', 'cat_info', 'request'));
    }
}
