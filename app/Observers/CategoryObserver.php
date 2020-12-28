<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryObserver
{
    public function created(Category $category)
    {
        $category->update(['slug' => Str::slug($category->name . '-' . $category->id)]);
    }
}
