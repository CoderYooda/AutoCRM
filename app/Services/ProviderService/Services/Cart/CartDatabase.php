<?php


namespace App\Services\ProviderService\Services\Cart;

use App\Services\ProviderService\Contract\CartInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartDatabase implements CartInterface
{
    protected $table = 'providers_cart';
    protected $user_id = null;

    public function __construct()
    {
        $this->user_id = Auth::id();
    }

    public function setProductCount($provider_key, $article, $product, $count)
    {
        $hash = md5($product['model']['hash_info']['stock'] . $product['model']['hash_info']['manufacturer'] . $article . $product['model']['hash_info']['days'] . $product['model']['hash_info']['price']);

        $values = [
            'user_id' => $this->user_id,
            'provider_key' => $provider_key,
            'hash'  => $hash
        ];

        if($count == 0) {
            return DB::table($this->table)->where($values)->delete();
        }

        return DB::table($this->table)->updateOrInsert($values, [
            'data' => json_encode($product),
            'count' => $count
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

    public function addProduct($provider_key, $article, $product, $count)
    {
        $hash = md5($product['model']['hash_info']['stock'] . $product['model']['hash_info']['manufacturer'] . $article . $product['model']['hash_info']['days'] . $product['model']['hash_info']['price']);

        $values = [
            'user_id' => $this->user_id,
            'provider_key' => $provider_key,
            'hash' => $hash
        ];

        DB::table($this->table)->updateOrInsert($values, [
            'data' => json_encode($product)
        ]);

        return DB::table($this->table)->where($values)->update(['count' => $count]);
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

    public function isProductExists($provider, $stock, $manufacturer, $article)
    {
        $values = [
            'user_id' => $this->user_id,
            'provider_key' => $provider,
            'stock' => $stock,
            'manufacturer' => $manufacturer,
            'article' => $article
        ];

        return DB::table($this->table)->where($values)->exists();
    }

    public function removeProductById($id)
    {
        return DB::table('providers_cart')->where('id', $id)->delete();
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

    public function clearByProviderKey($key)
    {
        return DB::table($this->table)->where([
            'user_id' => $this->user_id,
            'provider_key' => $key
        ])->delete();
    }
}
