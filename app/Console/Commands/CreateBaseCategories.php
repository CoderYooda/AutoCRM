<?php

namespace App\Console\Commands;

use App\Models\Company;
use Illuminate\Console\Command;
use App\Models\Category;
use Illuminate\Support\Str;

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
        $company = Company::find($this->argument('company'));

        $categories_txt = file_get_contents(public_path('demo/categories.txt'));

        $categories_rows = explode("\n", $categories_txt);

        $user = $company->getFirstCompanyMember();

        $rootCategory = Category::find(2);

        $subCategory = null;

        foreach($categories_rows as $row){

            if($row == "\r" || $row == '') continue;

            if($row[0] == '-'){
                $params = $this->createCategory(substr($row, 1), $company->id, $user->id);

                $subCategory = Category::create($params);

                $subCategory->makeChildOf($rootCategory);

            } else {

                $params = $this->createCategory($row, $company->id, $user->id);

                $childCategory = Category::create($params);

                $childCategory->makeChildOf($subCategory);
            }
        }

        return true;
    }

    private function createCategory($name, $company_id, $creator_id)
    {
        return [
            'name' => $name,
            'company_id' => $company_id,
            'creator_id' => $creator_id,
            'locked' => false,
            'type' => 'store',
            'slug' => null
        ];
    }
}
