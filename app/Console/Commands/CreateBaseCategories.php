<?php

namespace App\Console\Commands;

use App\Models\Company;
use Illuminate\Console\Command;
use App\Models\Category;

class CreateBaseCategories extends Command
{
    protected $signature = 'categories:init {company}';

    protected $description = 'Создание базовых категорий для компании';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $company = Company::where('id', $this->argument('company'))->first();

        $category_id = 2;

        $categories_txt = file_get_contents('public/demo/categories.txt');

        $categories_rows = explode("\n", $categories_txt);

        foreach($categories_rows as $row){
            if($row !== ''){
                if($row[0] === '-'){
                    $category_id = 2;
                    $cat = $this->createCategory(substr($row, 1), $category_id, $company->id, $company->getFirstCompanyMember()->id);
                    $category_id = $cat->id;
                } else {
                    $cat = $this->createCategory($row, $category_id, $company->id, $company->getFirstCompanyMember()->id);
                }
            }
        }
    }

    private function createCategory($name, $category_id, $company_id, $creator_id)
    {
        return Category::create(['name' => $name, 'category_id' => $category_id, 'company_id' => $company_id, 'creator_id' => $creator_id, 'locked' => false, 'type' => 'store']);
    }
}
