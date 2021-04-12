<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Category;

class AddNewCategoryDeleted extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Category::create(['name' => 'Удаленные', 'category_id' => 2, 'company_id' => null, 'creator_id' => 1, 'locked' => true, 'type' => 'del',]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Category::where('name','Удаленные')->where('category_id',2)->delete();

    }
}
