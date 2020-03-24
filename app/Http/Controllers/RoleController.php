<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public static function getRoles($request)
    {
        $roles = Role::where('company_id', Auth::user()->company->id)->get();

        return $roles;
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), self::validateRules());

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $role = Role::firstOrNew(['id' => $request['id']]);
        $role->company_id = Auth::user()->company->id;
        $role->name = $request['name'];
        $role->save();
    }

    private static function validateRules()
    {
        $rules = [
            'name' => ['required', 'min:4', 'string', 'max:255'],
        ];

        return $rules;
    }
}
