<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Category extends Model
{
    protected $guarded = [];
    public $fields = [
        'company_id',
        'name',
        'balance'
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'category_id')
            ->where(function($q){
                $company_id = Auth::user()->company()->first()->id;
                $q->where('company_id', $company_id)->orWhere('company_id', NUll);
            });
    }

    public function childs()
    {
        return $this->hasMany(Category::class, 'category_id')
            ->where(function($q){
                $company_id = Auth::user()->company()->first()->id;
                $q->where('company_id', $company_id)->orWhere('company_id', NUll);
            });
    }

    public function articles()
    {
        return $this->hasMany(Article::class, 'category_id');
    }

    public function partners()
    {
        return $this->hasMany(Partner::class, 'category_id');
    }

    public function ddsarticles()
    {
        return $this->hasMany(DdsArticle::class, 'category_id');
    }

    public function getRootType() //Находит тип ближайшей залоченой категории и выдаёт роут редиректа
    {
        $finded = false;
        $root = null;
        $category = $this;
        while($finded == false){
            $parent = $category->parent()->first();
            if($parent->locked){$finded = true;$root = $parent;break;} else {$category = $parent;}
        }
        if($root){
            return $root->type;
        } else {
            return response()->json(['message' => 'Ошибка наследования категрории'], 500);
        }
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where(function($q) use ($company_id){
            $q->where('company_id', $company_id)->orWhere('company_id', NUll);
        });
    }
}
