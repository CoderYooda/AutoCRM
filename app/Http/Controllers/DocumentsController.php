<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    public function document(Request $request)
    {
        if($request['doc'] === 'out-warrant'){
            return view('documents.out-warrant');
        }
    }
}
