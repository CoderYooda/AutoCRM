<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HelpController as HC;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        // цель динамической подгрузки
        $target = HC::selectTarget();

        $page_title = 'Панель управления';

        $content = view('admin.dashboard', compact('request'));

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $content->render()
            ]);
        } else {
            return $content;
        }
    }
}
