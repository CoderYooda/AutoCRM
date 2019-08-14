<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public static function updateArticlePivot($store_id, $article_id, $param, $value)
    {
        #

        $pivot = Store::where('id', $store_id)->articles()->where('article_id', $article_id)->first();
        dd($pivot);
        $pivot->{$param} = $value;
        //$store = Store::where('company_id', Auth::user()->company()->first()->id)->first();->updateExistingPivot($user, array('status' => 1), false);
    }
}
