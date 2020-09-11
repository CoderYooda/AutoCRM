<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\DeletePartnerRequest;
use App\Http\Requests\PartnerRequest;
use App\Models\Category;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\SMSMessages;
use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Store;
use SystemMessage;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use App\Models\Role;

class PartnerController extends Controller
{
    private static $root_category = 3;

    public function _construct()
    {

    }

    public function index(Request $request)
    {
        PermissionController::canByPregMatch('Смотреть контакты');

        $target = HC::selectTarget();
	    if(!Gate::allows('Смотреть контакты')){
		    return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
	    }
        $categories = CategoryController::getCategories($request, 'partner');
        $cat_info = [];
        $cat_info['route'] = 'PartnerIndex';
        $cat_info['params'] = ['active_tab' => 'store'];
        $cat_info['root_id'] = 3;
        if($request->expectsJson() && $request['search'] === NULL){
            $content = view(get_template() . '.partner.index', compact('request', 'categories', 'cat_info'))->render();
            return response()->json([
                'target' => 'ajax-content',
                'page' => 'Контакты',
                'html' => $content
            ]);
        } elseif($request->expectsJson() && $request['search'] != NULL){
            $content = view(get_template() . '.partner.elements.list_container', compact('request', 'categories', 'cat_info'))->render();
            return response()->json([
                'html' => $content,
                'target' => 'ajax-table-partner',
            ], 200);
        } else {
            return view(get_template() . '.partner.index', compact('request', 'categories', 'cat_info'));
        }

    }

    public static function partnerDialog(Request $request)
    {
        #Фикс транспорта для нового пользователя
        Vehicle::where('creator_id', Auth::id())->update(['creator_id' => null]);

        $tag = 'partnerDialog';

        $partner = null;

        if($request->partner_id != null || $request->user_id != null){

            $p_id = isset($request['partner_id']) ? $request['partner_id'] : $request['user_id'];

            $tag .= $p_id;

            $partner = Partner::with('vehicles', 'passport')->find($request->partner_id);
            if($partner == null){
                return response()->json([
                    'message' => 'Контакт не был найден, возможно он был удалён',
                    'type' => 'error'
                ], 422);
            }
            if($partner->category->name == 'Анонимы') {
                return response()->json([
                    'message' => 'Запрещено редактировать анонимов',
                    'type' => 'error'
                ], 422);
            }
        }

        $stores = Store::owned()->get();

        //Если указан партнер, то его категорию, если нет, то категорию в которой находимся, если нет, то стандартную
        $category = Category::findOrFail($partner == null ? ($request['category_select'] ?: 3) : $partner->category->id);

        $view = view(get_template() . '.partner.dialog.form_partner', compact('partner', 'category', 'request', 'stores'))
            ->with('vehicles', $partner->vehicles ?? [])
            ->with('class', $tag)
            ->with('roles', Role::where('company_id', Auth::user()->company->id)->get())
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view
        ];

