<?php


namespace App\Traits;

use App\Models\System\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as ImageInt;

trait Imageable
{
    public function uploadImage(UploadedFile $uploadedFile, $thumb = false, $watermark = false)
    {
        $directory = 'public/images';

        $path = $uploadedFile->storePublicly($directory);

        $filename = explode('/', $path)[2];

        if ($thumb) {

            $thumb_img = ImageInt::make($uploadedFile->getRealPath());
            $thumb_img->fit(100, 100);

            if ($watermark) $thumb_img->insert(storage_path('/img/watermark.png'), 'bottom-right', 10, 10);

            $thumb_img->save(storage_path('/app/public/images/') . 'thumb_' . $filename);
        }

        return [
            'mime' => $uploadedFile->getClientMimeType(),
            'size' => $uploadedFile->getSize(),
            'filename' => $filename,
            'url' => $path,
            'thumb_url' => $thumb ? ($directory . '/thumb_' . $filename) : '',
            'hash' => md5(str_random(22)),
            'uploader_id' => Auth::id()
        ];
    }

    public function removeImage()
    {
        //TODO CHECK

        Storage::delete($this->image->url);
        if($this->image->thumb_url) Storage::delete($this->image->thumb_url);

        $this->image->delete();
    }

    public function removeImageById($image_id)
    {
        $image = Image::find($image_id);

        Storage::delete($image->url);
        if($image->thumb_url) Storage::delete($image->thumb_url);

        $image->delete();
    }

    public function removeImages()
    {
        foreach ($this->images as $image) {

            Storage::delete($image->url);
            if($image->thumb_url) Storage::delete($image->thumb_url);
        }

        $this->images()->delete();
    }
}
