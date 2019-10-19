<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Store;

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

        $user = User::create([
            'name' => 'Сергей',
            'email' => 'CoderYooda2@gmail.com',
            'phone' => '79524365064',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);

        $user->save();
        $user->company()->associate($company);
        $company->stores()->save($store);

        #############################################
        $company = new Company();
        $company->name = 'Дизайнерский магазин';
        $company->save();

        $store = new Store();
        $store->name = 'Основной склад';
        $store->company_id = $company->id;

        $user = User::create([
            'name' => 'Сергей',
            'email' => 'Teftela@mail.ru',
            'phone' => '89878148690',
            'company_id' => $company->id,
            'password' => bcrypt('123456789')
        ]);

        $user->save();
        $user->company()->associate($company);
        $company->stores()->save($store);
    }
}
