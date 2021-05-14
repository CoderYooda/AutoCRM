<?php

namespace App\Console\Commands;

use App\Models\iCat\CatMark;
use App\Models\iCat\CatModel;
use Illuminate\Console\Command;
use GuzzleHttp\Client as HttpClient;
use Symfony\Component\DomCrawler\Crawler;

use App\Models\iCat\CatType;

class DDosAparts extends Command
{
    protected $signature = 'ddos:start';
    protected $description = 'Command description';

    private $parse_types = false;
    private $parse_models = false;
    private $parse_marks = false;
    private $parse_modif = true;

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $baseurl = "https://api.acat.online/";



        $client = new HttpClient();

        if($this->parse_types){
            $response = $client->request('GET', $baseurl, []);
            $html = $response->getBody()->getContents();

            $types = [];

            $crawler = new Crawler($html);

            $crawler->filter('.main_catalog--types')->first()->children()->each(function ($tr, $i) use (&$types) {
                $type = $tr->attr('data-type');
                $title = $tr->filter('span')->first()->text();
                $types[$type]['name'] = $title;
                CatType::updateOrCreate(['slug' => $type, 'name' => $title]);
            });
        }

        if($this->parse_models) {
            $cattypes = CatType::all();

            $crawler->filter('.main_catalog--marks_all')->first()->children()->each(function ($tr, $i) use (&$types, $cattypes) {
                $tr->filter('.marks-inline')->children()->each(function ($tr, $i) use (&$types, $cattypes) {

                    $href = $tr->attr('href');
                    $type = explode('/', $href)[0];
                    $name = $tr->filter('.main_catalog--mark_name')->first()->html();
                    $img = $tr->filter('img')->first()->attr('src');

                    $types[$type]['children'][] = [
                        'image' => $img,
                        'href' => $href,
                        'name' => preg_replace('|\s+|', ' ', trim($name)),
                    ];

                    CatMark::updateOrCreate([
                        'image_url' => $img,
                        'name' => preg_replace('|\s+|', ' ', trim($name)),
                        'href' => $href,
                        'type_id' => $cattypes->where('slug', $type)->first()->id,
                    ]);
                });
            });
        }
        if($this->parse_marks) {
            $catmarks = CatMark::all();

            foreach($catmarks as $mark){

                try{
                    $response = $client->request('GET', $baseurl . $mark->href, []);
                } catch (\Exception $e){
                    var_dump(404);
                }

                if($response->getStatusCode() === 200){
                    $html = $response->getBody()->getContents();

                    $crawler = new Crawler($html);

                    $crawler->filter('body > a')->each(function ($tr, $i) use ($mark) {

                        $img = $tr->filter('img')->first()->attr('src');
                        $href = $tr->attr('href');

                        $name_elem = $tr->filter('.catalog--mark_name')->first();
                        $name = count($name_elem) ? $name_elem->html() : '';

                        $relevance_elem = $tr->filter('.catalog--mark_relevance')->first();
                        $relevance = count($relevance_elem) ? $relevance_elem->html() : '';

                        $modif_elem = $tr->filter('.catalog--mark_modif')->first();
                        $modif = count($modif_elem) ? $modif_elem->html() : '';

                        CatModel::updateOrCreate([
                            'type_id' => $mark->type_id,
                            'mark_id' => $mark->id,
                            'image_url' => $img,
                            'href' => $href,
                            'name' => $name,
                            'relevance' => $relevance,
                            'modif' => $modif,
                        ]);
                    });
                }
            }
        }
        if($this->parse_modif) {
            $catmodels = CatModel::all();

            foreach($catmodels as $model){
                $exploded = explode('/', $model->href);
                $url_lats = end($exploded);

                $url = $model->mark()->first()->href . '/' . $url_lats;
//                $response = $client->request('GET', $baseurl . $model->href, []);
//                dd($response->getStatusCode());
//                dd( $baseurl . $model->href);
                try{
                    $response = $client->request('GET', $baseurl . $url, []);

                    if($response->getStatusCode() === 200){
                        $html = $response->getBody()->getContents();
                        $crawler = new Crawler($html);

                        $crawler->filter('.table.active')->each(function ($tr, $i) use ($model) {

                            dd($tr);
                        });
                        var_dump('Нет модификаций');
                    }
                } catch (\Exception $e){
                    var_dump(404);
                }

            }
        }


//        dd($types);
    }
}
