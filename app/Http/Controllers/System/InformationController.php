<?php

namespace App\Http\Controllers\System;

use App\Models\Information;
use App\Models\System\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class InformationController extends Controller
{
    public function getInfoBySource($source) {

        $information = Information::where('source',$source)->first();

        return response()->json([
            'html' => view(get_template() . '.system.information_list', compact('information','source'))->render()
        ]);
    }

    public function saveInfo(Request $request) {

        $information = Information::firstOrNew(['source' => $request->source]);
        $information->content = $request->info;
        $information->save();

        return response()->json([
            'message' => 'Информация успешно обновлена'
        ]);
    }

    public function uploadImage(Request $request)
    {
        ini_set('memory_limit', '-1');
        ini_set('upload_max_filesize', '100M');
        ini_set('post_max_size', '200M');
        ini_set('max_file_uploads', '500');

        if($request['image'] == null){
            return response()->json(['status' => 'error', 'message' => 'Вы не выбрали ни одного файла'], 400);
        }
        $input_data = $request->all();

        $validator = Validator::make(
            $input_data, [
                'image.*' => 'required|mimes:jpg,jpeg,png,gif|max:20000'
            ]
        );


        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Доступные форматы Jpg, Png, Gif размером не более 10 мб'], 400);
        }

            $originName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($originName, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileName = $fileName.'_'.time().'.'.$extension;
            $request->file('image')->move(public_path('images/info'), $fileName);
            $url = '/images/info/'.$fileName;
            return response()->json([
                'default' => $url,
                'message' => 'Картинка успешно загружена'
            ]);
        }
}
