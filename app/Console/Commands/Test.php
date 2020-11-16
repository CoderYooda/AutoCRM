<?php

namespace App\Console\Commands;

use App\Models\Partner;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\Article;

class Test extends Command
{
    protected $signature = 'command:test';

    protected $description = 'Command description';

    protected $host = 'http://id8341.public.api.abcp.ru/';

    protected $login = 'audi-31@yandex.ru';
    protected $password = 'i7r7o7n7';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
//        $orders = Partner::find(141)->user->getProvidersCartOrders;
//
//        $params = [
//            'orders' => $orders->pluck('number')->toArray()
//        ];
//
//        $result = $this->query('orders/list/', $params, 'GET');
//
//        dd($result);
        foreach (Article::all() as $product) {

            $productName = $product->name;

            $nameUsing = Article::where(['name' => $productName, 'company_id' => $product->company_id])
                ->where('id', '!=', $product->id)
                ->exists();

            if($nameUsing) $productName .= '-' . $product->id;

            $product->update(['slug' => Str::slug($productName)]);
        }
    }

    private function query($path, $params, $method): array
    {
        $params['userlogin'] = $this->login;
        $params['userpsw'] = md5($this->password);
        $params['locale'] = 'ru_RU';

        $full_path = $this->host . $path;

        if($method == 'GET') $full_path .= ('?' . http_build_query($params));

        $context = [
            'http' => [
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'method' => $method
            ],
        ];

        if($method == 'POST') {
            $context['http']['content'] = http_build_query($params);
        }

        try {
            $result = file_get_contents($full_path, null, stream_context_create($context));
        }
        catch (\Exception $exception)
        {
            dd($exception->getMessage());
        }

        $result = (array)json_decode($result, true);

        if(array_key_exists('errorCode', $result) && $result['errorMessage'] != 'No results') {
            throw_error('AvtoImport: Ошибка авторизации логина или пароля.');
        }

        return $result;
    }
}
