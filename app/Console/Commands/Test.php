<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\AnalogController;
use App\Http\Controllers\API\DecoderController;
use App\Models\Shipment;
use App\Models\User;
use App\Models\Warrant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\SystemMessage as SM;
use App\Events\SystemMessage;

class Test extends Command
{
    protected $signature = 'command:test';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $ids = [1, 2, 3, 4, 5];

        $user = User::with('partner', 'company', 'partner.store')->find(2);

        $history = DB::table('import_history')->insert([
            'partner_id' => $user->partner->id,
            'company_id' => $user->company->id,
            'store_id' => $user->partner->store->id,
            'list' => implode(',', $ids)
        ]);

        dd($user, $history);
    }
}
