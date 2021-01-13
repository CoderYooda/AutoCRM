<?php

namespace App\Observers;

use App\Models\Category;

class CategoryObserver
{
    public function created(Category $category)
    {
        $category->freshSlug();
    }

    public function updated(Category $category)
    {
        $category->freshSlug();
    }

    public function saved(Category $category)
    {
        $category->freshSlug();
    }
}
