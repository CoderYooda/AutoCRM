<?php

namespace App\Models\System;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\File;
use Intervention\Image\Facades\Image as ImageInt;
use Illuminate\Support\Facades\Storage;
use Auth;

class Image extends Model
{
    protected $guarded = [];

    protected $appends = [
        'image_path'
    ];

    public function uploader()
    {
        return $this->hasOne(User::class, 'upload_by');
    }

    public function getImagePathAttribute()
    {
        return Storage::url($this->url);
    }

    public static function uploadImage($image, $path = null, $thumb = null, $watermark = null, $rank = null)
    {
        $base_path = '/files/images/';

        if ($path != NULL) {
            $path = $base_path . $path;
        } else {
            $path = $base_path;
        }

        if (!file_exists(storage_path('/app/public' . $path))) {
            mkdir(storage_path('/app/public' . $path), 0777, true);
        }

        $name = md5($image->getClientOriginalName().str_random(12));
        $extension = $image->getClientOriginalExtension();
        $imageobject = new Image();
        $imageobject->filename = $name . '.' . $extension;
        $imageobject->rank = $rank;
        $imageobject->hash = $name;
        $imageobject->mime = $image->getMimeType();
        $imageobject->size = $image->getSize();
        $imageobject->uploader_id = Auth::user()->id;
        $imageobject->url = '/storage' . $path . $name . '.' . $extension;

        $img = ImageInt::make($image->getRealPath());

        $img->resize(null, 800, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        if ($watermark) {
            $wm = ImageInt::canvas($img->width(), $img->height());
            $wm->fill(storage_path('/img/wwn.png'));
            $img->insert($wm, 'center');
        }

        $img->save(storage_path('/app/public' . $path) . $name . '.' . $extension);

        if ($thumb) {
            $img = ImageInt::make($image->getRealPath());
            $img->fit(346, 214);

            if ($watermark)
                $img->insert(storage_path('/img/watermark.png'), 'bottom-right', 10, 10);
            $img->save(storage_path('/app/public' . $path) . 'thumb_' . $name . '.' . $extension);
            $imageobject->thumb_url = $path . 'thumb_' . $name . '.' . $extension;
        }

        return $imageobject->save() ? $imageobject : false;

    }

    public static function uploadBase64($image, $path)
    {
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = str_random(10).'.'.'png';
        $file = storage_path($path). '/' . $imageName;
        File::put($file, base64_decode($image));
        $imageobject = new File();
        $imageobject->filename = $imageName;
        $imageobject->hash = $imageName;
        $imageobject->mime = 'image/png';
        $imageobject->size = 0;
        $imageobject->url = $path . '/' . $imageName;
        $imageobject->save();
        return $imageobject;
    }

    public function rotate(){

        $version = str_random(4);
        $hash = md5($this->hash . '_' . $version);
        $url = str_replace($this->hash, $hash, $this->url);
        //dd($this->hash);
        $thumb_url = str_replace('thumb_' . $this->hash, 'thumb_' . $hash, $this->thumb_url);


        $img = ImageInt::make(storage_path($this->url));
        $img->rotate(-90);
        $img->save(storage_path($url));
        $img->fit(346, 214);
        $img->save(storage_path($thumb_url));

        $this->url = $url;
        $this->hash = $hash;
        $this->thumb_url = $thumb_url;
        $this->save();

        return $this;
    }

}
