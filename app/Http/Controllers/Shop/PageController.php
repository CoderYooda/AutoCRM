<?php

namespace App\Http\Controllers\Shop;

use App\Models\Shop;
use App\Http\Controllers\Controller;
use App\Services\ShopManager\ShopManager;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index()
    {
        return view('shop.index')->with('shop', $this->shop);
    }

    public function about()
    {
        return view('shop.about-company')->with('shop', $this->shop);
    }

    public function delivery()
    {
        return view('shop.delivery')->with('shop', $this->shop);
    }

    public function warranty()
    {
        return view('shop.warranty')->with('shop', $this->shop);
    }

    public function contacts()
    {
        return view('shop.contacts')->with('shop', $this->shop);
    }

    public function catalogue()
    {
        return view('shop.catalogue')->with('shop', $this->shop);
    }
}
