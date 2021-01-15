<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\HelpController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        // точка входа в страницу
        $page_title = 'Панель управления партнёра';

        $class = 'partner';

        // цель динамической подгрузки
        $target = HelpController::selectTarget();

        // Определяем табуляцию
        if ($request['active_tab'] === NULL || $request['active_tab'] == 'undefined') {
            $request['active_tab'] = 'index';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);
        $content->with('class', $class);

        if (class_basename($content) == "JsonResponse") {
            return $content;
        }

        if ($request['view_as'] != null && $request['view_as'] == 'json') {

            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $content->render(),
                'class' => $class
            ]);
        }

        return $content;
    }

    public function indexTab(Request $request)
    {
        return view('partner.tabs.index', compact('request'));
    }
}
