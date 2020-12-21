<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Article;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('report.index', compact('request'))->render();
            return response()->json([
                'target' => $target,
                'page' => 'Отчеты',
                'content' => $content
            ]);
        } else {
            return view('report.index', compact('request'));
        }

    }
}
