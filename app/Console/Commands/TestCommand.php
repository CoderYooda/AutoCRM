<?php

namespace App\Console\Commands;

use App\Models\System\StockOfProduct;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SystemMessageController as SM;

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
        $stocks = StockOfProduct::latest()->first();

        SM::sendToCompany(2, 'warning', 'На складе кончаются товары, нажмите чтобы посмотреть', $stocks, 'App\Events\CompaniesStocksOfProduct');
    }
}
