<?php

namespace App\Console\Commands;

use App\Models\Partner;
use App\Models\System\StockOfProduct;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SystemMessageController as SM;
use SystemMessage;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:send_mess';

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
        //$stocks = StockOfProduct::latest()->first();
        $partner = Partner::whereId(2)->first();
        SystemMessage::sendToCompany(2, 'success', 'тестовый мессадж ', $partner,'App\Events\SystemMessage');
        //SM::sendToCompany(2, 'warning', 'На складе кончаются товары, нажмите чтобы посмотреть', $stocks, 'App\Events\SystemMessage');
    }
}
