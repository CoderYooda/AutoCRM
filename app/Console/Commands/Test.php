<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:test';

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
        $vin = "1FMCU9G97EUE42764";
        $secureKey = "************";

        $requestURL = "http://www.vindecoderz.com/service/'.$vin.'/'.$secureKey";

        $data = file_get_contents(requestURL, false);
        $response = json_decode($data);

        var_dump($response);
    }
}
