<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EntranceSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fake_user = \App\Models\User::where('id', 1)->first();
        Auth::login($fake_user);

        $this->command->getOutput()->progressStart(300);

        for($i = 0; $i < 300; $i++){

            $entranceController = new \App\Http\Controllers\EntranceController();
            $store = \App\Models\Store::inRandomOrder()->first();
            $partner = \App\Models\Partner::inRandomOrder()->first();
            $comment = 'Тестовый комментарий';

            $nds = rand(0,1);
            if($nds){
                $nds_included = rand(0,1);
            } else {
                $nds_included = false;
            }

            $date = Carbon::now()->addDays(rand(-365, 0));
            $date = $date->addHours(rand(0, 24));
            $date = $date->addMinutes(rand(0, 60));
            $date = $date->addSeconds(rand(0, 60));

            $fake_request = new \Illuminate\Http\Request();

            $products = [];
            $products_bd = \App\Models\Article::inRandomOrder()->limit(rand(1, 6))->get();

            foreach($products_bd as $product){
                $products[$product->id]['id'] = $product->id;
                $products[$product->id]['count'] = rand(1, 22);
                $products[$product->id]['price'] = rand(1, 10000);
            }
            $fake_request['do_date'] = $date;
            $fake_request['partner_id'] = $partner->id;
            $fake_request['store_id'] = $store->id;
            $fake_request['comment'] = $comment;
            $fake_request['nds'] = $nds;
            $fake_request['nds_included'] = $nds_included;
            $fake_request['products'] = $products;

            $entranceController->store($fake_request);

            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }
}
