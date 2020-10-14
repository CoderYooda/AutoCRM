<?php

namespace App\Http\Controllers\System;

use App\Models\System\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image as ImageInt;
use Auth;

class ImageController extends Controller
{
    public static function saveUserImage($file, $path, $watermark = null)
    {
        $images = [];
        if (is_array($file)) {
            foreach ($file as $iteration => $f) {
                if(count($file) > 20){
                    return response()->json(['status' => 'error', 'message' => 'Колличество файлов не может превышать 20'], 400);
                }
                $images[] = Image::uploadImage($f, $path, true, $watermark, $iteration);
            }
        } else {
            $images[] = Image::uploadImage($file, $path, true, $watermark);
        }

        return response()->json([
            'images' => $images
        ], 200);
    }

    public function upload(Request $request){
        //($request->file());
        //dd(ini_get('max_file_uploads'));
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

        return self::saveUserImage($request->image, Auth::user()->id."/", $watermark ?? false);
    }

    public function remove(Request $request){
        return Image::where('id', $request['id'])->delete();
    }

    public function setIndexes(Request $request){
        if($request['id'] == NULL){
            return 1;
        }
        foreach($request['id'] as $iteration => $id){
            $image = Image::where('id', $id)->first();
            $image->rank = $iteration;
            $image->save();
        }
        return 1;
    }

    public function rotateImg(Request $request){

        $img = Image::where('id', $request['id'])->first();
        $img->rotate();

        return $img;
    }

    public function cropImage(Request $request)
    {
        $img = ImageInt::make(public_path($request['url']));

        $img->crop($request['coords']['width'], $request['coords']['height'], $request['coords']['x'], $request['coords']['y']);

        $name = md5(str_random(22));

        $path = storage_path('/app/public/images/');

        $img->save($path . $name . '.' . $img->extension);

        $img->fit(100);
        $img->save($path . 'thumb_' . $name . '.' . $img->extension);

        $imageobject = Image::create([
            'filename' => $name . '.' . $img->extension,
            'hash' => $name,
            'mime' => $img->mime(),
            'size' => $img->filesize(),
            'uploader_id' => Auth::user()->id,
            'url' => 'public/images/' . $name . '.' . $img->extension,
            'thumb_url' => 'public/images/thumb_' . $name . '.' . $img->extension
        ]);

        return response()->json([
            'status' => 'success',
            'message'=> 'Фото профиля обновлено!',
            'file' => $imageobject
        ]);
    }
}
