<?php


namespace App\Services\test;


use App\Services\test\Contract\ProviderInterface;

class test
{
    /** @var iterable|ProviderInterface[] */
    private $services;

    public function __construct($services)
    {
        $this->services = $services;
    }



    public function find(string $searchString)
    {
        $results = [];

        foreach ($this->services as $service) {

            $results[] = [
                'name' => $service->getName(),
                'result' => $service->search($searchString)
            ];
        }

        return $results;
    }
}
