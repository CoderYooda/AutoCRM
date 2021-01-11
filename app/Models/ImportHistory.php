<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportHistory extends Model
{
    protected $guarded = [];
    protected $table = 'import_history';

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
