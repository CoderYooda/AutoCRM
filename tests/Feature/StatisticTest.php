<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Partner;
use App\Models\ProviderOrder;
use App\Models\Store;
use App\Models\User;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StatisticTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->withoutExceptionHandling();

        $company = Company::create(['name' => 'Управляющая компания']);

        Store::create([
            'company_id' => $company->id,
            'type' => 'casual',
            'locked' => 0,
            'name' => 'Первый магазин'
        ]);

        $user = User::create([
            'name' => 'Администратор',
            'email' => 'CoderYooda@gmail.com',
            'phone' => '79524365062',
            'company_id' => $company->id,
            'password' => bcrypt('senatorov616322')
        ]);

        $partner = Partner::create([
            'isfl' => true,
            'user_id' => $user->id,
            'category_id' => 5,
            'store_id' => $company->stores()->first()->id,
            'fio' => 'Админ',
            'companyName' => $company->name,
            'company_id' => $company->id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $this->actingAs($user);

        //create provider order



        //

        $attributes = [
            'manager_id' => $user->id,
            'begin_date' => Carbon::now()->format('Y-m-d'),
            'final_date' => Carbon::now()->addDays(7)->format('Y-m-d'),
            'entity' => 0
        ];

        $response = $this->post(route('StatisticShow'), $attributes);

        dd($response);
    }
}
