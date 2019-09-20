<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MoneymoveSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->getOutput()->progressStart(300);

        for($i = 0; $i < 300; $i++){

            $in_cashbox = \App\Models\Cashbox::inRandomOrder()->first();
            $out_cashbox = \App\Models\Cashbox::where('id', '!=', $in_cashbox->id)->inRandomOrder()->first();

            $date = Carbon::now()->addDays(rand(-365, 0));

            $moneymove = new \App\Http\Controllers\MoneyMoveController();

            $fake_request = new \Illuminate\Http\Request();

            $fake_request['do_date'] = $date;
            $fake_request['created_at'] = $date;
            $fake_request['in_cashbox_id'] = $in_cashbox->id;
            $fake_request['out_cashbox_id'] = $out_cashbox->id;
            $fake_request['summ'] = rand(100, 100000);

            $moneymove->store($fake_request);


            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }
}
