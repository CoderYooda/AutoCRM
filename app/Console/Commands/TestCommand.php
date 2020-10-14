<?php

namespace App\Console\Commands;

use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:payEvotor';

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
        $warrant = Warrant::find(115);
        if($warrant->cashbox_id == 3){
            $warrant->payed_by = 'evotor';
            $warrant->payed_at = Carbon::now();
            $warrant->saveQuietly();
        }
    }
}
