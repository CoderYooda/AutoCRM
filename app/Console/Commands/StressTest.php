<?php

namespace App\Console\Commands;

use App\Http\Controllers\HelpController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ShipmentsController;
use App\Http\Requests\ShipmentsRequest;
use App\Models\Article;
use App\Models\Company;
use App\Models\Partner;
use App\Models\Role;
use App\Models\Shipment;
use App\Models\Store;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use App\Models\Phone;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class StressTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stress:seed';

    private $partners_count = 500;
    private $count_suppliers = 100;
    private $count_products = 10000;
    private $count_shipments = 3500;

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
        $partner = self::createPartner($user, $company, $store);


        # Создаем фейковых партнеров
        $count_partners = rand(0, $this->partners_count);
        $bar = $this->output->createProgressBar($count_partners);
        $bar->start();
        for($i = 0; $i < $count_partners; $i++){
            self::createPartner(null, $company, $store);
            $bar->advance();
        }
        $bar->finish();

        # Создаем категории
        Artisan::call('categories:init', ['company' => $company->id]);

        # Создаем производителей
        $count_suppliers = rand(0, $this->count_suppliers);
        $bar = $this->output->createProgressBar($count_suppliers);
        $bar->start();
        $suppliers = [];
        for($i = 0; $i < $count_suppliers; $i++){
            $supplier = factory(Supplier::class)->make();
            $supplier->company_id = $company->id;
            $supplier->save();
            $suppliers[] = $supplier->id;
            $bar->advance();
        }
        $bar->finish();

        # Создаем товары
        $count_products = rand(0, $this->count_products);
        $bar = $this->output->createProgressBar($count_products);
        $bar->start();
        for($i = 0; $i < $count_products; $i++){
            $product = factory(Article::class)->make(['supplier_id' => array_rand($suppliers)]);
            $product->category_id = \App\Models\Category::where('company_id', $company->id)->where('type', 'store')->inRandomOrder()->first()->id;
            $product->company_id = $company->id;
            $product->creator_id = $company->id;
            $product->save();
            $bar->advance();
        }
        $bar->finish();

        # Создаем продажи
        $count_shipments = rand(0, $this->count_shipments);
        $bar = $this->output->createProgressBar($count_shipments);
        $bar->start();
        for($i = 0; $i < $count_shipments; $i++){
            $user = $company->members()->inRandomOrder()->first();
            Auth::login($user);
            self::createShipment($company->partners()->inRandomOrder()->first(), HelpController::generateRandomString(200), $company);
            Auth::logout($user);
            $bar->advance();
        }
        $bar->finish();

    }

    private static function createPartner($user = null, $company, $store)
    {
        if(!$user){
            if(!rand(0, 30)){
                $user = factory(User::class)->make();
                $user->company_id = $company->id;
                $user->save();
                $role = Role::owned($company)->where('id', $company->settings()->where('key', 'role_id')->first()->value)->first();
                $user->syncRoles([$role->id]);

                $user_id = $user->id;
            } else {
                $user_id = null;
            }
        } else {
            $user_id = $user->id;
        }

        $partner = factory(Partner::class)->make();
        $partner->user_id = $user_id;
        $partner->company_id = $company->id;
        $partner->store_id = $store->id;
        $partner->save();

        $phones = [];
        $phones_str = '';
        for($i = 0; $i < rand(2, 4);$i++){
            $main = $i == 0 ? 1 : 0;
            $phone = new Phone(['number' => '+79'.rand(123465064, 923465064), 'main' => $main,  ]);
            $phone->company_id = $company->id;
            $phone->save();
            $phones[] = $phone->id;
            $phones_str .= $phone->number;
        }
        $partner->phones()->sync($phones);
        $partner->foundstring = mb_strtolower(str_replace(array('(', ')', ' ', '-', '+'), '', $partner->fio . $partner->companyName . $phones_str));
        $partner->save();
        return $partner;
    }

    private static function createShipment($partner, $comment, $company){
        $shipmnetController = new ShipmentsController();
        $date = Carbon::now()->addDays(rand(-365, 0));
        $date = $date->addHours(rand(0, 24));
        $date = $date->addMinutes(rand(0, 60));
        $date = $date->addSeconds(rand(0, 60));
        $inpercents = rand(0,1);
        if($inpercents){
            $discount = rand(0,50);
        } else {
            $discount = rand(0,5000);
        }
        $fake_request = new ShipmentsRequest();
        $products = [];
        $products_count = rand(1, 12);

        for($e = 0; $e < $products_count; $e++){
            $product = Article::owned($company)->inRandomOrder()->first();
            $products[$product->id]['id'] = $product->id;
            $products[$product->id]['count'] = rand(1, 12);
            $products[$product->id]['price'] = rand(1, 2000);
        }

        $fake_request['do_date'] = $date;
        $fake_request['created_at'] = $date;
        $fake_request['partner_id'] = $partner->id;
        $fake_request['store_id'] = $company->stores()->first()->id;
        $fake_request['discount'] = $discount;
        $fake_request['inpercents'] = $inpercents;
        $fake_request['comment'] = $comment;
        $fake_request['products'] = $products;

        $shipmnetController->store($fake_request);
    }
}
