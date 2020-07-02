<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Store;
use App\Models\Partner;
use Illuminate\Support\Facades\Artisan;
use App\Models\Setting;
use App\Http\Controllers\SettingsController;
use Carbon\Carbon;

class AdministratorSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = Company::create(['name' => 'Управляющая компания']);

        Store::create([
           'company_id' => $company->id,
            'type' => 'casual',
            'locked' => 0,
            'name' => 'Первый магазин'
        ]);

        $user = User::create([
            'name' => 'Администратор',
            'email' => 'CoderYooda@gmail.com',
            'phone' => '79999999999', //9999999999
            'company_id' => $company->id,
            'password' => bcrypt('password')
        ]);

        Partner::create([
            'type' => 0,
            'user_id' => $user->id,
            'category_id' => 5,
            'store_id' => $company->stores()->first()->id,
            'fio' => 'Админ',
            'companyName' => $company->name,
            'company_id' => $company->id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $user->company()->associate($company);

        #######################################

        $company = Company::create(['name' => 'Тестовый магазин']);

        Store::create([
            'company_id' => $company->id,
            'type' => 'casual',
            'locked' => 0,
            'name' => 'Первый магазин'
        ]);

        $user = User::create([
            'name' => 'Сергей',
            'email' => 'CoderYooda2@gmail.com',
            'phone' => '79524365064',
            'company_id' => $company->id,
            'password' => bcrypt('3154')
        ]);

        Partner::create([
            'type' => 0,
            'user_id' => $user->id,
            'category_id' => 5,
            'store_id' => $company->stores()->first()->id,
            'fio' => 'Сенаторов Сергей Андреевич',
            'companyName' => $company->name,
            'company_id' => $company->id,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        $user->company()->associate($company);

        Artisan::call('categories:init', [
            'company' => $company->id
        ]);

    }
}
