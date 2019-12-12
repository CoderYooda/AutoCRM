<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //DB::unprepared(file_get_contents('public/demo/articles.sql'));

        $fake_user = \App\Models\User::where('id', 2)->first();
        Auth::login($fake_user);

        $json = json_decode(file_get_contents('public/demo/articles.json'));

        $this->command->getOutput()->progressStart(count($json));

        $categories = \App\Models\Category::where('type', 'store')->pluck('id')->toArray();


        foreach($json as $index => $json_article){

            $article = new \App\Http\Controllers\ProductController();
            $fake_request = new \Illuminate\Http\Request();


            $fake_request['company_id'] = 2;
            $fake_request['category_id'] = $categories[(int)array_rand($categories, 1)];
            $fake_request['creator_id'] = 2;
            $fake_request['new_supplier_name'] = $json_article->brand;
            $fake_request['article'] = $json_article->article;
            $fake_request['name'] = $json_article->name;
            //$fake_request['midprice'] = floatval($json_article->price);
            try{
                $article->store($fake_request);
            } catch (Exception $e){
                echo "ошибка записи";
            }

            if($index > 500)
                break;
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }
}
