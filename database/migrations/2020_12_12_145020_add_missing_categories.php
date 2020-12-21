<?php

use App\Models\Category;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMissingCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $companies = \App\Models\Company::all();

        $category_id = 2;

        $categories_txt = file_get_contents(public_path('demo/categories.txt'));

        $categories_rows = explode("\n", $categories_txt);

        foreach ($companies as $company) {

            $user = $company->getFirstCompanyMember();

            foreach ($categories_rows as $row) {
                if($row !== ''){
                    if($row[0] === '-'){

                        $name = str_replace("\r", '', substr($row, 1));

                        $category_id = 2;
                        if(Category::where(['company_id' => $company->id, 'name' => $name])->exists()) continue;
                        $cat = $this->createCategory($name, $category_id, $company->id, $user->id);
                        $category_id = $cat->id;
                    } else {

                        $name = str_replace("\r", '', $row);

                        if(Category::where(['company_id' => $company->id, 'name' => $name])->exists()) continue;
                        $cat = $this->createCategory($name, $category_id, $company->id, $user->id);
                    }
                }
            }
        }

        Category::where('name', '')->delete();
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

    private function createCategory($name, $category_id, $company_id, $creator_id)
    {
        return Category::create([
            'name' => $name,
            'category_id' => $category_id,
            'company_id' => $company_id,
            'creator_id' => $creator_id,
            'locked' => false,
            'type' => 'store',
            'slug' => null
        ]);
    }
}
