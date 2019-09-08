<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('employee.index', compact('request'))->render();
            return response()->json([
                'target' => $target,
                'page' => 'Сотрудники',
                'content' => $content
            ]);
        } else {
            return view('employee.index', compact('request'));
        }
    }
}
