<?php


namespace App\Services\test\Providers;

use App\Services\test\Contract\ProviderInterface;

class Trinity implements ProviderInterface
{
    public function search(string $searchString): array
    {
        return [];
    }
}
