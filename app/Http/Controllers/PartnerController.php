<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\PartnerRequest;
use App\Models\Article;
use App\Models\Category;
use App\Models\Partner;
use App\Http\Controllers\CategoryController;
use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Milon\Barcode\DNS1D;
use App\Models\Store;
use Auth;
use SystemMessage;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\SmsController;
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
            $content = view(env('DEFAULT_THEME', 'classic') . '.partner.index', compact('request', 'categories', 'cat_info'))->render();
            return response()->json([
                'target' => 'ajax-content',
                'page' => 'Контакты',
                'html' => $content
            ]);
        } elseif($request->expectsJson() && $request['search'] != NULL){
            $content = view(env('DEFAULT_THEME', 'classic') . '.partner.elements.list_container', compact('request', 'categories', 'cat_info'))->render();
            return response()->json([
                'html' => $content,
                'target' => 'ajax-table-partner',
            ], 200);
        } else {
            return view(env('DEFAULT_THEME', 'classic') . '.partner.index', compact('request', 'categories', 'cat_info'));
        }

    }

    public static function partnerDialog(Request $request)
    {
        $tag = 'partnerDialog';

        $partner = null;

        if($request['partner_id']){
            $tag .= $request['partner_id'];
            $partner = Partner::with('vehicles', 'passport')->findOrFail($request['partner_id']);
        }

//        if($request['partner_select']){
//            $partner_select = (int)$request['partner_select'];
//            $partner = Partner::where('company_id', Auth::user()->id)->where('id', $partner_select)->first();
//            $tag = 'partnerDialog' . $partner->id;
//        } else {
//            $partner = null;
//            $tag = 'partnerDialog';
//        }

        $stores = Store::owned()->get();

        $category = Category::findOrFail($request['category_select'] ?: 3);

        $view = view(env('DEFAULT_THEME', 'classic') . '.partner.dialog.form_partner', compact('partner', 'category', 'request', 'stores'))
            ->with('vehicles', $partner ? Auth::user()->partner->vehicles : [])
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view,
        ];

        return response()->json($response);
    }

//    public static function partnerDialog($request)
//    {
//        $tag = 'editPartner';

