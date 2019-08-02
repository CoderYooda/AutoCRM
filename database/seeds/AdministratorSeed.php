<?php

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
        User::create([
            'name' => 'Yooda',
            'email' => 'CoderYooda@gmail.com',
            'password' => bcrypt('senatorov616322')
        ]);
    }
}
