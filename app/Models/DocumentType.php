<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    protected $table = 'documents_types';
}
