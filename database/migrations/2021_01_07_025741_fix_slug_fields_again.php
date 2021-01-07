<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixSlugFieldsAgain extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $products = \App\Models\Product::where('slug', '')->get();

        foreach ($products as $product) {
            $product->update(['slug' => \Illuminate\Support\Str::slug($product->name . '-' . $product->id)]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
