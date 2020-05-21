<?php

namespace App\Console\Commands;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingsController;
use App\Models\Company;
use App\Models\Partner;
use App\Models\Store;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use App\Models\Phone;

class StressTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stress:seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $company = factory(Company::class)->make();
        $company->save();

        $user = factory(User::class)->make();
        $user->company_id = $company->id;
        $user->save();

        $role = RoleController::createStartRoles($company);
        $user->assignRole($role);
        SettingsController::createCompanySettingsPack($company, $role);

        $store = factory(Store::class)->make();
        $store->company_id = $company->id;
        $store->save();

        $partner = factory(Partner::class)->make();
        $partner->user_id = $user->id;
        $partner->company_id = $company->id;
        $partner->store_id = $store->id;
        $partner->save();

        $phones = [];
        for($i = 0; $i < rand(2, 4);$i++){
            $main = $i == 0 ? 1 : 0;
            $phone = new Phone(['number' => '+79'.rand(123465064, 923465064), 'main' => $main,  ]);
            $phone->company_id = $company->id;
            $phone->save();
            $phones[] = $phone->id;
        }
        $partner->phones()->sync($phones);


        $count_partners = rand(200, 10000);

        $bar = $this->output->createProgressBar($count_partners);
        $bar->start();
        for($i = 0; $i < $count_partners; $i++){
            self::createPartner($user, $company, $store);
            $bar->advance();
        }
        $bar->finish();




        Artisan::call('categories:init', ['company' => $company->id]);
    }

    private static function createPartner($user, $company, $store)
    {
        $partner = factory(Partner::class)->make();
        $partner->user_id = $user->id;
        $partner->company_id = $company->id;
        $partner->store_id = $store->id;
        $partner->save();

        $phones = [];
        for($i = 0; $i < rand(2, 4);$i++){
            $main = $i == 0 ? 1 : 0;
            $phone = new Phone(['number' => '+79'.rand(123465064, 923465064), 'main' => $main,  ]);
            $phone->company_id = $company->id;
            $phone->save();
            $phones[] = $phone->id;
        }
        $partner->phones()->sync($phones);

        $partner->foundstring = strtolower(str_replace(array('(', ')', ' ', '-', '+'), '', $partner->fio . $partner->companyName . $partner->basePhone));
        $partner->save();
        return $partner;
    }
}
