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
        $user = Auth::user();

        if($user) return $this->shop = $user->shop;

        $url = request()->getHost();

        $domainParams = explode('.', $url);

        $isOurDomain = isset($domainParams[1]) && $domainParams[1] == env('APP_DOMAIN');

        $field = $isOurDomain ? 'subdomain' : 'domain';
        $domain = $isOurDomain ? $domainParams[0] : $url;

        $query = Shop::with('faviconImage', 'headerImage', 'backgroundImage')->where($field, $domain);

        $this->shop = ($isOurDomain && $domain == 'online') ? $query->first() : $query->firstOrFail();
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
