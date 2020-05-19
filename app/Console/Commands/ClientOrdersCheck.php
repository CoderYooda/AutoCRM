<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use App\Models\ClientOrder;
use SystemMessage;

class ClientOrdersCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ClientOrders:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Проверка заказов клиентов';

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
        foreach(ClientOrder::getActiveOrders() as $clientOrder){
            $complited = true; // Состояние заказа
            foreach($clientOrder->articles as $article){
                if($article->getCountInStoreId($clientOrder->store_id) < $article->pivot->count ){
                    $complited = false;
                }
            }
            if($complited){
                $clientOrder->status = 'full';
                $clientOrder->save();
                SystemMessage::sendToCompany($clientOrder->company->id, 'success', 'Заказ № ' . $clientOrder->id . ' укомплектован и готов к выдаче', $clientOrder);
            }

        }
    }
}
