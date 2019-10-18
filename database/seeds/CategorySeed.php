<?php

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statement = "ALTER TABLE categories AUTO_INCREMENT = 2000;";
        DB::unprepared($statement);

        Category::create([
            'id' => 1,
            'name' => 'Корневая директория',
            'category_id' => 0,
            'company_id' => null,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'main',
        ]);

        Category::create([
            'id' => 2,
            'name' => 'Номенклатуры',
            'category_id' => 1,
            'company_id' => null,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'store',
        ]);

        Category::create([
            'id' => 3,
            'name' => 'Контрагенты',
            'category_id' => 1,
            'company_id' => null,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'partner',
        ]);

        Category::create(['id' => 5, 'name' => 'Сотрудники', 'category_id' => 3, 'company_id' => null, 'creator_id' => 1, 'locked' => true, 'type' => 'employee',]);
        Category::create(['id' => 6, 'name' => 'Поставщики', 'category_id' => 3, 'company_id' => null, 'creator_id' => 1, 'locked' => true, 'type' => 'partner',]);
        //Category::create(['id' => 7, 'name' => 'Покупатели', 'category_id' => 3, 'company_id' => null, 'creator_id' => 1, 'locked' => false, 'type' => NULL,]);

        Category::create([
            'id' => 4,
            'name' => 'Статьи ДДС',
            'category_id' => 1,
            'company_id' => null,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'dds',
        ]);

        Category::create(['id' => 8, 'name' => 'Расход', 'category_id' => 4, 'company_id' => null, 'creator_id' => 1, 'locked' => true, 'type' => 'dds',]);
        Category::create(['id' => 9, 'name' => 'Доход', 'category_id' => 4, 'company_id' => null, 'creator_id' => 1, 'locked' => true, 'type' => 'dds',]);

//        $json = json_decode(file_get_contents('public/demo/numenclatures.json'));
//
//        $this->command->getOutput()->progressStart(count($json->categories));
//
//        foreach($json->categories as $cat){
//            $category = Category::create(['name' => $cat->name, 'category_id' => 2, 'company_id' => 1, 'creator_id' => 1, 'locked' => false, 'type' => NULL,]);
//            if($cat->childs != NULL){
//                foreach($cat->childs as $cat){
//                    $category2 = Category::create(['name' => $cat->name, 'category_id' => $category->id, 'company_id' => 1, 'creator_id' => 1, 'locked' => false, 'type' => NULL,]);
//                    if($cat->childs != NULL){
//                        foreach($cat->childs as $cat){
//                            $category3 = Category::create(['name' => $cat->name, 'category_id' => $category2->id, 'company_id' => 1, 'creator_id' => 1, 'locked' => false, 'type' => NULL,]);
//                        }
//                    }
//                }
//            }
//            $this->command->getOutput()->progressAdvance();
//        }
//        $this->command->getOutput()->progressFinish();
    }
}
