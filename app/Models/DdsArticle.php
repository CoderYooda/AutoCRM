<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class DdsArticle extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }
}
