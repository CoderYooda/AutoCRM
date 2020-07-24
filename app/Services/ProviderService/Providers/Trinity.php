<?php


namespace App\Services\ProviderService\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Support\Facades\Auth;

class Trinity implements ProviderInterface
{
    private $name = 'Trinity Parts';
    private $service_id = 1;

    public function search(string $searchString): array
    {
        return [];
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCountOfManufacturersArticle(string $article): array
    {

    }

    public function isActivated(): bool
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        return (bool)$company->isServiceProviderActive($this->service_id);
    }
}
