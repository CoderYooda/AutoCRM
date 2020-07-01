<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use Illuminate\Http\Request;
use App\Models\Payment;

class ServicesController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('services.index', compact('request'))->render();
            return response()->json([
                'target' => $target,
                'page' => 'Услуги',
                'content' => $content
            ]);
        } else {
            return view('services.index', compact('request'));
        }
    }
}
