<?php

namespace App\Models;

use App\Models\System\Image;
use App\Traits\Imageable;
use App\Traits\Phoneable;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use Phoneable, Imageable;

    protected $guarded = [];

    public function aboutImages()
    {
        return $this->belongsToMany(Image::class, 'shop_images_about');
    }

    public function sliderImages()
    {
        return $this->belongsToMany(Image::class, 'shop_images_slider')->withPivot('target_url');
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

    public function contactEmails()
    {
        return $this->belongsToMany(Email::class, 'shop_emails_contact');
    }

    public function contactEmail()
    {
        return $this->belongsToMany(Email::class, 'shop_emails_contact')->where('main', 1);
    }

    public function orderEmails()
    {
        return $this->belongsToMany(Email::class, 'shop_emails_order');
    }
}
