<?php


namespace App\Traits;

use App\Models\System\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as ImageInt;

trait Imageable
{
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getImagePathAttribute()
    {
        return $this->image != null ? Storage::url($this->image->url) : asset('/images/product-placeholder.svg');
    }

    public function uploadImage(UploadedFile $uploadedFile, $thumb = false, $watermark = false)
    {
        $directory = 'public/images';

        $path = $uploadedFile->storePublicly($directory);

        $filename = explode('/', $path)[2];

        $this->removeImage();

        if ($thumb) {

            $thumb_img = ImageInt::make($uploadedFile->getRealPath());
            $thumb_img->fit(100, 100);

            if ($watermark) $thumb_img->insert(storage_path('/img/watermark.png'), 'bottom-right', 10, 10);

            $thumb_img->save(storage_path('/app/public/images/') . 'thumb_' . $filename);
        }

        return $this->image()->create([
            'mime' => $uploadedFile->getClientMimeType(),
            'size' => $uploadedFile->getSize(),
            'filename' => $filename,
            'url' => $path,
            'thumb_url' => $thumb ? ($directory . '/thumb_' . $filename) : '',
            'hash' => md5(str_random(22)),
            'uploader_id' => Auth::id(),
        ]);
    }

    public function removeImage()
    {
        //TODO CHECK
        if(!$this->image()->exists()){
            return;
        }
        Storage::delete($this->image->url);
        Storage::delete($this->image->thumb_url);

        $this->image()->delete();
    }
}
