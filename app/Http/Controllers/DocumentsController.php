<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    public function document(Request $request)
    {
        $names = [
            'out-warrant' => 'documents.out-warrant',
            'client-order' => 'documents.client-order',
            'provider-order' => 'documents.provider-order',
            'statistic-result' => 'documents.statistic-result'
        ];

        return view($names[$request->doc], compact('request'));
    }
}
