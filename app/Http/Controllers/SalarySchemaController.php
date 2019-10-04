<?php

namespace App\Http\Controllers;

use App\Models\SalarySchema;
use Illuminate\Http\Request;

class SalarySchemaController extends Controller
{
    public static function getSchemas()
    {
        $schemas = SalarySchema::all();
        return $schemas;
    }
}
