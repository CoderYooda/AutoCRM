<?php

namespace App\Observers;

use App\Models\Article;

class ArticleObserver
{
    public function creating(Article $product)
    {
        $product->freshFoundString();
    }

    public function updating(Article $product)
    {
        $product->freshFoundString();
    }

    public function saved(Article $product)
    {
        $product->freshFoundString();
    }
}
