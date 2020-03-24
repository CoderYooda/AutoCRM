<?php

namespace App\Http\Controllers\Providers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Providers\TrinityController;

class TrinityApiController extends Controller
{
    public function searchBrands(Request $request)
    {
        $brands['count'] = 0;
        if($request['search'] != null){
            $tp = new TrinityController('B61A560ED1B918340A0DDD00E08C990E');
            $brands = $tp->searchBrands($request['search'], $online = true, $asArray = true);
        }
        if(!isset($brands) && !isset($brands['data']) && (int)$brands['count'] < 1){
            dd(1);
            $brands['brands']['count'] = 0;
        }
        return response()->json(['brands' => $brands, 'search' => $request['search']]);
    }

    public function search(Request $request){

        $tp = new TrinityController('B61A560ED1B918340A0DDD00E08C990E');
        $brands = $tp->searchBrands($request['search'], $online = true, $asArray = false);

        dd($brands);
        $content = view('provider.elements.table_container', compact('brands','request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-provider',
        ], 200);
    }
}
