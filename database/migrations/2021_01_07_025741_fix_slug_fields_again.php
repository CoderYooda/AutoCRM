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
        $products = DB::table('articles')->where('slug', '')->get();

        foreach ($products as $product) {
            DB::table('articles')
                ->where('id', $product->id)
                ->update(['slug' => \Illuminate\Support\Str::slug($product->name . '-' . $product->id)]);
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
