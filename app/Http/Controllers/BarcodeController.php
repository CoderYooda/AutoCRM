<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Partner;
use Illuminate\Http\Request;
use Milon\Barcode\DNS1D;

class BarcodeController extends Controller
{
    public static function getBArCodeSVG($code)
    {
        $barcode = DNS1D::getBarcodeSVG($code, "C39");

        return $barcode;
    }
    public static function getBarCodePNG($code)
    {
        $barcode = DNS1D::getBarcodePNG($code, "C39");

        return $barcode;
    }

    public static function barcodeDialog($request){
        $articles = Article::where('barcode', $request['upc'])
            ->orWhere('barcode_local', $request['upc'])
            ->orWhere('storeCode', $request['upc'])
            ->get();
        $partners = Partner::where('barcode', $request['upc'])->get();

        return response()->json([
            'tag' => 'barcodeDialog',
            'html' => view('barcode.dialog.form', compact('articles','partners', 'request'))->render()
        ]);
    }
}
