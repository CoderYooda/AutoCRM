<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestCommand extends Command
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
        $milliseconds = 2000;

        $half = 1000;

        $lamp = true;

        do {
            $milliseconds--;

            if($milliseconds == $half) {
                $half = $milliseconds / 2;

                $lamp = !$lamp;

                $this->info('MILLISECONDS: ' . $milliseconds . ', LAMP: ' . ($lamp ? 'on' : 'off'));
            }
        }
        while($milliseconds > 0);

        $this->info('answer: ' . ($lamp ? 'on' : 'off'));
    }
}
