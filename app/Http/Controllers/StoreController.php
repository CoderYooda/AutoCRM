<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Controllers\API\AnalogController;
use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\StoreGetRequest;
use App\Http\Requests\StoreImportRequest;
use App\Http\Requests\StoreRequest;
use App\Jobs\StoreImportProduct;
use App\Models\Product;
use App\Models\Company;
use App\Models\ImportHistory;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class StoreController extends Controller
{
    public function index(StoreGetRequest $request)
    {
        // точка входа в страницу
        $page_title = 'Склад';

        // На всякий случай
        if ($request['search'] == 'undefined') {
            $request['search'] = null;
        }

        // цель динамической подгрузки
        $target = HC::selectTarget();

        // Определяем табуляцию
        if ($request['active_tab'] === NULL || $request['active_tab'] == 'undefined') {
            $request['active_tab'] = 'store';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);

        if (class_basename($content) == "JsonResponse") {
            return $content;
        }

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

    public static function getAllowedPage()
    {
        $tabs = [
            'provider_orders' => 'Смотреть заявки поставщикам',
            'entrance' => 'Смотреть поступления',
            'shipments' => 'Смотреть продажи',
            'client_orders' => 'Смотреть заказ клиента',
            'adjustment' => 'Смотреть корректировки',
            'provider_stores' => 'Смотреть склады поставщиков'
        ];
        foreach ($tabs as $tab => $permission) {
            if (Gate::allows($permission)) {
                return ['active_tab' => $tab];
            }
        }
    }

    public function applyImport(ImportHistory $import)
    {
        PermissionController::canByPregMatch('Редактировать настройки');

        $ids = explode(',', $import->list);

        Product::whereIn('id', $ids)->delete();
        DB::table('article_store')->whereIn('product_id', $ids)->delete();

        $import->delete();

        $company_id = Auth::user()->company->id;

        $last_imports = ImportHistory::with('partner', 'store')
            ->where('company_id', $company_id)
            ->where('created_at', '>', Carbon::now()->addDays(-14))
            ->get();

        return response()->json([
            'target' => 'ajax-table-imports',
            'html' => view(get_template() . '.settings.elements.import_history', compact('last_imports'))->render(),
            'message' => 'Откат изменений был успешно выполнен.',
            'type' => 'success',
        ]);
    }

    public function tableData(StoreGetRequest $request)
    {
        #Получаем список продуктов из поиска
        $products = ProductController::getProducts($request);

        $info = '"' . $request->search . '" ' . (count($products) ? 'найден' : 'не найден') . '.';

        $response = [
            'data' => $products,
            'info' => $info
        ];

        return response()->json($response);
    }

    public function shop_ordersTab(Request $request)
    {
        $data = OrderController::getOrders($request);

        $data = json_encode($data->toArray());

        return view(get_template() . '.shop_orders.index', compact('request', 'data'));
    }

    public function provider_storesTab(Request $request)
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $services = $company->getActiveServicesByCategory(0);

        return view(get_template() . '.provider_stores.index', compact('request', 'services', 'company'));
    }

    public static function storeTab($request)
    {
        $page = 'Склад';

        $categories = CategoryController::getCategories($request, 'store');
        $cat_info = [];
        $cat_info['route'] = 'StoreIndex';
        $cat_info['params'] = ['active_tab' => 'store'];
        $cat_info['root_id'] = 2;
        $request['category_id'] = $request['category_id'] ? $request['category_id'] : $cat_info['root_id'];
        $breadcrumbs = CategoryController::loadBreadcrumbs($request);

        $data = ProductController::getProducts($request);
        $data = json_encode($data->toArray());

        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-store') {
            return view(get_template() . '.store.elements.table_container', compact('categories', 'cat_info', 'request', 'data', 'breadcrumbs'));
        }
        $trinity = null; #TODO
        return view(get_template() . '.store.index', compact('page', 'categories', 'request', 'cat_info', 'trinity', 'data', 'breadcrumbs'));
    }

    public static function entrance_refundsTab($request)
    {
        $data = EntranceRefundController::getEntranceRefunds($request);
        $data = json_encode($data->toArray());

        return view(get_template() . '.entrance_refunds.index', compact('request', 'data'));
    }

    public static function entranceTab($request)
    {
        PermissionController::canByPregMatch('Смотреть поступления');
        $data = EntranceController::getEntrances($request);
        $data = json_encode($data->toArray());
        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-entrance') {
            return view(get_template() . '.entrance.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.entrance.index', compact('request', 'data'));
    }

    public static function documentsTab(Request $request)
    {
        PermissionController::canByPregMatch('Смотреть документы');
        $data = DocumentController::getDocuments($request);
        $data = json_encode($data->toArray());
        return view(get_template() . '.documents.index', compact('request', 'data'));
    }

    public static function providerTab($request)
    {
        //PermissionController::canByPregMatch('Смотреть заявки поставщикам');
        $tp = new TrinityController('B61A560ED1B918340A0DDD00E08C990E');
        $brands = $tp->searchBrands($request['search'], $online = true, $asArray = false);
        if ($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table-provider') {
            return view(get_template() . '.provider.elements.table_container', compact('brands', 'request'));
        }
        return view(get_template() . '.provider.index', compact('brands', 'request'));
    }

    public static function shipmentsTab($request)
    {
        PermissionController::canByPregMatch('Смотреть продажи');

        $data = ShipmentController::getShipments($request);
        $data = json_encode($data->toArray());

        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-shipments') {
            return view(get_template() . '.shipments.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.shipments.index', compact('request', 'data'));
    }

    public static function refundTab($request)
    {
        PermissionController::canByPregMatch('Смотреть возвраты');

        $data = RefundController::getRefunds($request);
        $data = json_encode($data->toArray());

        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-refund') {
            return view(get_template() . '.refund.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.refund.index', compact('request', 'data'));
    }

    public static function client_ordersTab($request)
    {
        $data = ClientOrdersController::getClientOrders($request);
        $data = json_encode($data->toArray());

        PermissionController::canByPregMatch('Смотреть заказ клиента');
        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-client_orders') {
            return view(get_template() . '.client_orders.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.client_orders.index', compact('request', 'data'));
    }

    public static function provider_ordersTab($request)
    {
        PermissionController::canByPregMatch('Смотреть заявки поставщикам');

        $data = ProviderOrdersController::getPoviderOrders($request);
        $data = json_encode($data->toArray());

        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-provider_orders') {
            return view(get_template() . '.provider_orders.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.provider_orders.index', compact('request', 'data'));
    }

    public static function adjustmentTab($request)
    {
        PermissionController::canByPregMatch('Смотреть корректировки');

        $data = AdjustmentController::getAdjustments($request);
        $data = json_encode($data->toArray());

        if ($request['view_as'] == 'json' && $request['target'] == 'ajax-table-adjustment') {
            return view(get_template() . '.adjustments.elements.table_container', compact('request', 'data'));
        }
        return view(get_template() . '.adjustments.index', compact('request', 'data'));
    }

    public function import(StoreImportRequest $request)
    {
        $products = [];

        $file = $request->file('file');

        if ($file->getClientOriginalExtension() == 'xml') {

            #Парсим файл xml формата

            $xml_string = file_get_contents($file->path());
            $products = simplexml_load_string($xml_string);

            foreach ($products as $product) {

                $products[] = [
                    'name' => (string)$product->name,
                    'manufacturer' => (string)$product->manufacturer,
                    'article' => (string)$product->article,
                    'categories' => (array)$product->categories->category,
                    'warehouse' => array_values((array)$product->warehouse),
                    'count' => (int)$product->count,
//                    'midprice' => (float)$product->midprice,
                    'barcode_manufacturer' => (string)$product->barcode_manufacturer,
                    'barcode_warehouse' => (string)$product->barcode_warehouse
                ];
            }
        }
        else {
            #Парсим файл txt или csv формата

            if (($handle = fopen($file, 'r')) !== FALSE) {
                while (($row = fgetcsv($handle, 1000, ';')) !== FALSE) {

                    $products[] = [
                        'name' => $row[0] ?? '',
                        'manufacturer' => $row[1],
                        'article' => $row[2],
                        'categories' => explode(',', $row[3] ?? []),
                        'warehouse' => explode(',', $row[4] ?? []),
                        'count' => $row[5] ?? 0,
                        'price' => $row[6] ?? 0.0,
                        'barcode_manufacturer' => $row[7] ?? '',
                        'barcode_warehouse' => $row[8] ?? ''
                    ];
                }

                fclose($handle);
            }
        }

        $params = [
            'store' => Store::find($request->store_id),
            'user_id' => Auth::id(),
            'company_id' => Auth::user()->company->id,
        ];

        $this->dispatch(new StoreImportProduct($params, $products));

        return response()->json(['status' => 'success']);
    }

    public static function storeImportDialog(Request $request)
    {
        $stores = Store::where('company_id', Auth::user()->company->id)->get();

        $class = 'storeImportDialog';

        return response()->json([
            'tag' => $class,
            'html' => view(get_template() . '.store.dialog.form_import_store', compact('stores', 'request', 'class'))->render()
        ]);
    }

    public static function storeDialog($request)
    {
        $store = Store::find($request['store_id']);

        $tag = 'storeDialog' . ($store->id ?? '');

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.store.dialog.form_store', compact('store', 'request'))->render()
        ]);
    }

    public function store(StoreRequest $request)
    {
        $store = Store::firstOrNew(['id' => (int)$request['id']]);
        if ($store->exists) {
            $message = 'Склад обновлен';
        } else {
            $message = 'Склад создан';
        }
        $store->fill($request->all());
        $store->company_id = Auth::user()->company_id;
        $store->save();

        event(new ModelWasStored($store->company_id, 'StoreStored'));

        return response()->json([
            'message' => $message,
            //'container' => 'ajax-table-store'
        ]);
    }

    public function checkstock(Request $request)
    {
        $items = [];
        foreach ($request['ids'] as $id) {
            $product = Product::owned()->where('id', $id)->first();
            if ($product) {
                $items[$product->id]['id'] = $id;
                $items[$product->id]['count'] = $product->getCountInStoreId($request['store_id']);
            }
        }

        if ($request->expectsJson()) {
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

        if ($store->company->id != Auth::user()->company_id) {
            $message = 'Вам не разрешено удалять этот склад';
            $status = 422;
        }

        if ($store->products()->count()) {
            $message = 'На складе имеются товары в наличии';
            $status = 422;
        }

        if ($status == 200) {
            if (!$store->delete()) {
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

    public function getAnalogues(Request $request)
    {
        $brand = $request->brand;
        $article = $request->article;

        $controller = new AnalogController();

        $analogues = $controller->getAnalogues($brand, $article);

        $products = [];

        foreach ($analogues as $brand => $brandArticles) {
            $products = array_merge($products, $brandArticles);
        }

        $analogueProducts = Product::with('supplier')->owned()->whereIn('article', $products)->get();

        $brands = array_keys($analogues);

        $brands = array_map(function ($brand){
            return strtoupper($brand);
        }, $brands);

        $analogueProducts = $analogueProducts->filter(function ($product) use($brands, $analogues) {
            return in_array(strtoupper($product->supplier->name), $brands);
        });

        return response()->json([
            'analogues' => $analogueProducts->pluck('id')
        ]);
    }
}
