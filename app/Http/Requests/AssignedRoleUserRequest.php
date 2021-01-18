<?php

namespace App\Http\Requests;

use App\Rules\CheckWhatUserIsNotOwner;
use Illuminate\Foundation\Http\FormRequest;

class AssignedRoleUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'role_id' => ['exists:roles,id'],
            'user_id' => ['exists:users,id']
        ];
    }
}
