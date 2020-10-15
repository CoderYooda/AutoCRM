<?php


namespace App\Interfaces\Shop;


interface CartInterface
{
    public function addProduct($product_id): bool;
    public function removeProduct($product_id): bool;
    public function isProductExists($product_id): bool;
    public function getProductCount($product_id): int;
    public function setProductCount($product_id, $count): bool;
    public function count(): int;
    public function total(): int;
    public function all(): array;
}
