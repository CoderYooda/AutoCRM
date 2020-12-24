<?php

namespace App\Http\Controllers;

use App\Http\Requests\PriceStoreRequest;
use App\Models\Markup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PriceController extends Controller
{
    public static function dialog(Request $request)
    {
        $price = Markup::find($request->price_id);

        $class = 'priceDialog' . ($price->id ?? '');

        $types = [];

        if($price) {
            $types = $price->options;
        }

        $view = view(get_template() . '.prices.dialog.form_price', compact('request', 'price', 'class', 'types'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }

    public function store(PriceStoreRequest $request)
    {
        DB::transaction(function () use ($request) {

            $params = $request->only('name');

            $params['company_id'] = Auth::user()->company_id;

            $price = Markup::updateOrCreate(['id' => $request->price_id], $params);

            $price->options()->delete();

            $price->options()->createMany($request->prices);
        });

        return response()->json([
            'type' => 'success',
            'message' => 'Наценка успешно сохранено.',
            'event' => 'PriceStored'
        ]);
    }

    public function percent(Request $request, Markup $price)
    {
        return response()->json([
            'percent' => $price->getPercentByAmount($request->price)
        ]);
    }

    public function modal()
    {
        $user = Auth::user();

        $prices = Markup::where('company_id', $user->company_id)->get();

        $view = view(get_template() . '.system.includes.prices', compact('prices'));

        return response()->json([
            'html' => $view->render()
        ]);
    }
}
