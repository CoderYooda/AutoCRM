<?php

namespace App\Observers;

use App\Models\Product;

class ProductObserver
{
    public function creating(Product $product)
    {
        $product->freshFoundString();
    }

    public function created(Product $product)
    {
        $product->freshSlug();
    }

    public function updating(Product $product)
    {
        $product->freshFoundString();
    }

    public function updated(Product $product)
    {
        $product->freshSlug();
    }

    public function saving(Product $product)
    {
        $product->freshFoundString();
    }

    public function saved(Product $product)
    {
        $product->freshSlug();
    }
}
