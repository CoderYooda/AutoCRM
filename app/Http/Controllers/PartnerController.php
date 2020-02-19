<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Article;
use App\Models\Category;
use App\Models\Partner;
use App\Http\Controllers\CategoryController;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\Paginator;
use Milon\Barcode\DNS1D;
use App\Models\Store;
use Auth;
use SystemMessage;
use App\Http\Controllers\UserActionsController as UA;
use App\Http\Controllers\SmsController;


class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();
        $categories = CategoryController::getCategories($request, 'partner');
        $cat_info = [];
        $cat_info['route'] = 'PartnerIndex';
        $cat_info['params'] = ['active_tab' => 'store'];
        $cat_info['root_id'] = 3;
        if($request->expectsJson() && $request['search'] === NULL){
            $content = view(env('DEFAULT_THEME', 'classic') . '.partner.index', compact('request', 'categories', 'cat_info'))->render();
            return response()->json([
                'target' => 'ajax-content',
                'page' => 'Контрагенты',
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

    public static function partnerDialog($request)
    {
        $tag = 'partnerDialog';

        if($request['partner_id']){
            $tag .= $request['partner_id'];
            $partner = Partner::where('id', (int)$request['partner_id'])->with('passport')->first();
        } else {
            $partner = null;
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


        if($request['category_select']){
            $category_select = (int)$request['category_select'];
        } else {
            $category_select = 3;
        }
        $category = Category::where('id', $category_select)->first();

        return response()->json(['tag' => $tag, 'html' => view(env('DEFAULT_THEME', 'classic') . '.partner.dialog.form_partner', compact('partner', 'category', 'request', 'stores'))->render()]);
    }

//    public static function partnerDialog($request)
//    {
//        $tag = 'editPartner';

//
//        return response()->json(['tag' => $tag, 'html' => view('partner.dialog.form_partner', compact('partner'))->render()]);
//    }

    public function store(Request $request)
    {
        if($request['number']){
            $request['number'] = (int)str_replace(' ', '', $request['number']);
        }

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }
        $partner = Partner::firstOrNew(['id' => $request['id']]);
        $wasExisted = false;
        if($partner->exists){
            $wasExisted = true;
            $message = "Контрагент обновлен";
            $request['user_id'] = $partner->user_id;
            $request['company_id'] = $partner->company_id;
        } else{
            $request['company_id'] = Auth::user()->company()->first()->id;
            $message = "Контрагент создан";
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
        UA::makeUserAction($partner, $wasExisted ? 'fresh' : 'create');
        SystemMessage::sendToCompany(Auth::user()->company()->first()->id, 'success', 'awd');

        if($request['access']){
            $user = $partner->user()->first();
            if($user != null){
                $user->banned_at = null;
                $user->save();
            } else {
                $password = rand(10000, 99999);
                $user = User::create([
                    'name' => $partner->outputName(),
                    'phone' => str_replace(array('(', ')', '+', ' ', '-'), '', $request['login']),
                    'company_id' => Auth::user()->company()->first()->id,
                    'password' => bcrypt($password)
                ]);
                $partner->user_id = $user->id;
                $partner->store_id = $request['store_id'];
                $partner->save();
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

        if($request->expectsJson()){

            return response()->json([
                'message' => $message,
                //'container' => 'ajax-table-partner',
                //'redirect' => route('PartnerIndex', ['category_id' => $partner->category()->first()->id, 'serach' => $request['search']]),
                'event' => 'PartnerStored',
                //'html' => $content
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id, Request $request)
    {
        $returnIds = null;
        if($id == 'array'){
            $partners = Partner::owned()->whereIn('id', $request['ids']);
            $this->message = 'Контрагенты удалены';
            foreach($partners->get() as $partner){
                if($partner->company()->first()->id != Auth::user()->company()->first()->id){
                    $this->message = 'Вам не разрешено удалять этого контрагента';
                    $this->status = 422;
                } else {

                    $partner->delete();
                    UA::makeUserAction($partner, 'delete');
                }
            }
            $returnIds = $partners->get()->pluck('id');
        } else {
            $partner = Partner::where('id', $id)->first();
            $this->message = 'Контрагент удален';
            $returnIds = $partner->id;
            if($partner->company()->first()->id != Auth::user()->company()->first()->id){
                $this->message = 'Вам не разрешено удалять этого контрагента';
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



    private static function validateRules($request)
    {
        $rules = null;
        if((bool)$request['isfl']){
            $rules = [
                'fio' => ['required', 'min:4', 'string', 'max:255'],
                'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id']
            ];

            $active = false;
            foreach($request['phones'] as $phone){if($phone['number'] != NULL){$active = true;}}
            if($active){$rules['phones.*.number'] = ['min:0', 'required', 'regex:/^(\+?[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/'];}
            if($request['number']){
                $rules['number'] = ['min:0', 'digits:10', 'integer'];
            }
            if($request['issued_by']){$rules['issued_by'] = ['min:0', 'max:250'];}
            if($request['issued_date']){$rules['issued_date'] = ['min:0', 'max:250', 'date_format:Y-m-d'];}
            if($request['issued_date']){$rules['issued_date'] = ['min:0', 'max:250', 'date_format:Y-m-d'];}
            if($request['issued_place']){$rules['issued_place'] = ['min:0', 'max:250'];}

        } elseif(!(bool)$request['isfl']){
            $rules = [
                'ur_fio' => ['required', 'min:4', 'string', 'max:255'],
                'companyName' => ['required', 'min:4', 'string', 'max:255'],
                'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
            ];
        }

//        foreach($request['store'] as $id => $store){
//            if(isset($store['isset']) && $store['isset'] == true){
//                $rules['store.' . $id . '.location'] = [ 'max:250'];
//                $rules['store.' . $id . '.isset'] = [ 'boolean'];
//            }
//        }

        return $rules;
    }

    public static function selectPartnerDialog($request)
    {
        $partners = Partner::where('company_id', Auth::user()->company()->first()->id)->paginate(7);
        return response()->json([
            'tag' => 'selectPartnerDialog',
            'html' => view(env('DEFAULT_THEME', 'classic') . '.partner.dialog.select_partner', compact('partners', 'request'))->render()
        ]);
    }

    public function dialogSearch(Request $request)
    {
        $partners = Partner::where('fio', 'LIKE', '%' . $request['string'] .'%')
            ->orWhere('companyName', 'LIKE', '%' . $request['string'] .'%')
            ->orWhereHas('phones', function ($query) use ($request) {
            $query->where('number', 'LIKE', '%' . $request['string'] .'%');
        })->orderBy('created_at', 'ASC')->paginate(20);

        $content = view(env('DEFAULT_THEME', 'classic') . '.partner.dialog.select_partner_inner', compact('partners', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

    public function getSideInfo(Request $request){

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

    public function select($id)
    {
        $partner = Partner::where('id', $id)->first();
        if(!$partner){
            return response()->json([
                'message' => 'Контрагент не найден, возможно он был удалён',
            ], 422);
        }
        return response()->json([
            'id' => $partner->id,
            'balance' => $partner->balance,
            'name' => $partner->outputName(),
            'phones' => $partner->phones()->get(),
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
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['provider'] == null){
            $request['provider'] = [];
        }

        if($request['accountable'] == null){
            $request['accountable'] = [];
        }

        $partners = Partner::select(DB::raw('
            partners.id, partners.created_at, partners.balance, partners.created_at as date, basePhone as phone, cat.name as category, IF(partners.isfl = 1, partners.fio, partners.companyName) as name
        '))
            ->from(DB::raw('
                partners
                left join categories as cat on cat.id = partners.category_id
            '))

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
                    $query->where('fio', 'like', $request['search'].'%')
                    ->orWhere('companyName', 'like', $request['search'].'%');
                } else {
                    $query->where('fio', 'like', '%'.$request['search'].'%')->orWhere('companyName', 'like', '%'.$request['search'].'%')->orWhere('basePhone', 'like', '%'.$request['search'].'%');
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
            ->where('partners.company_id', Auth::user()->company()->first()->id)
            ->groupBy('partners.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($partners);
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
