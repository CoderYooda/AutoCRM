<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ShipmentSeed extends Seeder
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
        $shipmnetController = new \App\Http\Controllers\ShipmentsController();


        for($i = 0; $i < 300; $i++){

            $date = Carbon::now()->addDays(rand(-365, 0));
            $date = $date->addHours(rand(0, 24));
            $date = $date->addMinutes(rand(0, 60));
            $date = $date->addSeconds(rand(0, 60));

            $partner = \App\Models\Partner::inRandomOrder()->first();
            $inpercents = rand(0,1);
            if($inpercents){
                $discount = rand(0,50);
            } else {
                $discount = rand(0,5000);
            }

            $comment = 'Тестовый комментарий';

            $fake_request = new \Illuminate\Http\Request();

            $products = [];
            $products_count = rand(1, 4);
            for($e = 0; $e < $products_count; $e++){
                $product = \App\Models\Article::inRandomOrder()->first();
                $products[$product->id]['id'] = $product->id;
                $products[$product->id]['count'] = rand(1, 22);
                $products[$product->id]['price'] = rand(1, 10000);
            }



            $fake_request['do_date'] = $date;
            $fake_request['partner_id'] = $partner->id;
            $fake_request['discount'] = $discount;
            $fake_request['inpercents'] = $inpercents;
            $fake_request['comment'] = $comment;
            $fake_request['products'] = $products;

            $shipmnetController->store($fake_request);

            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }
}
