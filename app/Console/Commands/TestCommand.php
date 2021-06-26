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
use Sendpulse\RestApi\ApiClient;
use Sendpulse\RestApi\Storage\FileStorage;

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

    public function handle()
    {

        $SPApiClient = new ApiClient('d7005dfb68d1408e38b7695e3e005160', '352115c3e7555547480f755603892ebb', new FileStorage());

        $email = array(
            'html' => '<p>Hello!</p>',
            'text' => 'Hello!',
            'subject' => 'Письмо',
            'from' => array(
                'name' => 'Информация BBCRM',
                'email' => 'info@bbcrm.ru',
            ),
            'to' => array(
                array(
                    'name' => 'Сергей Сенаторов',
                    'email' => 'CoderYooda@gmail.com',
                ),
            ),
//            'bcc' => array(
//                array(
//                    'name' => 'Менеджер',
//                    'email' => 'support@bbcrm.ru',
//                ),
//            ),
//            'attachments' => array(
//                'file.txt' => file_get_contents(PATH_TO_ATTACH_FILE),
//            ),
        );
        var_dump($SPApiClient->smtpSendMail($email));

        //$stocks = StockOfProduct::latest()->first();
//        $partner = Partner::whereId(2)->first();
//        SystemMessage::sendToCompany(2, 'success', 'тестовый мессадж ', $partner,'App\Events\SystemMessage');
        //SM::sendToCompany(2, 'warning', 'На складе кончаются товары, нажмите чтобы посмотреть', $stocks, 'App\Events\SystemMessage');
    }
}
