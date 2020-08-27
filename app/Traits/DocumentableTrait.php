<?php


namespace App\Traits;

use App\Models\Document;

trait DocumentableTrait
{
    public function document()
    {
        return $this->morphOne(Document::class, 'documentable');
    }
}
