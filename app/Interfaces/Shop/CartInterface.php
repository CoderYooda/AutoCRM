<?php


namespace App\Interfaces\Shop;


interface CartInterface
{
    public function addProduct($hash, $order, $count): bool;
    public function removeProduct($hash): bool;
    public function isProductExists($hash): bool;
    public function getProductCount($hash): int;
    public function setProductCount($hash, $count): bool;
    public function clear(): bool;
    public function count(): int;
    public function total(): int;
    public function all(): array;
}
