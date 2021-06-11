<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\PartnerRequest;
use App\Http\Requests\SaveCompanySettingsRequest;
use App\Http\Requests\SettingsMasterRequest;
use App\Models\Cashbox;
use App\Models\Company;
use App\Models\DdsArticle;
use App\Models\Partner;
use App\Models\Payment;
use App\Models\ImportHistory;
use App\Models\Markup;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Store;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class SettingsController extends Controller
{
    public $page_title = 'Настройки';

    public function index(Request $request)
    {
//        PermissionController::canByPregMatch('Смотреть настройки');
        $this->page_title = 'Настройки';
        $target = HC::selectTarget(); // цель ajax подгрузки

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'index';
        }

        $classname = $request['active_tab'] . 'Tab';
        $content = self::$classname($request);

        if(class_basename($content) == "JsonResponse"){
            return $content;
        }

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $this->page_title,
                'html' => $content->render()]);
        } else {
            return $content;
        }
    }

    public static function indexTab(Request $request)
    {
        $user = Auth::user();
        $company = $user->company();

        $settings = Setting::owned()->orderBy('sort')->get();
        $roles = Role::where('company_id', $user->company_id)->get();
        $prices = Markup::where('company_id', $user->company_id)->get();

        return view(get_template() . '.settings.index', compact('request', 'company', 'settings', 'roles','prices'));
    }

    public function pricesTab(Request $request)
    {
        $company = Auth::user()->company;

        $prices = Markup::where('company_id', $company->id)->paginate(10);

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-prices'){
            return view(get_template() . '.settings.elements.prices_inner', compact('prices', 'request'));
        }

        return view(get_template() . '.settings.prices', compact('request', 'prices'));
    }

    public static function cashboxTab(Request $request)
    {
        $cashboxes = Cashbox::owned()->orderBy('deleted_at', 'ASC')->withTrashed()->get();

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-cashbox'){
            return view(get_template() . '.settings.elements.cashbox_container', compact('cashboxes', 'request'));
        }
        return view(get_template() . '.settings.cashbox', compact('cashboxes','request'));
    }

    public static function servicesTab(Request $request)
    {
        $services = Service::all();
        $company = Auth::user()->company->load('serviceproviders');

        return view(get_template() . '.settings.services', compact('services', 'company', 'request'));
    }

    public static function requisitesTab(Request $request)
    {
        $company = Auth::user()->company;

        return view(get_template() . '.settings.requisites', compact('request', 'company'));
    }

    public static function paymentTab(Request $request)
    {
        /** @var Payment $payments */
        $payments = Payment::owned()->where('type', 'pay_to_store')->orderBy('id', 'DESC')->get();

        /** @var Payment $payment */
        foreach ($payments as $payment){

            if(in_array($payment->status, ['NEW','FORM_SHOWED','3DS_CHECKING'])){
                $payment->freshStatus();
            }
        }

        $company = Auth::user()->company;

        return view(get_template() . '.settings.payment', compact('request', 'company', 'payments'));
    }

    public function saveCompanySettings(SaveCompanySettingsRequest $request)
    {
        Company::where('id', $request->company_id)->update($request->validated());

        return response()->json([
            'message' => 'Настройки успешно сохранены.',
            'type' => 'success'
        ]);
    }

    public static function storeTab(Request $request)
    {
        $stores = Store::owned()->orderBy('created_at', 'DESC')->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-store'){
            return view(get_template() . '.settings.elements.store_container', compact('stores', 'request'));
        }

        $company_id = Auth::user()->company_id;

