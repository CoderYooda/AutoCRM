<?php

namespace App\Models\System;

use App\Models\Company;
use Illuminate\Database\Eloquent\Model;

class StockOfProduct extends Model
{
    protected $table = 'companies_stock_of_product';

    public $fields = [
        'company_id',
        'data',
        'processed',
        'price'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'id', 'company_id');
    }
}
