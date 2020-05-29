<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Controllers\Providers\TrinityController;
use App\Http\Requests\StoreRequest;
use App\Models\Article;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Auth;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        PermissionController::canByPregMatch('Смотреть товары');
    	// точка входа в страницу
        $page_title = 'Склад';

        // На всякий случай
        if($request['search'] == 'undefined'){
            $request['search'] = null;
        }
        
        // цель динамической подгрузки
        $target = HC::selectTarget();
        
	    // Определяем табуляцию
        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){
            $request['active_tab'] = 'store';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);

        if(class_basename($content) == "JsonResponse"){
        	return $content;
        }

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }
    
    public static function getAllowedPage(){
	    $tabs = [
		    'store' => 'Смотреть товары',
		    'provider_orders' => 'Смотреть заявки поставщикам',
		    'entrance' => 'Смотреть поступления',
		    'shipments' => 'Смотреть продажи',
		    'client_orders' => 'Смотреть заказ клиента',
		    'adjustment' => 'Смотреть корректировки'
	    ];
	    foreach ($tabs as $tab => $permission) {
		    if(Gate::allows($permission)){
			    return ['active_tab' => $tab];
		    }
	    }
    }

    public function tableData(Request $request)
    {
        $products = ProductController::getArticles($request);
        foreach($products as $product){
            //TODO решить проблему
//            $product->isset = $product->getCountSelfOthers();
    //        $product->price = $product->getMidPriceByStoreId(session('store_id'));
        }
        return response()->json($products);
    }

    public static function storeTab($request)
    {
        $page = 'Склад';
        PermissionController::canByPregMatch('Смотреть товары');
        $categories = CategoryController::getCategories($request, 'store');
        $cat_info = [];
        $cat_info['route'] = 'StoreIndex';
        $cat_info['params'] = ['active_tab' => 'store'];
        $cat_info['root_id'] = 2;


        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-store'){
            return view(env('DEFAULT_THEME', 'classic') . '.store.elements.table_container', compact('categories', 'cat_info', 'request'));
        }
        $trinity = null; #TODO
        return view(env('DEFAULT_THEME', 'classic') . '.store.index', compact('page', 'categories', 'request', 'cat_info', 'trinity'));
    }

    public static function entranceTab($request)
    {
        PermissionController::canByPregMatch('Смотреть поступления');
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-entrance'){
            return view(env('DEFAULT_THEME', 'classic') . '.entrance.elements.table_container', compact('request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.entrance.index', compact('request'));
    }

    public static function providerTab($request)
    {
        //PermissionController::canByPregMatch('Смотреть заявки поставщикам');
        $tp = new TrinityController('B61A560ED1B918340A0DDD00E08C990E');
        $brands = $tp->searchBrands($request['search'], $online = true, $asArray = false);
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table-provider'){
            return view(env('DEFAULT_THEME', 'classic') . '.provider.elements.table_container', compact('brands','request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.provider.index', compact('brands', 'request'));
    }

    public static function shipmentsTab($request)
    {
        PermissionController::canByPregMatch('Смотреть продажи');
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-shipments'){
            return view(env('DEFAULT_THEME', 'classic') . '.shipments.elements.table_container', compact('request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.shipments.index', compact('request'));
    }

    public static function refundTab($request)
    {
        PermissionController::canByPregMatch('Смотреть возвраты');
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-refund'){
            return view(env('DEFAULT_THEME', 'classic') . '.refund.elements.table_container', compact('request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.refund.index', compact('request'));
    }

    public static function client_ordersTab($request)
    {
        PermissionController::canByPregMatch('Смотреть заказ клиента');
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-client_orders'){
            return view(env('DEFAULT_THEME', 'classic') . '.client_orders.elements.table_container', compact('request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.client_orders.index', compact('request'));
    }

    public static function provider_ordersTab($request)
    {
        PermissionController::canByPregMatch('Смотреть заявки поставщикам');
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-provider_orders'){
            return view(env('DEFAULT_THEME', 'classic') . '.provider_orders.elements.table_container', compact('request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.provider_orders.index', compact('request'));
    }

    public static function adjustmentTab($request)
    {
        PermissionController::canByPregMatch('Смотреть корректировки');
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-adjustment'){
            return view(env('DEFAULT_THEME', 'classic') . '.adjustments.elements.table_container', compact('request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.adjustments.index', compact('request'));
    }

    public static function updateArticlePivot($store_id, $article_id, $param, $value)
    {
        $pivot = Store::where('id', $store_id)->articles()->where('article_id', $article_id)->first();
        dd($pivot);
        $pivot->{$param} = $value;
    }

    public static function storeDialog($request)
    {
        $tag = 'storeDialog';
        if($request['store_id']){
            $tag .= $request['store_id'];
            $store = Store::where('id', (int)$request['store_id'])->first();
        } else {
            $store = null;
        }
        return response()->json(['tag' => $tag, 'html' => view(env('DEFAULT_THEME', 'classic') . '.store.dialog.form_store', compact('store', 'request'))->render()]);
    }

    public function store(StoreRequest $request)
    {
        $store = Store::firstOrNew(['id' => (int)$request['id']]);
        if($store->exists){
            $message = 'Склад обновлен';
        } else {
            $message = 'Склад создан';
        }
        $store->fill($request->all());
        $store->company_id = Auth::user()->company()->first()->id;
        $store->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $message,
                //'container' => 'ajax-table-store',
                'event' => 'StoreStored',
            ]);
        } else {
            return redirect()->back();
        }
    }

    public function checkstock(Request $request)
    {
        $items = [];
        foreach ($request['ids'] as $id){
            $article = Article::owned()->where('id', $id)->first();
            if($article){
                $items[$article->id]['id'] = $id;
                $items[$article->id]['count'] = $article->getCountInStoreId($request['store_id']);
            }
        }

        if($request->expectsJson()){
            return response()->json([
                'message' => 'Наличие обновлено',
                'items' => $items
            ]);
        } else {
            return redirect()->back();
        }

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
        return Store::owned()->get();
    }

    public static function getStoreById($id)
    {
        return Store::owned()->where('id', $id)->first();
    }

    public static function getStoreNameById($id)
    {
        $store = Store::owned()->where('id', $id)->first();
        if($store){
            return $store->name;
        } else {
            return 'Не найден';
        }
    }

    public static function createStartStore($company)
    {
        $store = new Store();
        $store->name = 'Основной склад';
        $store->company_id = $company->id;
        $company->stores()->save($store);
    }
}
