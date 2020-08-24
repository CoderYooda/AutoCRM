<?php

namespace App\Services\ProviderService\Contract;

interface CartInterface
{
    public function setProductCount($provider_key, $stock, $delivery_key, $manufacturer, $article, $price, $count);

    public function getProducts();

    public function getProductsIds();

    public function addProduct($provider_key, $stock, $delivery_key, $manufacturer, $article, $price);

    public function getProductsCount();

    public function getProductCount($article);

    public function getProductsTotalPrice();

    public function isProductExists($provider, $stock, $manufacturer, $article);

    public function removeProduct($provider, $delivery_key, $manufacturer, $article);

    public function clear();
}
