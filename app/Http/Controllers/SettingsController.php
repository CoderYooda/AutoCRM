<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Cashbox;
use App\Models\Company;
use App\Models\DdsArticle;
use App\Models\Setting;
use App\Models\Store;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Auth;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class SettingsController extends Controller
{
    public $page_title = 'Настройки';

    public function index(Request $request)
    {

        $this->page_title = 'Настройки';
        $target = HC::selectTarget(); // цель ajax подгрузки

        if(!Gate::allows('Смотреть настройки')){
            return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
        }

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

    public static function storeTab($request)
    {
        $stores = Store::owned()->orderBy('created_at', 'DESC')->get();
        if($request['view_as'] == 'json' && $request['target'] == 'ajax-table-store'){
            return view(env('DEFAULT_THEME', 'classic') . '.settings.elements.store_container', compact('stores', 'request'));
        }
        return view(env('DEFAULT_THEME', 'classic') . '.settings.store', compact('stores','request'));
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
