<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Http\Requests\DdsarticleRequest;
use App\Models\Category;
use App\Models\DdsType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DdsArticle;
use App\Http\Controllers\CategoryController;
use Auth;

class DdsarticleController extends Controller
{
    private static $root_category = 4;
//    public static function ddsarticleDialog($request)
//    {
//        if($request['category_select']){
//            $category_select = (int)$request['category_select'];
//        } else {
//            $category_select = 4;
//        }
//        $category = Category::where('id', $category_select)->first();
//        $ddstypes = DdsType::all();
//
//        return response()->json(['tag' => 'createDdsarticle', 'html' => view('settings.dialog.form_ddsarticle', compact('request', 'category', 'ddstypes'))->render()]);
//    }


    public static function ddsarticleDialog($request)
    {
        $tag = 'ddsarticleDialog';

        if($request['ddsarticle_id']){
            $tag .= $request['ddsarticle_id'];
            $product = Ddsarticle::where('id', (int)$request['ddsarticle_id'])->first();
        } else {
            $ddsarticle = null;
        }

        if($request['category_select']){
            $category_select = (int)$request['category_select'];
        } else {
            $category_select = 4;
        }

        $category = Category::where('id', $category_select)->first();

        $ddstypes = DdsType::all();
        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.ddsarticle.dialog.form_ddsarticle', compact('ddsarticle','ddstypes', 'category', 'request'))->render()
        ]);
    }



    public function store(DdsarticleRequest $request)
    {
        $Ddsarticle = DdsArticle::firstOrNew(['id' => (int)$request['id']]);

        $message = $Ddsarticle->exists ? 'Статья ДДС обновлена' : 'Статья ДДС создана';

        $Ddsarticle->fill($request->all());
        $Ddsarticle->company_id = Auth::user()->company()->first()->id;
        $Ddsarticle->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => $message,
                'event' => 'DdsarticleStored'
                ]);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id)
    {
        $Ddsarticle = Ddsarticle::owned()->where('id', $id)->first();
        $message = 'Статья ДДС удалена';
        $status = 200;

        if(!$Ddsarticle){
            $message = 'Статья не найдена';
            $status = 422;
        }

        if($Ddsarticle->locked){
            $message = 'Вам не разрешено удалять эту статью ДДС';
            $status = 422;
        }

        if($status == 200){
            if(!$Ddsarticle->delete()){
                $message = 'Ошибка зависимотей. Обратитесь к администратору';
                $status = 500;
            }
        }

        return response()->json(['id' => $Ddsarticle->id, 'message' => $message], $status);
    }

    public static function selectDdsarticleDialog($request)
    {
        return self::selectDdsarticleInner($request);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectDdsarticleInner($request);
    }

    private static function selectDdsarticleInner($request){
        $class = 'selectDdsarticleDialog';
        $request['category_id'] = $request['category_id'] ? $request['category_id'] : self::$root_category;
        $ddsarticles = Ddsarticle::owned()->where('name', 'LIKE', '%' . $request['string'] .'%')
            ->when($request['category_id'], function($q) use ($request){
                $q->where('category_id', $request['category_id']);
            })
            ->orderBy('created_at', 'DESC')
            ->limit(30)
            ->get();
        $categories = CategoryController::getModalCategories(self::$root_category, $request);
        $view = $request['inner'] ? 'select_ddsarticle_inner' : 'select_ddsarticle';

        $content = view(get_template() . '.ddsarticle.dialog.' . $view, compact('ddsarticles', 'categories', 'class', 'request'))->render();
        return response()->json([
            'tag' => 'selectDdsarticleDialog',
            'html' => $content
        ]);
    }










    public function select($id){
        $ddsarticle = Ddsarticle::owned()->where('id', $id)->first();
        if(!$ddsarticle){
            return response()->json([
                'message' => 'Статья не найдена, возможно она была удалёна',
            ], 422);
        }
        return response()->json([
            'id' => $ddsarticle->id,
            'name' => $ddsarticle->name
        ]);
    }




    public static function getDdsarticles($request)
    {

        $category = 4;
        if($request['category_id']){
            $category = (int)$request['category_id'];
        }

        return Ddsarticle::owned()->where(function($q) use ($request, $category){
            if($category != 0) {
                $q->where('category_id', $category);
            }
        })->orderBy('created_at', 'DESC')->get();
    }
}
