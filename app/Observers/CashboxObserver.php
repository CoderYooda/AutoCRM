<?php

namespace App\Observers;

use App\Models\Cashbox;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CashboxObserver
{
    public function created(Cashbox $cashbox)
    {
        $this->updateOrCreate($cashbox);
    }

    public function updated(Cashbox $cashbox)
    {
        $this->updateOrCreate($cashbox);
    }

    public function saved(Cashbox $cashbox)
    {
        $this->updateOrCreate($cashbox);
    }

    public function updateOrCreate(Cashbox $cashbox)
    {
        DB::table('cashbox_history')->updateOrInsert(
            [
                'cashbox_id' => $cashbox->id,
                'company_id' => $cashbox->company_id,
                'date' => Carbon::now()->timestamp
            ],
            [
                'balance' => $cashbox->balance
            ]
        );
    }
}
