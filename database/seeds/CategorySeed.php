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
        Category::create([
            'id' => 1,
            'name' => 'Корневая директория',
            'category_id' => 0,
            'company_id' => 1,
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

        Category::create([
            'id' => 4,
            'name' => 'Статьи ДДС',
            'category_id' => 1,
            'company_id' => null,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'dds',
        ]);
    }
}
