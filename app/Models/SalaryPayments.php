<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

Carbon::setToStringFormat('d.m.Y H:i');

class SalaryPayments extends Model
{
    protected $guarded = [];

    protected $table = 'salary_payments';
}
