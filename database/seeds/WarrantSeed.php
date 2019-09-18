<?php

use Illuminate\Database\Seeder;
use App\Models\Warrant;
use Carbon\Carbon;

class WarrantSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->command->getOutput()->progressStart(500);

        for($i = 0; $i < 500; $i++){

            $year = rand(20018, 2019);
            $month = rand(1, 12);
            $day = rand(1, 28);
            $hour = rand(1, 24);
            $minute = rand(1, 60);

            $date = Carbon::now()->addDays(rand(-365, 0));

            $warrant = new \App\Http\Controllers\WarrantController();

            $fake_request = new \Illuminate\Http\Request();

            $fake_request['do_date'] = $date;
            $fake_request['created_at'] = $date;
            $fake_request['cashbox_id'] = rand(1, 2);
            $fake_request['partner_id'] = rand(1, 1000);
            $fake_request['ddsarticle_id'] = rand(1, 3);
            $fake_request['company_id'] = 1;
            $fake_request['summ'] = rand(100, 100000);
            $fake_request['isIncoming'] = rand(0, 1);

            $warrant->store($fake_request);


            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();




    }
}
