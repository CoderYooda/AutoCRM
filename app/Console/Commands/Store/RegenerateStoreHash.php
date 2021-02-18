<?php

namespace App\Console\Commands\Store;

use App\Models\Partner;
use App\Models\System\StockOfProduct;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SystemMessageController as SM;
use SystemMessage;

class RegenerateStoreHash extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'store:generate:hash';

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
        $stores = \App\Models\Store::all();
        foreach ($stores as $store) {

            $store->generateHash();
            $store->save();
        }
        return 0;
    }
}
