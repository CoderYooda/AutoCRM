<?php

namespace App\Http\Controllers\System;

use App\Models\System\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
            'images' => $images,
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

        if($request['watermark'] != null){
            $watermark = true;
        } else {
            $watermark = false;
        }

        $response = self::saveUserImage($request->image, Auth::user()->id."/", $watermark);
        return $response;
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

        $user = Auth::user();

        $img = ImageInt::make(public_path($request['url']));

        $img->crop($request['coords']['width'], $request['coords']['height'], $request['coords']['x'], $request['coords']['y']);

        $name = md5(str_random(22));

        $img->save(storage_path('/app/public/files/images/' . $user->id . '/') . $name . '.' . $img->extension);
        $img->fit(100);
        $img->save(storage_path('/app/public/files/images/' . $user->id . '/') . 'thumb_' . $name . '.' . $img->extension);

        $imageobject = new Image();
        $imageobject->filename = $name . '.' . $img->extension;
        $imageobject->hash = $name;
        $imageobject->mime = $img->mime();
        $imageobject->size = $img->filesize();
        $imageobject->uploader_id = Auth::user()->id;
        $imageobject->url = '/storage/files/images/' . $user->id . '/' . $name . '.' . $img->extension;
        $imageobject->thumb_url = '/storage/files/images/' . $user->id . '/' . 'thumb_' . $name . '.' . $img->extension;
        //$imageobject->type = 'avatar';

        $imageobject->save();
        $partner = $user->partner;
        $partner->avatar_id = $imageobject->id;
        $partner->pic_id = $imageobject->id;
        $partner->save();

//        if (self::removeCurrrentType($user, 'avatar')) {
//            $user->avatar()->sync([$file_base->id => ['type' => 'avatar']]);
//        }
        return response()->json(['status' => 'success', 'message'=> 'Фото профиля обновлено!', 'avatar' => $imageobject]);
    }
}
