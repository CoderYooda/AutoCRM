<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Category;

class AddCategoryNestedset extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Category::where('id', 1)->update(['category_id' => null]);

        Schema::table('categories', function (Blueprint $table) {
            $table->unsignedInteger('_lft');
            $table->unsignedInteger('_rgt');
            $table->integer('depth')->nullable();
            $table->unsignedInteger('category_id')->nullable()->change();
        });

        Category::rebuild();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('_lft');
            $table->dropColumn('_rgt');
            $table->dropColumn('depth');
        });
    }
}
