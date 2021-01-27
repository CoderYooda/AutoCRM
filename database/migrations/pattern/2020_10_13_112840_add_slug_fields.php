<?php

use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

class AddSlugFields extends Migration
{
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('slug');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->string('slug');
        });

        foreach (Category::all() as $category) {

            $categoryName = $category->name;

            $nameUsing = Category::where(['name' => $categoryName])
                ->where('id', '!=', $category->id)
                ->exists();

            if($nameUsing) $categoryName .= '-' . $category->id;

            $category->update(['slug' => Str::slug($categoryName)]);
        }

        foreach (Article::all() as $product) {

            $productName = $product->name;

            $nameUsing = Article::where(['name' => $productName])
                ->where('id', '!=', $product->id)
                ->exists();

            if($nameUsing) $productName .= '-' . $product->id;

            $product->update(['slug' => Str::slug($productName)]);
        }
    }

    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('slug');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
}
