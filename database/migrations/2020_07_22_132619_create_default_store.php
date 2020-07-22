<?php

use App\Models\Company;
use App\Models\Store;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateDefaultStore extends Migration
{
    public function up()
    {
        foreach(Company::all() as $company) {
            Store::create([
                'company_id' => $company->id,
                'type' => 'casual',
                'locked' => 0,
                'name' => 'Первый магазин'
            ]);
        }
    }

    public function down()
    {
        DB::table('stores')->delete();
    }
}
