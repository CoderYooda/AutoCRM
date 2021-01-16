<?php

namespace App\Console\Commands;

use App\Jobs\RebuildCompanyCategories;
use App\Models\Company;
use Carbon\Carbon;
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

        $subCategoryId = null;

        $subCategory = null;

        $start = Carbon::now();

        foreach($categories_rows as $row){

            if($row == "\r" || $row == '') continue;

            if($row[0] == '-'){
                $params = $this->createCategory(substr($row, 1), $company->id, $user->id);

                $params['category_id'] = $rootCategory->id;

                $subCategoryId = \DB::table('categories')->insertGetId($params);

                $slug = Str::slug($params['name'] . '-' . $subCategoryId);

                \DB::table('categories')->where('id', $subCategoryId)->update(['slug' => $slug]);

            } else {

                $params = $this->createCategory($row, $company->id, $user->id);

                $params['category_id'] = $subCategoryId;

                $childCategoryId = \DB::table('categories')->insertGetId($params);

                $slug = Str::slug($params['name'] . '-' . $childCategoryId);

                \DB::table('categories')->where('id', $childCategoryId)->update(['slug' => $slug]);
            }
        }

        $diff = Carbon::now()->diffInMilliseconds($start);

        $this->info('Time for creating: ' . $diff);

        dispatch(new RebuildCompanyCategories($company->id));

        return true;
    }

    private function createCategory($name, $company_id, $creator_id)
    {
        return [
            'name' => $name,
            'company_id' => $company_id,
            'creator_id' => $creator_id,
            'locked' => false,
            'type' => 'store'
        ];
    }
}
