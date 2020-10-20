<?php


namespace App\Services\Shop;

use App\Interfaces\Shop\CartInterface;

class CartSession implements CartInterface
{
    protected $products = [];

    public function __construct()
    {
//        session()->forget('products');
        $this->products = session('products', []);
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

        session()->put('products', $this->products);

        return true;
    }

    public function setProductCount($hash, $count): bool
    {
        $this->products[$hash]['count'] = $count;

        session()->put('products', $this->products);

        return true;
    }

    public function removeProduct($hash): bool
    {
        unset($this->products[$hash]);

        session()->put('products', $this->products);

        return true;
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
        $this->products = [];

        session()->put('products', $this->products);

        return true;
    }

    public function all(): array
    {
        return $this->products;
    }
}
