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

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('partner.index', compact('partners', 'categories', 'request'))->render();
            return response()->json(['target' => $target , 'page' => 'Контрагенты', 'content' => $content]);
        } else {
            return view('partner.index', compact('partners','categories', 'request'));
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
        $partner->fill($request->only($partner->fields));
        $partner->user_id = null;
        $partner->save();

        $phones = PhoneController::upsertPhones($request);
        PassportController::upsertPassport($request, $partner);
//        $car = CarController::upsertPassport($request);

        $partner->phones()->sync($phones->pluck('id'));



// Создать авто
// $partner->car_id =




        $partners = self::getPartners($request);
        $categories = CategoryController::getCategories($request, 'partner');

        $content = view('partner.elements.table_container', compact('partners', 'categories'))->render();

        if($request->ajax()){
            return response()->json([
                'message' => 'Контрагент добавлен',
                'container' => 'ajax-table',
                'redirect' => route('PartnerIndex', ['category_id' => $partner->category()->first()->id, 'serach' => $request['search']]),
                'html' => $content
            ], 200);
        } else {
            return redirect()->back();
        }
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
                'fio' => ['required', 'min:4', 'string', 'max:255'],
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
