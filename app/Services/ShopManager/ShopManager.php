<?php


namespace App\Services\ShopManager;

use App\Models\Shop;
use Auth;

class ShopManager
{
    /** @var Shop $shop  */
    private $shop;

    public function __construct()
    {
        $domain = request()->getHost();

        $domainParams = explode('.', $domain);

        $isOurDomain = isset($domainParams[1]) && $domainParams[1] == getenv('APP_DOMAIN');

        $query = Shop::with('faviconImage', 'headerImage', 'backgroundImage')->where(($isOurDomain ? 'subdomain' : 'domain'), $isOurDomain ? $domainParams[0] : $domain);

        $this->shop = $query->first();
    }

    public function getCurrentShop()
    {
        return $this->shop;
    }

    public function isWatchShop()
    {
        return !is_null($this->shop);
    }
}
