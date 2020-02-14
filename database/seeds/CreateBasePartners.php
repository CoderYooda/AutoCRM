<?php

use Illuminate\Database\Seeder;
use App\Models\Partner;
use Symfony\Component\Console\Helper\ProgressBar;

class CreateBasePartners extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //self::fileLoad($this);
        $user = file_get_contents('public/demo/partners.json');
        $jsons = explode("end_json", $user);
        $this->command->getOutput()->progressStart(count($jsons));

        foreach($jsons as $i => $json){

            $user = json_decode($json, true);



            if($i < 40){
                Partner::create([
                    'isfl' => 1,
                    'category_id' => 5,
                    'fio' => $user['lname'] . ' ' . $user['fname'] . ' ' . $user['patronymic'],
                    'companyName' => '',
                    'basePhone' => '+7'.rand(1000000000, 9999999999),
                    'company_id' => 2,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                ]);
            } else {

            $fl = rand(0, 1);
            if(!$fl){
                $companyName = 'ИП ' . $user['lname'];
            } else {
                $companyName = null;
            }

            Partner::create([
                'isfl' => $fl,
                'category_id' => rand(6, 7),
                'fio' => $user['lname'] . ' ' . $user['fname'] . ' ' . $user['patronymic'],
                'companyName' => $companyName,
                'basePhone' => '+7'.rand(1000000000, 9999999999),
                'company_id' => 2,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
                ]);
            }
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }

    private static function fileLoad($command){
        $count = 20000;
        $command->command->getOutput()->progressStart($count);
        for($i = 1; $i < $count; $i++){
            try{
                $user = file_get_contents('https://randus.org/api.php');
                $user .= 'end_json';
                $command->command->getOutput()->progressAdvance();
                file_put_contents('public/demo/partners.json', $user.PHP_EOL, FILE_APPEND);
            }catch (Exception $e){
            }
        }

        $command->command->getOutput()->progressFinish();
    }
}
