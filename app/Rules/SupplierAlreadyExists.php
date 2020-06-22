<?php

namespace App\Rules;

use App\Models\Supplier;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class SupplierAlreadyExists implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $company_id = Auth::user()->company->id;

        return !Supplier::where(['name' => $value, 'company_id' => $company_id])->exists();
    }

    public function message()
    {
        return 'Производитель с таким названием уже существует.';
    }
}
