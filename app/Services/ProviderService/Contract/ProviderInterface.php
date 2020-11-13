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

    public function getPickupAddresses(): array;

    public function getDeliveryToAddresses(): array;

    public function getPaymentTypes(): array;

    public function getDeliveryTypes(): array;

    public function getDateOfShipment(): array;

    public function getSelectFieldValues(string $field_id): array;

    public function getOrdersStatuses(): array;

    public function searchAnaloguesByBrandAndArticle(string $brand, string $article): array ;

    public function checkConnect(array $fields): bool;

    public function sendOrder(array $products): bool;
}
