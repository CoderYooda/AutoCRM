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
        $clientOrders = ClientOrder::where('status', '!=', 'complete')->where('status', '!=', 'canceled')->where('status', '!=', 'full')->get();
        foreach($clientOrders as $clientOrder){
            $articles = $clientOrder->articles()->get();
            $complited = true; // Состояние заказа
            foreach($articles as $article){
                //echo $article->name . ' - ' .$article->pivot->count;
                //echo $article->getCountInStoreId($clientOrder->store_id);
                if($article->getCountInStoreId($clientOrder->store_id) < $article->pivot->count ){
                    $complited = false;
                }
            }
            if($complited){
                $clientOrder->status = 'full';
                $clientOrder->save();
                SystemMessage::sendToCompany(2, 'success', 'Заказ № ' . $clientOrder->id . ' сменил статус на "Укомплектован"', $clientOrder);
            }

        }
    }
}