        return response()->json($response);
    }

    public function store(PartnerRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать контакты' : 'Создавать контакты');

        $partner = Partner::firstOrNew(['id' => $request['id']]);
        $wasExisted = false;
        if($partner->exists){
            $wasExisted = true;
            $message = "Контакт обновлен";
            $request['user_id'] = $partner->user_id;
            $request['company_id'] = $partner->company_id;
        } else{
            $request['company_id'] = Auth::user()->company()->first()->id;
            $message = "Контакт создан";
        }

        if($request['birthday']){
            $request['birthday'] = Carbon::parse($request['birthday']);
        }

        $partner->fill($request->only($partner->fields));
        if($request['type'] == 2){
            $partner->fio = $request['ur_fio'];
        }
        $phones = PhoneController::upsertPhones($request);
        if($phones->count()){
            $partner->basePhone = $phones->where('main', true)->first()->number;
        }
        $partner->save();
        PassportController::upsertPassport($request, $partner);
//        $car = CarController::upsertPassport($request);
        $partner->phones()->sync($phones->pluck('id'));
        //$partners = self::getPartners($request);
        //$categories = CategoryController::getCategories($request, 'partner');

        //$content = view('partner.elements.list_container', compact('partners', 'categories', 'request'))->render();

        //SystemMessage::sendToAllButOne();

        $phones_str = '';
        foreach($partner->phones as $phone){
            $phones_str .= $phone->number;
        }
        $partner->foundstring = mb_strtolower(str_replace(array('(', ')', ' ', '-', '+'), '', $partner->fio . $partner->companyName . $phones_str . $partner->barcode));
        $partner->save();

        UA::makeUserAction($partner, $wasExisted ? 'fresh' : 'create');

        if($request['access']){
            SystemMessage::sendToCompany(Auth::user()->company_id, 'success', 'Предоставлен доступ к системе, ' . $partner->outputName(), $partner);
            $user = $partner->user;
            if($user != null){
                $user->banned_at = null;
                $user->save();
            } else {
                $password = rand(10000, 99999);

                $user = User::updateOrCreate(['phone' => $request['phone']], [
                    'name' => $partner->outputName(),
                    'company_id' => Auth::user()->company->id,
                    'password' => bcrypt($password)
                ]);

                if($request['role']) {
                    $role = Role::where('name', $request['role'])->first();
                    $user->syncRoles([ $role->id ]);
                }

                if(!$user->wasRecentlyCreated && $user->partner) {
                    $user->partner->update([
                        'user_id' => null
                    ]);
                    $user->update(['banned_at' => null]);
                }

                $partner->user_id = $user->id;
                $partner->store_id = $request['store_id'];
                $partner->save();

                if($user) {
                    SmsController::sendSMS($user->phone, 'Вам предоставлен доступ к ' . env('APP_NAME') .'! Логин: ' . $user->phone . ' Пароль: ' . $password);
                }
            }
        } else {
            if($partner->user != null){

                if($partner->id == auth()->user()->partner->id) {
                    return response()->json([
                        'message' => 'Вы не можете заблокировать себя.',
                        'type' => 'error'
                    ]);
                }

                $partner->user->update(['banned_at' => Carbon::now()]);
            }
        }

        if($request->has('vehicle_ids')) {
            Vehicle::whereIn('id', $request->vehicle_ids)->update(['partner_id' => $partner->id]);
        }

        if($request->expectsJson()){

            return response()->json([
                'message' => $message,
                //'container' => 'ajax-table-partner',
                //'redirect' => route('PartnerIndex', ['category_id' => $partner->category()->first()->id, 'serach' => $request['search']]),
                'event' => 'PartnerStored',
                'id' => $partner->id
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id, Request $request)
    {
        PermissionController::canByPregMatch('Удалять контакты');

        $returnIds = null;

        $this->status = 200;
        $this->message = 'Удаление выполнено';
        $this->type = 'success';

        if($id == 'array') {
            $partners = Partner::owned()->with('company')->whereIn('id', $request['ids'])->get();

            foreach($partners as $partner){
                if($partner->company->id != Auth::user()->company->id || $partner->id == Auth::user()->partner->id){
                    $this->message = 'Вам не разрешено удалять контакт';
                    $this->type = 'error';
                } else {
                    $partner->delete();
                    UA::makeUserAction($partner, 'delete');
                }
            }
            $returnIds = $partners->pluck('id');
        } else {
            $partner = Partner::find($id);
            if($partner->company->id != Auth::user()->company->id || $partner->id == Auth::user()->partner->id){
                $this->message = 'Вам не разрешено удалять контакт';
                $this->type = 'error';
            }
            else {
                $partner->delete();
                UA::makeUserAction($partner, 'delete');
                $returnIds = $partner->id;
            }
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message,
            'type' => $this->type
        ], $this->status);
    }

    public function checkPhone(Request $request)
    {
        $phone_exists = User::where('phone', $request->phone)->exists();

        if($phone_exists) {
            $code = rand(1111, 9999);

            session()->put('partner_code', $code);
            SmsController::sendSMS($request->phone, 'Код подтверждения: ' . $code);
        }

        return response()->json([
            'phone_exists' => $phone_exists,
            'code' => $code
        ], 200);
    }

    public static function selectPartnerDialog($request)
    {
        return self::selectPartnerInner($request);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectPartnerInner($request);
    }

    private static function selectPartnerInner($request){
        $class = 'selectPartnerDialog';

        $request['category_id'] = $request['category_id'] ? $request['category_id'] : self::$root_category;

        $partners = Partner::with('phones')
            ->when($request['string'], function($q) use ($request){
                $q->where('foundstring', 'LIKE', '%' . str_replace(array('(', ')', ' ', '-'), '', $request['string']) .'%');
            })
            ->when(!$request['string'] && $request['category_id'], function($q) use ($request){
                $q->where('category_id', $request['category_id']);
            })
            ->where('company_id', Auth::user()->company->id)
            ->orderBy('created_at', 'ASC')
            ->limit(30)
            ->get();

        $categories = CategoryController::getModalCategories(self::$root_category, $request);

        $view = $request['inner'] ? 'select_partner_inner' : 'select_partner';

        $content = view(get_template() . '.partner.dialog.' . $view, compact('partners', 'categories', 'class', 'request'))->render();
        return response()->json([
            'tag' => 'selectPartnerDialog',
            'html' => $content
        ]);
    }

    public function getSideInfo(Request $request)
    {
        $partner = Partner::owned()->where('id', $request['id'])->first();
        if($request->expectsJson()){
            return response()->json([
                'info' => view(get_template() . '.partner.contact-card', compact( 'partner','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function search(Request $request)
    {
        $partners = self::getPartners($request);
        $content = view(get_template() . '.partner.elements.list_container', compact('partners', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-partner',
        ], 200);
    }

    public function select(Partner $partner)
    {
        if(!$partner->exists){
            return response()->json([
                'message' => 'Контакт не найден, возможно он был удалён',
            ], 422);
        }
        return response()->json([
            'id' => $partner->id,
            'balance' => $partner->balance,
            'name' => $partner->outputName(),
            'phones' => $partner->phones()->get(),
            'phone' => $partner->firstActivePhoneNumber()
        ]);
    }

    public function tableData(Request $request)
    {
        $partners = PartnerController::getPartners($request);

        return response()->json($partners);
    }

    public static function getPartners($request)
    {
        if($request['category_id'] == 3){
            $request['category_id'] = null;
        }

        $size = 30;
        if(isset($request['size'])){
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }
        if($field === null &&  $dir === null){
            $field = 'id';
            $dir = 'DESC';
        }
        $partners = Partner::select(DB::raw('IF(partners.type != 2, partners.fio, partners.companyName) as name, partners.id, partners.fio, partners.companyName, partners.created_at, partners.company_id, partners.balance, partners.created_at as date, basePhone as phone, cat.name as category'))
            ->leftJoin('categories as cat', 'cat.id', '=', 'partners.category_id')
//            ->from(DB::raw('
//                partners
//                left join categories as cat on cat.id = partners.category_id
//            '))
            ->where('partners.company_id', Auth::user()->company_id)
            ->where(function($q) use ($request){
                if(isset($request['category_id']) && $request['category_id'] != "" && $request['category_id'] != 3 && $request['category_id'] != "null"){
                    $q->where('partners.category_id', (int)$request['category_id']);
                }
            })

            ->when($request['search'] != null, function($query) use ($request) {
                if(mb_strlen($request['search']) == 1){
                    $query->where(function($q) use ($request){
                        $q->where('fio', 'like', $request['search'].'%')->orWhere('companyName', 'like', $request['search']);
                    });
                } else {
                    $query->where('foundstring', 'like', '%' . str_replace(array('(', ')', ' ', '-'), '', $request['search']) . '%');
                }
            })
            //->groupBy('partners.id')

            ->orderBy($field, $dir)
            ->paginate($size);
//        ->toSql();

        return $partners;
    }

}
