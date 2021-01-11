<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class DdsArticle extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function ddstype()
    {
        return $this->belongsTo(DdsType::class, 'dds_types_id');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where(function($q) use ($company_id){
            $q->where('company_id', $company_id);
            $q->orWhere('company_id', NUll);
        });
    }
}
