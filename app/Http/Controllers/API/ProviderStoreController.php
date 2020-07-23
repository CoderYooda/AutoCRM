<?php

namespace App\Http\Controllers\API;

use App\Services\test\test;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, test $qwe1)
    {
        $qwe1->find($request->search);

        dd($qwe1);

    }
}
