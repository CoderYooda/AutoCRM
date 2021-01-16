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

class RebuildCompanyCategories implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $company_id = null;

    public function __construct($company_id)
    {
        $this->company_id = $company_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $company = Company::find($this->company_id);

        $categories = Category::with('parent')->where('company_id', $company->id)->get();

        foreach ($categories as $category) {
            $category->makeChildOf($category->parent->id);
        }
    }
}
