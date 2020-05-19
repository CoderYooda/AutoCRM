<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    public function document(Request $request)
    {
        if($request['doc'] === 'out-warrant'){
            return view('documents.out-warrant', compact('request'));
        } elseif($request['doc'] === 'client-order'){
            return view('documents.client-order', compact('request'));
        } elseif($request['doc'] === 'provider-order'){
            return view('documents.provider-order', compact('request'));
        }
    }
}
