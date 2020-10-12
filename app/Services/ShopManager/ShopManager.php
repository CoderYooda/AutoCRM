<?php


namespace App\Services\ShopManager;

use App\Models\Shop;

class ShopManager
{
    /** @var Shop $shop  */
    private $shop = null;

    public function __construct()
    {
        $domain = request()->getHost();

        $domainParams = explode('.', $domain);

        if(isset($domainParams[1]) && $domainParams[1] == getenv('APP_DOMAIN')) {
            $this->shop = Shop::where('subdomain', $domainParams[0])->first();
        }
        else {
            $this->shop = Shop::where('domain', $domainParams[0])->first();
        }
    }

    public function getCurrentShop()
    {
        return $this->shop;
    }
}
