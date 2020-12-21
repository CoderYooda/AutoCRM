<?php


namespace App\Services\ShopManager;

use App\Models\Shop;

class ShopManager
{
    /** @var Shop $shop  */
    private $shop;

    public function __construct()
    {
        $domain = request()->getHost();

        $domainParams = explode('.', $domain);

        $isOurDomain = isset($domainParams[1]) && $domainParams[1] == getenv('APP_DOMAIN');

        $query = Shop::where(($isOurDomain ? 'subdomain' : 'domain'), $isOurDomain ? $domainParams[0] : $domain);

        $this->shop = $domainParams[0] == 'online' ? $query->first() : $query->firstOrFail();
    }

    public function getCurrentShop()
    {
        return $this->shop;
    }

    public function isWatchShop()
    {
        return $this->shop ? true : false;
    }
}
