<?php

namespace App\Http\Controllers\API;

use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\System\ImageController as I;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function upload(Request $request){
        ini_set('memory_limit', '-1');
        ini_set('upload_max_filesize', '100M');
        ini_set('post_max_size', '200M');
        ini_set('max_file_uploads', '500');

        if($request['image'] == null){
            return response()->json(['status' => 'error', 'message' => 'Вы не выбрали ни одного файла'], 422);
        }
        $input_data = $request->all();

        $validator = Validator::make(
            $input_data, [
                'image.*' => 'required|mimes:jpg,jpeg,png,gif|max:20000'
            ]
        );

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Доступные форматы Jpg, Png, Gif размером не более 10 мб'], 422);
        }
        return I::saveUserImage($request->image, Auth::user()->id."/", $watermark ?? false);
    }
}
