<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    public static function dialog(Request $request)
    {
        $price = Price::find($request->price_id);

        $class = 'priceDialog' . ($price->id ?? '');

        $view = view(get_template() . '.prices.dialog.form_price', compact('request', 'price', 'class'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }
}
