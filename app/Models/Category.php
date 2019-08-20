<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];

    public function parent()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function childs()
    {
        return $this->hasMany('App\Models\Category', 'category_id');
    }

    public function articles()
    {
        return $this->hasMany('App\Models\Article', 'category_id');
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
}
