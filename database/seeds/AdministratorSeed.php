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
            'name' => 'Yooda',
            'email' => 'CoderYooda@gmail.com',
            'phone' => '79524365064',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);

        $user->save();
        $user->company()->associate($company);
        $company->stores()->save($store);
    }
}