//        \App\Models\Store::where('id',auth()->user()->current_store)->first()->hash

        $last_imports = ImportHistory::with('partner', 'store')
            ->where('company_id', $company_id)
            ->where('created_at', '>', Carbon::now()->addDays(-14))
            ->get();


        $store_hash = Auth::user()->store->hash;
        return view(get_template() . '.settings.store', compact('stores','request', 'last_imports','store_hash'));
    }

    public static function roleTab(Request $request)
    {
        $roles = RoleController::getRoles($request);
		$users = User::owned()->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-role'){
            return view(get_template() . '.settings.elements.role_container', compact( 'roles','users', 'request'));
        }
        return view(get_template() . '.settings.role', compact('roles','users', 'request'));
    }

    public static function smsTab(Request $request)
    {
        $smses = SmsController::getCompanySms();
        foreach ($smses as $sms){
            $sms->message = preg_replace('/[0-9]/', "*", $sms->message);
        }
        $users = User::owned()->get();
        $payments = Payment::owned()->where('type', 'pay_to_sms')->orderBy('id', 'DESC')->get();

//        foreach ($payments as $payment){
//            $payment->freshStatus();
//        }

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-sms'){
            return view(get_template() . '.settings.elements.sms_container', compact( 'smses','users', 'request', 'payments'));
        }
        return view(get_template() . '.settings.sms', compact('smses','users', 'request', 'payments'));
    }

    public static function DdsarticleTab($request)
    {
        $Ddsarticles = DdsarticleController::getDdsarticles($request);
        $categories = CategoryController::getCategories($request, 'dds');

        $cat_info = [];
        $cat_info['route'] = 'SettingsIndex';
        $cat_info['params'] = ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content'];


        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view(get_template() . '.settings.ddsarticle', compact('Ddsarticles','categories', 'cat_info', 'request'));
        }
        return view(get_template() . '.settings.ddsarticle', compact('Ddsarticles','categories', 'cat_info', 'request'));
    }

    public static function createCompanySettingsPack($company, $defaultrole)
    {
        //Setting::create(['name' => 'Стандартная наценка (%)', 'company_id' => $company->id, 'model' => NULL,  'type' => 'number', 'key' => 'markup', 'value' => '10']);
        Setting::create(['name' => 'Роль для новых пользователей', 'company_id' => $company->id, 'model' => 'Role', 'type' => 'select', 'key' => 'role_id', 'value' => $defaultrole->id]);
        Setting::create(['name' => 'Расчётный день', 'company_id' => $company->id, 'model' => null, 'type' => 'number', 'key' => 'day_id', 'value' => '1']);
//        Setting::create(['name' => 'Способ ведения складского учёта', 'company_id' => $company->id, 'model' => 'RRC',  'type' => 'select', 'key' => 'rrc_name', 'value' => 'fifo']);
        Setting::create(['name' => 'Источник цены', 'company_id' => $company->id, 'model' => 'PriceSource',  'type' => 'select', 'key' => 'price_source', 'value' => 'purchase']);
        Setting::create(['name' => 'Интернет магазин', 'company_id' => $company->id, 'model' => 'ShopEnabled',  'type' => 'select', 'key' => 'shop_enabled', 'value' => '0']);

    }

    public static function createCompanyDefaultPriceToProduct($company,$price)
    {
        Setting::create(['name' => 'Источник формирования цены для новых товаров', 'company_id' => $company->id, 'model' => 'DefaultMarkup',  'type' => 'select', 'key' => 'default_markup', 'value' => $price->id]);

    }

    public function baseStore(Request $request)
    {
        PermissionController::canByPregMatch('Редактировать настройки');

        $company = Auth::user()->company()->first();
//        $company = Company::firstOrNew(['id' => $request['id']]);
//        $company->name = $request['company_name'];
//        $company->save();

        $settings = Setting::owned()->get();

        foreach($settings as $setting){
            if($request[$setting->key] != null){
                $setting->value = $request[$setting->key];
                $setting->save();
            }
        }

        event(new ModelWasStored($company->id, 'SettingsStored'));

        return response()->json([
            'message' => 'Настройки обновлены',
            'id' => $company->id,
            'event' => 'SettingsStored',
        ]);
    }

    public function freshBaseStore(Request $request)
    {
        $company = Auth::user()->company()->first();
        $settings = Setting::owned()->get();

        $content = view(get_template() . '.settings.elements.base_settings', compact( 'company','request', 'settings'))
            ->render();

        return response()->json([
            'html' => $content,
            'target' => 'baseSettingsForm',
        ], 200);
    }

    public static function getSettingByKey($key)
    {
        $setting = Setting::owned()->where('key', $key)->first();
        if($setting === null){
            $setting = false;
        }
        return $setting;
    }

    public function storeFromMaster(SettingsMasterRequest $request)
    {
        $company_values = ['name', 'owner', 'inn', 'ogrn', 'kpp', 'actual_address', 'legal_address', 'bik', 'bank', 'cs', 'rs', 'owner', 'auditor', 'is_company', 'similar_address', 'opf'];

        $company = Company::where('id', Auth::user()->company->id);

        $company->update(collect($request->validated())->only($company_values)->toArray());

        $setting = Setting::owned()->where('key' , 'markup')->first();
        $setting->value = $request->markup;
        $setting->save();

        if(isset( $request->validated()['employees'])){
            foreach($request->validated()['employees'] as $employee){
                $partner = new Partner();
                $partner->type = 0;
                $partner->company_id = Auth::user()->company->id;
                $partner->store_id = Auth::user()->getStoreFirst()->id;
                $partner->category_id = 5;
                $partner->fio = $employee['fio'];
                $partner->save();

                $phones = [
                    [
                        'number' => $employee['phone'],
                        'main' => true
                    ]
                ];

                $partner->upsertPhones($phones);

                if($employee['access']){
                    $password = rand(10000, 99999);
                    $user = User::create([
                        'name' => $partner->outputName(),
                        'phone' => $employee['phone'],
                        'company_id' => Auth::user()->company->id,
                        'password' => bcrypt($password)
                    ]);
                    $partner->user_id = $user->id;
                    $partner->save();

                    $role = \App\Models\Role::owned()->whereId(SettingsController::getSettingByKey('role_id')->value)->first();
                    $user->syncRoles([$role->id]);
                    if($user){
                        SmsController::sendSMS($user->phone, 'Вам предоставлен доступ к ' . env('APP_NAME') .'! Логин: ' . $user->phone . ' Пароль: ' . $password);
                    }
                }
            }
        }

        if(isset( $request->validated()['partners'])){
            foreach($request->validated()['partners'] as $partn){
                $partner = new Partner();
                $partner->type = 2;
                $partner->company_id = Auth::user()->company->id;
                $partner->category_id = 6;
                $partner->fio = $partn['fio'];
                $partner->companyName = $partn['companyName'];
                $partner->save();

                $phones = [
                    [
                        'number' => $employee['phone'],
                        'main' => false
                    ]
                ];

                $phones = PhoneController::upsertPhones(['company_id' => Auth::user()->company->id, 'phones_main' => 0, 'phones' => [['number' => $employee['phone']]]]);
                $partner->phones()->sync($phones->pluck('id'));
            }
        }

        $sm_serponce = $this->closeSettingsMaster();

        return response()->json([
            'message' => 'Настройки успешно сохранены.',
            'type' => 'success'
        ]);
    }

    public function closeSettingsMaster()
    {
        $company = Company::where('id', Auth::user()->company->id)->first();
        $company->set_master_complite = true;
        $company->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    public static function providerDialog($request)
    {
        $tag = 'providerDialog';
        $class = 'providerDialog';

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.settings.dialog.form_provider', compact('request', 'class'))->render()
        ]);
    }

}
