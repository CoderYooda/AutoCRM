<?php


namespace App\Services\Shop;

use App\Interfaces\Shop\FavoriteInterface;

class FavoriteSession implements FavoriteInterface
{
    protected $products = [];

    public function __construct()
    {
        $this->products = session('favorites', []);
    }

    public function addProduct($product_id): bool
    {
        array_push($this->products, $product_id);

        session()->put('favorites', $this->products);

        return true;
    }

    public function removeProduct($product_id): bool
    {
        foreach ($this->products as $index => $product) {
            if($product != $product_id) continue;

            unset($this->products[$index]);
        }

        session()->put('favorites', $this->products);

        return true;
    }

    public function toggleProduct($product_id): bool
    {
        $exists = $this->isProductExists($product_id);

        $exists ? $this->removeProduct($product_id) : $this->addProduct($product_id);

        return !$exists;
    }

    public function isProductExists($product_id): bool
    {
        return in_array($product_id, $this->products);
    }

    public function count(): int
    {
        return count($this->products);
    }

    public function all(): array
    {
        return $this->products;
    }
}
