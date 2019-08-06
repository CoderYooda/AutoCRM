<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

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

        $user = User::create([
            'name' => 'Yooda',
            'email' => 'CoderYooda@gmail.com',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);
        $user->save();
    }
}
