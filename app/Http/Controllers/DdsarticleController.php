<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Category;
use App\Models\DdsType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DdsArticle;
use Auth;

class DdsarticleController extends Controller
{

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
        if($request['params']){
            $id = (int)$request['ddsarticle_id'];
            $ddsarticle = Ddsarticle::owned()->where('id', $id)->first();
            $tag = 'ddsarticleDialog'.$id;
        } else {
            $tag = 'ddsarticleDialog';
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
            'html' => view(env('DEFAULT_THEME', 'classic') . '.ddsarticle.dialog.form_ddsarticle', compact('ddsarticle','ddstypes', 'category', 'request'))->render()
        ]);
    }



    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3', 'string', 'max:255'],
            'dds_types_id' => ['required'],
        ]);

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $Ddsarticle = DdsArticle::firstOrNew(['id' => (int)$request['id']]);
        if($Ddsarticle->exists){
            $message = 'Статья ДДС обновлена';
        } else {
            $message = 'Статья ДДС создана';
        }

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
        $ddsarticles = Ddsarticle::owned()->orderBy('id', 'DESC')->paginate(12);
        return response()->json([
            'tag' => 'selectDdsarticleDialog',
            'html' => view(env('DEFAULT_THEME', 'classic') . '.ddsarticle.dialog.select_ddsarticle', compact('ddsarticles', 'request'))->render()
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


    public function dialogSearch(Request $request){
        $ddsarticles = Ddsarticle::owned()->where('name', 'LIKE', '%' . $request['string'] .'%')
            ->orderBy('id', 'DESC')
            ->paginate(12);
        //dd($ddsarticles);
        $content = view(env('DEFAULT_THEME', 'classic') . '.ddsarticle.dialog.select_ddsarticle_inner', compact('ddsarticles', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
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
