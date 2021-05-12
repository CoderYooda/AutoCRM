<?php

namespace App\Http\Controllers;

use App\Models\iCat\ACat;
use App\Models\iCat\CatMark;
use App\Models\iCat\CatModel;
use App\Models\iCat\CatModify;
use App\Models\iCat\CatType;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;

class CatalogueController extends Controller
{


    public static function getMarks(Request $request)
    {
        $types = CatType::with('marks')->get();

        if(!$types->count()){
            $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
            $result = $acat->getMarks();


            foreach($result as $type){
                $t = CatType::create([
                    'index' => $type->index ?? null,
                    'name' => $type->name ?? null,
                    'value' => $type->value ?? null,
                    'image' => $type->image ?? null,
                ]);

                foreach($type->marks as $mark){
                    CatMark::create([
                        'type_id' => $t->id ?? null,
                        'name' => $mark->name ?? null,
                        'full_name' => $mark->full_name ?? null,
                        'short_name' => $mark->short_name ?? null,
                        'url' => $mark->url ?? null,
                        'value' => $mark->value ?? null,
                        'SKD' => $mark->SKD ?? null,
                        'archival' => $mark->archival ?? null,
                        'description' => $mark->description ?? null,
                        'engine' => $mark->engine ?? null,
                        'image' => $mark->image ?? null,
                        'vin' => $mark->vin ?? null,
                    ]);
                }

            }
            $types = CatType::with('marks')->get();
        }

        $content = view(get_template() . '.catalogue.marks', compact('types', 'request'));
        $target = HC::selectTarget();

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => 'Марки',
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }



        //return view(get_template() . '.catalogue.marks', compact('types', 'request'));
//        return $types;
    }

    public function getModels(Request $request, $type, $mark)
    {
//        $m = CatMark::where('value', $mark)->first();
//        $t = CatType::where('value', $type)->first();
//        $models = CatModel::where('mark_id', $m->id)->get();
//        if(!$models->count()){


            $href = '/' . $type . '/' . $mark;
            $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');

            $result = $acat->getModels($href);
//            dd($result);
//            foreach($result->models as $model) {
//                $m = CatModel::create([
//                    'type_id' => $t->id,
//                    'mark_id' => $m->id ?? null,
//                    'image' => $model->image ?? $model->img ?? null,
//                    'model' => $model->id ?? null,
//                    'archival' => $model->archival ?? false,
//                    'name' => $model->name ?? null,
//                    'short_name' => $model->short_name ?? null,
//                    'modification' => $model->modification ?? null,
//                    'name_with_mark' => $model->name_with_mark ?? null,
//                    'index' => $model->index ?? null,
//                    'relevance' => $model->relevance ?? null,
//                    'modif' => $model->modif ?? null,
//                ]);
//            }
//
//            $models = CatModel::where('mark_id', $m->id)->get();
//        }

        $content = view(get_template() . '.catalogue.models', compact('type','mark', 'result', 'request'));
        $target = HC::selectTarget();

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => 'Модели',
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

    public function getModifications(Request $request, $type, $mark, $model)
    {
//        $modifications = CatModify::where('model_id', $request['model_id'])->paginate(25);
//        $model = CatModel::find($request['model_id']);
//        if(!$modifications->count()) {

        $m = CatMark::where('value', $mark)->first();
        $t = CatType::where('value', $type)->first();
        $mo = CatModel::where('name', $model)->first();

            $href = '/' . $type . '/' . $mark . '/' . $model . '?' . http_build_query($request->except('active_tab', 'view_as'));
//        dd($href);
            $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
            $result = $acat->getModificationsByModel($href);
//            dd($result);
        if(isset($result->modifications)){
            $content = view(get_template() . '.catalogue.modifications', compact('type','mark', 'model', 'result', 'request'));
        } elseif (isset($result->groups)){
            $grp = null;
            $native = true;
            $content = view(get_template() . '.catalogue.groups', compact('type','mark', 'model', 'grp', 'result', 'request', 'native'));
        }

        $target = HC::selectTarget();

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => 'Модификации',
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

    public function getGroups(Request $request, $type, $mark, $model, $modification, $grp = null)
    {
        $attaches = $grp ? '/' . $grp : '';
        $href = '/' . $type . '/' . $mark . '/' . $model . '/' . $modification . $attaches . '?' . http_build_query($request->except('active_tab', 'view_as'));
        $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
        $result = $acat->getGroups($href);
//        dd($result);
//        dd((isset($result->units) || isset($result->groups)));
//        dd($result->group->image);
        if(isset($result->group) && $result->group && is_object($result->group) && $result->group->image){
            $opts = array('http' =>
                array(
                    'method'  => 'GET',
                    'header'  => 'Authorization: ac0312e3c94b0fc48d6c01fea6828bee',
                )
            );
            $context = stream_context_create($opts);
            $image = file_get_contents($result->group->image, false, $context);
//            dd($http_response_header);
            foreach ($http_response_header as $key => $h){

                if(str_contains($h, 'Content-Type')){

                    $result->image_src_header = substr($http_response_header[$key], strpos($http_response_header[$key], " ") + 1) ;
                };
            }

            $result->image_src = mb_convert_encoding(base64_encode($image), 'UTF-8', 'UTF-8');
        }

        if(isset($result->units) || isset($result->groups)) {
            $content = view(get_template() . '.catalogue.groups', compact('type', 'mark', 'model', 'grp', 'result', 'request'));
        }
        else{
            $content = view(get_template() . '.catalogue.numbers', compact('type', 'mark', 'model', 'grp', 'result', 'request'));
        }
        $target = HC::selectTarget();

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => 'Группы',
                'html' => $content->render(),
                'data' => $result
            ]);
        } else {
            return $content;
        }
    }

    public function getNumbers(Request $request, $type, $mark, $model, $modification, $grp, $subgrp)
    {
        $attaches = $grp ? '/' . $grp : '';
        $href = '/' . $type . '/' . $mark . '/' . $model . '/' . $modification . '/' . $grp . '/' . $subgrp . '?' . http_build_query($request->except('active_tab', 'view_as'));
        $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
        $result = $acat->getGroups($href);



        $content = view(get_template() . '.catalogue.numbers', compact('type','mark', 'model', 'grp', 'subgrp', 'result', 'request'));
        $target = HC::selectTarget();

        if ($request['view_as'] != null && $request['view_as'] == 'json') {
            return response()->json([
                'target' => $target,
                'page' => 'Группы',
                'html' => $content->render(),
                'data' => $result
            ]);
        } else {
            return $content;
        }
    }
}
