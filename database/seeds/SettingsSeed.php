<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;

class SettingsSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fake_user = \App\Models\User::where('id', 2)->first();
        Auth::login($fake_user);


        $cashbox = new \App\Http\Controllers\CashboxController();
        $fake_request = new \Illuminate\Http\Request();

        $fake_request['name'] = 'Основная касса';
        $fake_request['manager_id'] = $fake_user->id;
        $cashbox->store($fake_request);

        $fake_request['name'] = 'Резерв';
        $fake_request['manager_id'] = $fake_user->id;
        $cashbox->store($fake_request);
    }
}
