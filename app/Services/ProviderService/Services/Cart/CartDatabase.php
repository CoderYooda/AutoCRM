<?php


namespace App\Services\ProviderService\Services\Cart;

use App\Services\ProviderService\Contract\CartInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Cart implements CartInterface
{
    protected $table = 'providers_cart';
    protected $user_id = null;

    public function __construct()
    {
        $this->user_id = Auth::id();
    }

    public function setProductCount($provider, $delivery_key, $manufacturer, $article, $price, $count)
    {
        $values = [
            'user_id' => $this->user_id,
            'delivery_key' => $delivery_key,
            'provider_key' => $provider,
            'manufacturer' => $manufacturer,
            'article' => $article
        ];

        return DB::table($this->table)->updateOrInsert($values, [
            'count' => $count,
            'price' => $price
        ]);
    }

    public function getProducts()
    {
        return DB::table($this->table)->where('user_id', $this->user_id)->get();
    }

    public function getProductsIds()
    {
        // TODO: Implement getProductsIds() method.
    }

    public function addProduct($provider_key, $delivery_key, $manufacturer, $article, $price)
    {
        $values = [
            'user_id' => $this->user_id,
            'provider_key' => $provider_key,
            'delivery_key' => $delivery_key,
            'manufacturer' => $manufacturer,
            'article' => $article,
            'price' => $price
        ];

        DB::table($this->table)->updateOrInsert($values);

        return DB::table($this->table)->where($values)->increment('count', 1);
    }

    public function getProductsCount()
    {
        return DB::table($this->table)->where('user_id', $this->user_id)->sum('count');
    }

    public function getProductCount($article)
    {
        return DB::table($this->table)->where([
            'user_id' => $this->user_id,
            'article' => $article
        ])->sum('count');
    }

    public function getProductsTotalPrice()
    {
        // TODO: Implement getProductsTotalPrice() method.
    }

    public function isProductExists($provider, $delivery_key, $manufacturer, $article)
    {
        $values = [
            'user_id' => $this->user_id,
            'delivery_key' => $delivery_key,
            'provider_key' => $provider,
            'manufacturer' => $manufacturer,
            'article' => $article
        ];

        return DB::table($this->table)->where($values)->exists();
    }

    public function removeProduct($provider, $delivery_key, $manufacturer, $article)
    {
        $values = [
            'user_id' => $this->user_id,
            'delivery_key' => $delivery_key,
            'provider_key' => $provider,
            'manufacturer' => $manufacturer,
            'article' => $article
        ];

        return DB::table($this->table)->where($values)->delete();
    }

    public function clear()
    {
        return DB::table($this->table)->where('user_id', $this->user_id)->delete();
    }
}
