<?php


namespace App\Interfaces\Shop;


interface FavoriteInterface
{
    public function addProduct($product_id): bool;
    public function removeProduct($product_id): bool;
    public function isProductExists($product_id): bool;
    public function toggleProduct($product_id): bool;
    public function count(): int;
    public function all(): array;
}