//
//        return response()->json(['tag' => $tag, 'html' => view('partner.dialog.form_partner', compact('partner'))->render()]);
//    }

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
        if(!$request['isfl']){
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
        $partner->foundstring = mb_strtolower(str_replace(array('(', ')', ' ', '-', '+'), '', $partner->fio . $partner->companyName . $phones_str));
        $partner->save();

        UA::makeUserAction($partner, $wasExisted ? 'fresh' : 'create');

        if($request['access']){
            SystemMessage::sendToCompany(Auth::user()->company()->first()->id, 'success', 'Предоставлен доступ к системе, ' . $partner->outputName(), Auth::user());
            $user = $partner->user()->first();
            if($user != null){
                $user->banned_at = null;
                $user->save();
            } else {
                $password = rand(10000, 99999);
                $user = User::create([
                    'name' => $partner->outputName(),
                    'phone' => $request['phone'],
                    'company_id' => Auth::user()->company()->first()->id,
                    'password' => bcrypt($password)
                ]);
                $partner->user_id = $user->id;
                $partner->store_id = $request['store_id'];
                $partner->save();

                $role = Role::owned()->whereId(SettingsController::getSettingByKey('role_id')->value)->first();
                $user->syncRoles([$role->id]);

                if($user){
                    SmsController::sendSMS($user->phone, 'Вам предоставлен доступ к ' . env('APP_NAME') .'! Логин: ' . $user->phone . ' Пароль: ' . $password);
                }
            }
        } else {
            if($partner->user()->first() != null){
                $user = $partner->user()->first();
                $user->banned_at = Carbon::now();
                $user->save();
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
        if($id == 'array'){
            $partners = Partner::owned()->whereIn('id', $request['ids']);
            $this->message = 'Контакты удалены';
            foreach($partners->get() as $partner){
                if($partner->company()->first()->id != Auth::user()->company()->first()->id){
                    $this->message = 'Вам не разрешено удалять контакт';
                    $this->status = 422;
                } else {

                    $partner->delete();
                    UA::makeUserAction($partner, 'delete');
                }
            }
            $returnIds = $partners->get()->pluck('id');
        } else {
            $partner = Partner::where('id', $id)->first();
            $this->message = 'Контакт удален';
            $returnIds = $partner->id;
            if($partner->company()->first()->id != Auth::user()->company()->first()->id){
                $this->message = 'Вам не разрешено удалять контакт';
                $this->status = 422;
            }
            $partner->delete();
            UA::makeUserAction($partner, 'delete');
        }
        $this->status = 200;


        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], $this->status);
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
        $partners = Partner::where(function($q) use ($request){


            $q->where('foundstring', 'LIKE', '%' . $request['string'] .'%');
            #Не оптимизированно, но более точно
//            $q->where('fio', 'LIKE', '%' . $request['string'] .'%')
//                ->orWhere('companyName', 'LIKE', '%' . $request['string'] .'%')
//                ->orWhereHas('phones', function ($query) use ($request) {
//                    $query->where('number', 'LIKE', '%' . $request['string'] .'%');
//                });
        })
            ->when($request['category_id'], function($q) use ($request){
                $q->where('category_id', $request['category_id']);
            })
            ->where('company_id', Auth::user()->company()->first()->id)
            ->orderBy('created_at', 'ASC')
            ->limit(30)
            ->get();
        $categories = CategoryController::getModalCategories(self::$root_category, $request);

        $view = $request['inner'] ? 'select_partner_inner' : 'select_partner';

        $content = view(env('DEFAULT_THEME', 'classic') . '.partner.dialog.' . $view, compact('partners', 'categories', 'class', 'request'))->render();
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
                'info' => view(env('DEFAULT_THEME', 'classic') . '.partner.contact-card', compact( 'partner','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function search(Request $request)
    {
        $partners = self::getPartners($request);
        $content = view(env('DEFAULT_THEME', 'classic') . '.partner.elements.list_container', compact('partners', 'request'))->render();
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

        foreach($partners as $partner){
            $partner->date = $partner->created_at->format('Y.m.d/H:i');
        }

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

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        if($request['accountable'] == null){
            $request['accountable'] = [];
        }

        $partners = Partner::select(DB::raw('
            partners.id, partners.created_at, partners.company_id, partners.balance, partners.created_at as date, basePhone as phone, cat.name as category, IF(partners.isfl = 1, partners.fio, partners.companyName) as name
        '))
            ->from(DB::raw('
                partners
                left join categories as cat on cat.id = partners.category_id
            '))
            ->where('partners.company_id', Auth::user()->company()->first()->id)
            ->where(function($q) use ($request){
                if(isset($request['category_id']) && $request['category_id'] != "" && $request['category_id'] != "null"){
                    $q->where('partners.category_id', (int)$request['category_id']);
                }
            })



//            ->where(function($q) use ($request){
//                if(isset($request['search']) && $request['search'] != ""){
//                    $q->where('articles.foundstring', 'LIKE' , '%' . mb_strtolower (str_replace(' ', '', $request['search'])) . '%');
//                }
//            })
            ->when($request['search'] != null, function($query) use ($request) {
                if(mb_strlen($request['search']) == 1){
                    $query->where(function($q) use ($request){
                        $q->where('fio', 'like', $request['search'].'%')->orWhere('companyName', 'like', $request['search']);
                    });
                } else {
                    $query->where(function($q) use ($request){
                        $q->where('foundstring', 'like', '%' . str_replace(array('(', ')', ' ', '-'), '', $request['search']) . '%');
                    });
                }
            })


            ->when($request['provider'] != [], function($query) use ($request) {
                $query->whereIn('partner_id', $request['provider']);
            })
            ->when($request['clientorder_status'] != null, function($query) use ($request) {
                $query->where('status', $request['clientorder_status']);
            })
            ->when($request['accountable'] != [], function($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['accountable']);
            })
//            ->when($request['dates_range'] != null, function($query) use ($request) {
//                $query->whereBetween('client_orders.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
//            })
            
            ->groupBy('partners.id')

            ->orderBy($field, $dir)
//            ->toSql();
//
//            dd($partners);
            ->paginate($size);

        return $partners;







//        #TODO слить методы выборки сущностей (6.10)
//        $category = 3;
//        if($request['category_id']){
//            $category = (int)$request['category_id'];
//        }
//        if($request['page']){
//            Paginator::currentPageResolver(function () use ($request) {
//                return (int)$request['page'];
//            });
//        }
//        $partners = Partner::where('company_id', Auth::user()->company()->first()->id )->with('passport')->where(function($q) use ($request, $category){
//            if($category != 3) {
//                $q->where('category_id', $category);
//            } else {
//
//            }
//
//            if($request['search'] != null) {
//                if (mb_strlen($request['search']) === 1) {
//                    $q->where('fio', 'LIKE', $request['search'] . '%' )
//                        ->orWhere('companyName', 'LIKE', $request['search'] . '%');
//                } else {
//                    $q->where('fio', 'LIKE', '%' . $request['search'] . '%')
//                        ->orWhere('companyName', 'LIKE', '%' . $request['search'] . '%')
//                        ->orWhereHas('phones', function ($query) use ($request) {
//                            $query->where('number', 'LIKE', '%' . $request['search'] . '%');
//                        });
//                }
//                $q->orWhere('barcode', $request['search']);
//            }
//        })->orderBy('created_at', 'ASC')->paginate(11);
//
//        return $partners;
    }

}
