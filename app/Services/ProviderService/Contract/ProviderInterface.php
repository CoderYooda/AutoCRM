<?php


namespace App\Services\ProviderService\Contract;


interface ProviderInterface
{
    public function search(string $searchString): array;

    public function getName(): string;

    public function getCountOfManufacturersArticle(string $article) : array;

    public function isActivated() : bool;
}
