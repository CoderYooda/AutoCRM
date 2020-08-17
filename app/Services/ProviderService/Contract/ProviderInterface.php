<?php


namespace App\Services\ProviderService\Contract;

use Illuminate\Http\JsonResponse;

interface ProviderInterface
{
    public function searchBrandsCount(string $article): array;

    public function getStoresByArticleAndBrand(string $article, string $brand): array;

    public function getName(): string;

    public function getServiceKey(): string;

    public function isActivated(): bool;

    public function getSelectFieldValues(string $field_id): array;

    public function checkConnect(array $fields): bool;
}
