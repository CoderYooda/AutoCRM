<?php

namespace App\Broadcasting;

use App\Models\Company;
use App\Models\User;

class CompanyChannel
{
    public function join(User $user, Company $company)
    {
//        return $user->company_id == $company->id;
        return true;
    }
}
