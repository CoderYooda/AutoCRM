<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\ChangeRestorePasswordRequest;
use App\Http\Requests\Shop\ConfirmRestoreCodeRequest;
use App\Http\Requests\Shop\RestoreUserRequest;
use App\Models\Partner;
use App\Models\Shop;
use App\Models\User;
use App\Services\ShopManager\ShopManager;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RestoreController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index()
    {
        session()->remove('restore.code');
        session()->remove('restore.success');

        return view('shop.restore.index')
            ->with('shop', $this->shop);
    }

    public function sendCode(RestoreUserRequest $request)
    {
        $code = rand(1111, 9999);

        session()->put('restore.code', $code);
        session()->put('restore.number', $request->phone);

        $text = 'Код для восстановления доступа: ' . $code;

        $status = SmsController::sendSMS($request->phone, $text);

        return response()->json([
            'type' => 'success',
            'message' => 'Сообщение отправлено.'
        ]);
    }

    public function acceptCode(ConfirmRestoreCodeRequest $request)
    {
        return DB::transaction(function () use($request) {

            $phone = session()->get('restore.number');

            $user = User::where('phone', $phone)->first();

            $user->update(['password' => bcrypt($request->password)]);

            $user->createPartnerIfNotExists();

            Auth::loginUsingId($user->id, true);

            session()->put('restore.success', true);

            return response()->json([
                'type' => 'success',
                'message' => 'Код успешно подтверждён'
            ]);

        });
    }
}
