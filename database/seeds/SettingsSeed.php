<?php

use App\Http\Controllers\CashboxController;
use App\Http\Requests\CashboxRequest;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\SettingsController;

class SettingsSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fake_user = User::where('id', 2)->first();
        Auth::login($fake_user);

        $cashbox = new CashboxController();
        $fake_request = new CashboxRequest();

        $fake_request['name'] = 'Основная касса';
        $fake_request['manager_id'] = $fake_user->id;
        $cashbox->store($fake_request);

        $fake_request['name'] = 'Резерв';
        $fake_request['manager_id'] = $fake_user->id;
        $cashbox->store($fake_request);

        SettingsController::createCompanySettingsPack($fake_user->company()->first(), $fake_user->roles()->first());
    }
}
