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

    public function getUrl()
    {
        if($this->domain) {
            return 'http://' . $this->domain . '/';
        }

        return 'http://' . $this->subdomain . '.' . getenv('APP_DOMAIN') .  '.ru/';
    }

    public function price()
    {
        return $this->hasOne(Price::class, 'id', 'price_id');
    }

    public function name()
    {
        return $this->address_name ? $this->address_name : 'Название магазина';
    }

    public function company()
    {
        return $this->hasOne(Company::class, 'id', 'company_id');
    }

    public function aboutImages()
    {
        return $this->belongsToMany(Image::class, 'shop_images_about');
    }

    public function sliderImages()
    {
        return $this->belongsToMany(Image::class, 'shop_images_slider')->withPivot('target_url');
    }

    public function faviconImage()
    {
        return $this->hasOne(Image::class, 'id', 'image_favicon_id');
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

    public function paymentMethods()
    {
        return $this->hasMany(PaymentMethod::class, 'shop_id', 'id');
    }

    public function getActivePaymentMethod()
    {
        $paymentMethod = $this->paymentMethods()->where('main', 1)->first();

        if($paymentMethod) {
            $paymentMethod = $paymentMethod->toArray();
            $paymentMethod['params'] = json_decode($paymentMethod['params'], true);
            return $paymentMethod;
        }

        return [];
    }

    public function getPaymentMethodByName($name)
    {
        $paymentMethod = $this->paymentMethods()->where('name', $name)->first();

        if($paymentMethod) {
            $paymentMethod = $paymentMethod->toArray();
            $paymentMethod['params'] = json_decode($paymentMethod['params'], true);
            return $paymentMethod;
        }

        return [];
    }
}
