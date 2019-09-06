<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Article;
use App\Models\Category;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();
        $partners = self::getPartners($request);

        $categories = CategoryController::getCategories($request, 'partner');

        $cat_info = [];
        $cat_info['route'] = 'PartnerIndex';
        $cat_info['params'] = ['target' => 'ajax-tab-content'];

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('partner.index', compact('partners', 'categories', 'cat_info', 'request'))->render();
            return response()->json(['target' => $target , 'page' => 'Контрагенты', 'content' => $content]);
        } else {
            return view('partner.index', compact('partners','categories', 'cat_info', 'request'));
        }

    }

    public static function addPartnerDialog($request)
    {
        if($request['partner_select']){
            $partner_select = (int)$request['partner_select'];
            $partner = Partner::where('company_id', Auth::user()->id)->where('id', $partner_select)->first();
            $tag = 'editPartner' . $partner->id;
        } else {
            $partner = null;
            $tag = 'addPartner';
        }

        if($request['category_select']){
            $category_select = (int)$request['category_select'];
        } else {
            $category_select = 3;
        }
        $category = Category::where('id', $category_select)->first();
        return response()->json(['tag' => $tag, 'html' => view('partner.dialog.form_partner', compact('partner', 'category', 'request'))->render()]);
    }

    public function store(Request $request)
    {
        //dd($request);
        if($request['number']){
            $request['number'] = str_replace(' ', '', $request['number']);
        }

        $request['company_id'] = Auth::user()->company()->first()->id;

        $validation = Validator::make($request->all(), self::validateRules($request));

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }
        $partner = Partner::firstOrNew(['id' => $request['id']]);
        if($partner->exists){
            $message = "Контрагент обновлен";
        } else{
            $message = "Контрагент создан";
        }
        $partner->fill($request->only($partner->fields));
        if(!$request['isfl']){
            $partner->fio = $request['ur_fio'];
        }
        $partner->user_id = null;
        $partner->save();
        $phones = PhoneController::upsertPhones($request);
        PassportController::upsertPassport($request, $partner);
//        $car = CarController::upsertPassport($request);
        $partner->phones()->sync($phones->pluck('id'));
        $partners = self::getPartners($request);
        $categories = CategoryController::getCategories($request, 'partner');

        $content = view('partner.elements.table_container', compact('partners', 'categories'))->render();

        if($request->ajax()){
            return response()->json([
                'message' => $message,
                'container' => 'ajax-table-partner',
                //'redirect' => route('PartnerIndex', ['category_id' => $partner->category()->first()->id, 'serach' => $request['search']]),
                'event' => 'PartnerStored',
                'html' => $content
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id)
    {
        $partner = Partner::where('id', $id)->first();
        $message = 'Контрагент удален';
        $status = 200;

        if($partner->company()->first()->id != Auth::user()->company()->first()->id){
            $message = 'Вам не разрешено удалять этого контрагента';
            $status = 422;
        }

        if($status == 200){
            if(!$partner->delete()){
                $message = 'Ошибка зависимотей. Обратитесь к администратору';
                $status = 500;
            }
        }


        return response()->json(['id' => $partner->id, 'message' => $message], $status);
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
            if($request['number']){$rules['number'] = ['min:0', 'digits:10', 'integer'];}
            if($request['issued_by']){$rules['issued_by'] = ['min:0', 'max:250'];}
            if($request['issued_date']){$rules['issued_date'] = ['min:0', 'max:250', 'date_format:Y-m-d'];}
            if($request['issued_date']){$rules['issued_date'] = ['min:0', 'max:250', 'date_format:Y-m-d'];}
            if($request['issued_place']){$rules['issued_place'] = ['min:0', 'max:250'];}

        } elseif(!(bool)$request['isfl']){
            $rules = [
                'ur_fio' => ['required', 'min:4', 'string', 'max:255'],
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

    public static function editPartnerDialog($request)
    {
        $tag = 'editPartner';
        if($request['partner_id']){
            $tag .= $request['partner_id'];
            $partner = Partner::where('id', (int)$request['partner_id'])->with('passport')->first();
        } else {
            return response()->json(['message' => 'Недопустимое значение партнера'], 500);
        }

        return response()->json(['tag' => $tag, 'html' => view('partner.dialog.form_partner', compact('partner'))->render()]);
    }

    public static function selectPartnerDialog($request)
    {

        $partners = Partner::where('company_id', Auth::user()->id)->get();
        return response()->json(['tag' => 'selectPartner', 'html' => view('partner.dialog.select_partner', compact('partners', 'request'))->render()]);
    }

    public function dialogSearch(Request $request){
        $partners = Partner::where('fio', 'LIKE', '%' . $request['string'] .'%')
            ->orWhere('companyName', 'LIKE', '%' . $request['string'] .'%')
            ->orWhereHas('phones', function ($query) use ($request) {
            $query->where('number', 'LIKE', '%' . $request['string'] .'%');
        })->orderBy('id', 'DESC')->get();

        $content = view('partner.dialog.select_partner_inner', compact('partners', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

    public function select($id){
        $partner = Partner::where('id', $id)->first();
        if(!$partner){
            return response()->json([
                'message' => 'Контрагент не найден, возможно он был удалён',
            ], 422);
        }
        return response()->json([
            'id' => $partner->id,
            'name' => $partner->outputName()
        ]);
    }

    public static function getPartners($request)
    {
        #TODO слить методы выборки сущьностей (6.10)

        $category = 3;

        if($request['category_id']){
            $category = (int)$request['category_id'];
        }

        return Partner::where('company_id', Auth::user()->company()->first()->id )->with('passport')->where(function($q) use ($request, $category){
            if($category != 0) {
                $q->where('category_id', $category);
            }
            if($request['search'] != null) {
                $q->where('article', 'like', '%' . $request['search'] . '%');
            }
        })->orderBy('created_at', 'DESC')->paginate(24);

    }

}
