<?php


namespace App\Services\ProviderService\Contract;

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

    public function checkConnect(array $fields): bool;

    public function sendOrder(array $products): bool;

    public function getSubdivisions(): array;
}
