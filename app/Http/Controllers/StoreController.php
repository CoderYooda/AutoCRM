<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Controllers\Providers\TrinityController;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class StoreController extends Controller
{
    public function index(Request $request)
    { // точка входа в страницу
        $page_title = 'Склад';
        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }

        $target = HC::selectTarget(); // цель ajax подгрузки

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'store';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'content' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

    public static function entranceTab($request)
    {
        $entrances = EntranceController::getEntrances($request);
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('product.entrance', compact('request', 'entrances'));
        }
        return view('entrance.index', compact('request','entrances'));
    }

    public static function providerTab($request)
    {
        $tp = new TrinityController('B61A560ED1B918340A0DDD00E08C990E');
        $brands = $tp->searchBrands($request['search'], $online = true, $asArray = false);
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('product.elements.provider.table_container', compact('brands','request'));
        }
        return view('product.provider', compact('brands', 'request'));
    }

    public static function storeTab($request)
    {
        $page = 'Склад';

        $articles = ProductController::getArticles($request);
        $categories = CategoryController::getCategories($request, 'store');
        $cat_info = [];
        $cat_info['route'] = 'StoreIndex';
        $cat_info['params'] = ['active_tab' => 'store', 'target' => 'ajax-table-store'];
        if($request['view_as'] == 'json' && $request['category_id'] != NULL && $request['target'] == 'ajax-table-store'){
            return view('store.elements.table_container', compact('articles','categories', 'cat_info', 'request'));
        }
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table-store'){
            return view('store.elements.table_container', compact('articles','categories', 'cat_info', 'request'));
        }
        return view('store.store', compact('page', 'articles','categories', 'request', 'cat_info', 'trinity'));
    }



    public static function updateArticlePivot($store_id, $article_id, $param, $value)
    {
        $pivot = Store::where('id', $store_id)->articles()->where('article_id', $article_id)->first();
        dd($pivot);
        $pivot->{$param} = $value;
        //$store = Store::where('company_id', Auth::user()->company()->first()->id)->first();->updateExistingPivot($user, array('status' => 1), false);
    }

    public static function addStoreDialog($request)
    {
        return response()->json(['tag' => 'createStore', 'html' => view('settings.dialog.form_store', compact('request'))->render()]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3', 'string', 'max:255'],
        ]);

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $store = Store::firstOrNew(['id' => (int)$request['id']]);
        if($store->exists){
            $message = 'Склад обновлен';
        } else {
            $message = 'Склад создан';
        }
        $store->fill($request->all());
        $store->company_id = Auth::user()->company()->first()->id;
        $store->save();



        $stores = self::getStores($request);

        $content = view('settings.store', compact('stores', 'request'))->render();

        if($request->ajax()){
            return response()->json([
                'message' => $message,
                'container' => 'ajax-table-store',
                'redirect' => route('SettingsIndex', ['active_tab' => 'store']),
                'html' => $content]);
        } else {
            return redirect()->back();
        }
    }

    public static function editStoreDialog($request)
    {
        if($request['params']){
            $id = (int)$request['id'];
        } else {
            abort(404);
        }

        $store = Store::where('id', $id)->first();

        return response()->json(['tag' => 'editStore'.$store->id, 'html' => view('settings.dialog.form_store', compact('store'))->render()]);
    }

    public function delete($id)
    {
        $store = Store::where('id', $id)->first();
        $message = 'Склад удален';
        $status = 200;

        if($store->company()->first()->id != Auth::user()->company()->first()->id){
            $message = 'Вам не разрешено удалять этот склад';
            $status = 422;
        }

        if($store->articles()->count()){
            $message = 'На складе имеются товары в наличии';
            $status = 422;
        }

        if($status == 200){
            if(!$store->delete()){
                $message = 'Ошибка зависимотей. Обратитесь к администратору';
                $status = 500;
            }
        }


        return response()->json(['id' => $store->id, 'message' => $message], $status);
    }

    public static function getStores($request)
    {
        return Store::where('company_id', Auth::user()->id)->get();
    }
}
