<?php


namespace App\Services\Shop;

use App\Interfaces\Shop\CartInterface;

class CartSession implements CartInterface
{
    protected $products = [];

    public function __construct()
    {
        $this->products = session('products', []);
    }

    public function addProduct($product_id): bool
    {
        if($this->isProductExists($product_id)) {
            $this->products[$product_id]++;
        }
        else {
            $this->products[$product_id] = 1;
        }

        session()->put('products', $this->products);

        return true;
    }

    public function setProductCount($product_id, $count): bool
    {
        $this->products[$product_id] = $count;

        session()->put('products', $this->products);

        return true;
    }

    public function removeProduct($product_id): bool
    {
        foreach ($this->products as $id => $count) {
            if($product_id != $id) continue;

            unset($this->products[$id]);
        }

        session()->put('products', $this->products);

        return true;
    }

    public function isProductExists($product_id): bool
    {
        return in_array($product_id, array_keys($this->products));
    }

    public function getProductCount($product_id): int
    {
        if(!$this->isProductExists($product_id)) return 0;

        return $this->products[$product_id];
    }

    public function count(): int
    {
        return count($this->products);
    }

    public function total(): int
    {
        $total = 0;

        foreach ($this->products as $product_id => $count) {
            $total += $count;
        }

        return $total;
    }

    public function all(): array
    {
        return $this->products;
    }
}
