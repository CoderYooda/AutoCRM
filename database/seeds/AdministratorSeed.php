<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Store;
use App\Models\Partner;

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
        $store->name = 'Первый тестовый';
        $store->company_id = $company->id;

        $user = User::create([
            'name' => 'Администратор',
            'email' => 'CoderYooda@gmail.com',
            'phone' => '79524365062',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);

        $user->save();
        $user->company()->associate($company);
        $company->stores()->save($store);


        #######################################
        $company = new Company();
        $company->name = 'Тестовый магазин';
        $company->save();

        $store = new Store();
        $store->name = 'Основной склад';
        $store->company_id = $company->id;
        $company->stores()->save($store);


        $user = User::create([
            'name' => 'Сергей',
            'email' => 'CoderYooda2@gmail.com',
            'phone' => '79524365064',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);

        Partner::create([
            'isfl' => true,
            'user_id' => $user->id,
            'category_id' => 5,
            'store_id' => $store->id,
            'fio' => 'Сенаторов Сергей Андреевич',
            'companyName' => $company->name,
            'company_id' => $company->id,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        $user->save();
        $user->company()->associate($company);


    }
}
