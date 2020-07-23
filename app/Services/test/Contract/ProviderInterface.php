<?php


namespace App\Services\test\Contract;


interface ProviderInterface
{
    public function search(string $searchString): array;

    public function getName(): string;
}
