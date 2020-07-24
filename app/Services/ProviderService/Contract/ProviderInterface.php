<?php


namespace App\Services\ProviderService\Contract;


interface ProviderInterface
{
    public function searchBrandsCount(string $article): array;

    public function getStoresByArticleAndBrand(string $article, string $brand): array;

    public function getName(): string;

    public function getServiceId(): int;

    public function isActivated(): bool;
}
