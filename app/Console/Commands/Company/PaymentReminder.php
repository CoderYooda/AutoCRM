<?php

namespace App\Console\Commands\Company;

use App\Http\Controllers\SmsController;
use App\Models\Company;
use App\Models\Store;
use App\Models\System\StockOfProduct;
use App\Traits\OwnedTrait;
use Illuminate\Console\Command;
use SystemMessage;


class PaymentReminder extends Command
{
    use OwnedTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'company:checkRestOfDays';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Смс уведомление о том, что оканчивается оплата за тариф';

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

        $companies = Company::where('blocked','false')->get();


        /** @var Company $company */
        foreach ($companies as  $company) {

            $restDays = $company->getPayedDays();

            if ($restDays == 3 || $restDays == 1) {

                $phone = $company->getOwner()->phone;
                $text = $restDays == 3 ?
                    'Через 3 дня закончится срок действия тарифа в программе BBCRM. Для продолжения работы
                    пополните баланс.' :
                    'Внимание!!! Завтра закончится срок действия тарифа в программе BBCRM';

                SmsController::sendSMSAboutPayment($phone, $text);

            }

        }

    }

}
