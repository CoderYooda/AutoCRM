<?php

namespace App\Http\Controllers;

use App\Models\SalarySchema;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SalarySchemaController extends Controller
{
    public static function getSchemas()
    {
        $schemas = SalarySchema::all();
        return $schemas;
    }

    public function getSchemaById($id){

        $schema = SalarySchema::whereId($id)->first();

        if($schema){
            $index = (int)(Carbon::now()->timestamp . rand(0,999));
            $view = view(get_template() . '.partner.dialog.tabs.includes.salary_schema', compact('schema', 'index'));
            return response()->json([
                'schema' => $schema,
                'index' => $index,
                'html' => $view->render(),
                'type' => 'success',
                'message' => 'Схема добавлена',
            ]);
        } else {
            return response()->json([
                'type' => 'error',
                'message' => 'Такой схемы нет',
            ]);
        }
    }

    public static function salarySchemaDialog(Request $request)
    {

        $tag = 'salarySchemaDialog';

        $view = view(get_template() . '.salary.dialog.form_salary')
            ->with('class', $tag)
            ->with('refer', $request['refer'])
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view
        ];

        return response()->json($response);
    }

}
