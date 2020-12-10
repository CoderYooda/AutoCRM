<?php


namespace App\Services\Shop;

use App\Interfaces\Shop\CartInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class CartSession implements CartInterface
{
    protected $products = [];

    protected $sessionId;
    protected $cacheKey;

    public function __construct()
    {
        $this->sessionId = Session::getId();
        $this->cacheKey = 'products[' . $this->sessionId . ']';

        $this->products = Cache::get($this->cacheKey, []);
    }

    public function addProduct($hash, $order, $count = 1): bool
    {
        if($this->isProductExists($hash)) {
            $this->products[$hash]['count'] += $count;
        }
        else {
            $this->products[$hash]['count'] = $count;
        }

        $this->products[$hash]['data'] = $order;

        return $this->save();
    }

    public function setProductCount($hash, $count): bool
    {
        $this->products[$hash]['count'] = $count;

        return $this->save();
    }

    public function removeProduct($hash): bool
    {
        unset($this->products[$hash]);

        return $this->save();
    }

    public function isProductExists($hash): bool
    {
        return in_array($hash, array_keys($this->products));
    }

    public function getProductCount($hash): int
    {
        if(!$this->isProductExists($hash)) return 0;

        return $this->products[$hash]['count'];
    }

    public function count(): int
    {
        return count($this->products);
    }

    public function total(): int
    {
        $total = 0;

        foreach ($this->products as $hash => $data) {
            $total += $data['count'];
        }

        return $total;
    }

    public function clear(): bool
    {
        return Cache::forget($this->cacheKey);
    }

    public function all(): array
    {
        return $this->products;
    }

    protected function save()
    {
        Cache::put($this->cacheKey, $this->products);

        return true;
    }
}
