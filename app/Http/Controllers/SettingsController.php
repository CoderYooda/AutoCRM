<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\SaveCompanySettingsRequest;
use App\Models\Cashbox;
use App\Models\Company;
use App\Models\DdsArticle;
use App\Models\Partner;
use App\Models\Payment;
use App\Models\ImportHistory;
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
        PermissionController::canByPregMatch('Смотреть настройки');
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

    public static function indexTab($request)
    {

        $company = Auth::user()->company()->first();
        $settings = Setting::owned()->get();
        $roles = Role::where('company_id', Auth::user()->company->id)->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.index', compact('request', 'company', 'settings', 'roles'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.settings.index', compact('request', 'company', 'settings', 'roles'));
    }

    public static function cashboxTab($request)
    {
        $cashboxes = Cashbox::owned()->orderBy('created_at', 'ASC')->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-cashbox'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.elements.cashbox_container', compact('cashboxes', 'request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.settings.cashbox', compact('cashboxes','request'));
    }

    public static function requisitesTab(Request $request)
    {
        $company = Auth::user()->company;

        return view(get_template() . '.settings.requisites', compact('request', 'company'));
    }

    public function saveCompanySettings(SaveCompanySettingsRequest $request)
    {
        Company::where('id', $request->company_id)->update($request->validated());

        return response()->json([
            'message' => 'Настройки успешно сохранены.',
            'type' => 'success'
        ]);
    }

    public static function storeTab($request)
    {
        $stores = Store::owned()->orderBy('created_at', 'DESC')->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-store'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.elements.store_container', compact('stores', 'request'));
        }

        $company_id = Auth::user()->company->id;

        $last_imports = ImportHistory::with('partner', 'store')
            ->where('company_id', $company_id)
            ->where('created_at', '>', Carbon::now()->addDays(-14))
            ->get();

        return view(env('DEFAULT_THEME', 'classic') . '.settings.store', compact('stores','request', 'last_imports'));
    }

    public static function roleTab($request)
    {
        $roles = RoleController::getRoles($request);
		$users = User::owned()->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-role'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.elements.role_container', compact( 'roles','users', 'request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.settings.role', compact('roles','users', 'request'));
    }

    public static function smsTab($request)
    {
        $smses = SmsController::getCompanySms();
        $users = User::owned()->get();
        $payments = Payment::owned()->where('type', 'pay_to_sms')->orderBy('id', 'DESC')->get();

//        foreach ($payments as $payment){
//            $payment->freshStatus();
//        }

        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-sms'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.elements.sms_container', compact( 'smses','users', 'request', 'payments'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.settings.sms', compact('smses','users', 'request', 'payments'));
    }


    public static function DdsarticleTab($request)
    {
        $Ddsarticles = DdsarticleController::getDdsarticles($request);
        $categories = CategoryController::getCategories($request, 'dds');

        $cat_info = [];
        $cat_info['route'] = 'SettingsIndex';
        $cat_info['params'] = ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content'];


        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.ddsarticle', compact('Ddsarticles','categories', 'cat_info', 'request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.settings.ddsarticle', compact('Ddsarticles','categories', 'cat_info', 'request'));
    }

    //Saves

    public static function createCompanySettingsPack($company, $defaultrole)
    {
        Setting::create(['name' => 'Стандартная наценка (%)', 'company_id' => $company->id, 'model' => NULL,  'type' => 'number', 'key' => 'markup', 'value' => '10']);
        Setting::create(['name' => 'Роль для новых пользователей', 'company_id' => $company->id, 'model' => 'Role', 'type' => 'select', 'key' => 'role_id', 'value' => $defaultrole->id]);
        Setting::create(['name' => 'Расчётный день', 'company_id' => $company->id, 'model' => 'Role', 'type' => 'number', 'key' => 'day_id', 'value' => '1']);
    }

    public function baseStore(Request $request)
    {
        PermissionController::canByPregMatch('Редактировать настройки');

        $company = Company::firstOrNew(['id' => $request['id']]);
        $company->name = $request['company_name'];
        $company->save();

        $settings = Setting::owned()->get();

        foreach($settings as $setting){
            if($request[$setting->key] != null){
                $setting->value = $request[$setting->key];
                $setting->save();
            }
        }

        if($request->expectsJson()){
            return response()->json([
                'message' => 'Настройки обновлены',
                'id' => $company->id,
                'event' => 'SettingsStored',
            ], 200);
        } else {
            return redirect()->back();
        }

    }

    public function freshBaseStore(Request $request)
    {
        $company = Company::where('id', $request['id'])->first();
        $settings = Setting::owned()->get();

        $content = view(env('DEFAULT_THEME', 'classic') . '.settings.elements.base_settings', compact( 'company','request', 'settings'))
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

}
