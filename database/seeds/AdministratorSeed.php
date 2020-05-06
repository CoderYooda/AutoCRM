<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Store;
use App\Models\Partner;
use Illuminate\Support\Facades\Artisan;
use App\Models\Setting;
use App\Http\Controllers\SettingsController;

class AdministratorSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = new Company();
        $company->name = 'Управляющая компания';
        $company->save();
	
	    $store = new Store();
	    $store->company_id = $company->id;
	    $store->type = 'casual';
	    $store->locked = 0;
	    $store->name = 'Первый магазин';
	    $store->save();

        $user = User::create([
            'name' => 'Администратор',
            'email' => 'CoderYooda@gmail.com',
            'phone' => '79524365062',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);

        Partner::create([
            'isfl' => true,
            'user_id' => $user->id,
            'category_id' => 5,
            'store_id' => $company->stores()->first()->id,
            'fio' => 'Админ',
            'companyName' => $company->name,
            'company_id' => $company->id,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        $user->save();
        $user->company()->associate($company);

        #######################################
        $company = new Company();
        $company->name = 'Тестовый магазин';
        $company->save();

	    $store = new Store();
	    $store->company_id = $company->id;
	    $store->type = 'casual';
	    $store->locked = 0;
	    $store->name = 'Первый магазин';
	    $store->save();


        $user = User::create([
            'name' => 'Сергей',
            'email' => 'CoderYooda2@gmail.com',
            'phone' => '79524365064',
            'company_id' => $company->id,
            'password' => bcrypt('3154')
        ]);

        Partner::create([
            'isfl' => true,
            'user_id' => $user->id,
            'category_id' => 5,
            'store_id' => $company->stores()->first()->id,
            'fio' => 'Сенаторов Сергей Андреевич',
            'companyName' => $company->name,
            'company_id' => $company->id,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        $user->save();
        $user->company()->associate($company);

        Artisan::call('categories:init', [
            'company' => $company->id
        ]);

    }
}
