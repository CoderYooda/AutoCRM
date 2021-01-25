<?php

namespace App\Jobs;

use App\Models\Category;
use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Str;

class CreateBaseCategoriesForCompany implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $company_id;

    public function __construct($company_id)
    {
        $this->company_id = $company_id;
    }

    public function handle()
    {
        $company = Company::find($this->company_id);

        $categories_txt = file_get_contents(public_path('demo/categories.txt'));

        $categories_rows = explode("\n", $categories_txt);

        $user = $company->getFirstCompanyMember();

        $rootCategory = Category::find(2);

        $subCategoryId = null;

        $subCategory = null;

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
