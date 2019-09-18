<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Article extends Model
{
    use SoftDeletes;

    public $fields = [
        'company_id',
        'category_id',
        'creator_id',
        'creator_id',
        'supplier_id',
        'measurement_id',
        'article',
        'oem',
        'storeCode',
        'barcode',
        'name',
        'midprice',
        'blockedCount',
        'blockedCount',
    ];

    protected $guarded = [];

    public function canUserTake(){
        if($this->company_id == Auth::user()->company()->first()->id){
            return true;
        } else {
            return false;
        }
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function supplier()
    {
        return $this->belongsTo('App\Models\Supplier', 'supplier_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function stores()
    {
        return $this->belongsToMany('App\Models\Store', 'article_store', 'article_id', 'store_id')
            ->withPivot('location', 'count', 'isset');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

}
