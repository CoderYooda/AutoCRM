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
            'name' => 'Корневая директория',
            'category_id' => 0,
            'company_id' => 1,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'main',
        ]);

        Category::create([
            'name' => 'Номенклатуры',
            'category_id' => 1,
            'company_id' => null,
            'creator_id' => 1,
            'locked' => true,
            'type' => 'product',
        ]);
    }
}
