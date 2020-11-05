<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\Feedback\StoreRequest;
use App\Mail\Shop\FeedbackMail;
use App\Models\Shop;
use App\Services\ShopManager\ShopManager;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function store(StoreRequest $request)
    {
        $mails = $this->shop->orderEmails->pluck('email');

        $data = [
            'name' => $request->name,
            'phone' => $request->phone,
            'shop' => $this->shop
        ];

        Mail::to($mails)->send(new FeedbackMail($data));

        return response()->json([
            'type' => 'success',
            'message' => 'Вам перезвонят в ближайшее время.'
        ]);
    }
}
