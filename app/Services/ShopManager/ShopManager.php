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

        $this->shop = Shop::where(($isOurDomain ? 'subdomain' : 'domain'), $domainParams[0])->first();
    }

    public function getCurrentShop()
    {
        return $this->shop;
    }
}
