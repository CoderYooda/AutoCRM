<?php

namespace App\Models;

use App\Models\System\Image;
use App\Traits\Emailable;
use App\Traits\Imageable;
use App\Traits\Phoneable;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use Phoneable, Emailable, Imageable;

    protected $guarded = [];

    public function aboutImages()
    {
        return $this->belongsToMany(Image::class, 'shop_images_about');
    }

    public function sliderImages()
    {
        return $this->belongsToMany(Image::class, 'shop_images_slider');
    }

    public function logotypeImage()
    {
        return $this->hasOne(Image::class, 'id', 'image_logotype_id');
    }

    public function headerImage()
    {
        return $this->hasOne(Image::class, 'id', 'image_header_id');
    }

    public function backgroundImage()
    {
        return $this->hasOne(Image::class, 'id', 'image_background_id');
    }
}
