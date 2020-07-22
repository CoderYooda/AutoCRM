<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDefaultServices extends Migration
{
    public function up()
    {
        $providers = [
            'Тринити',
            'Автоимпорт',
            'Exist',
            'ArmTek',
            'АвтоМаркет',
            'Mikado'
        ];

        $images = [
            'trinity',
            'avtoimport',
            'exist',
            'armtek',
            'avtomarket',
            'mikado'
        ];

        for($i = 0; $i < count($providers); $i++) {
            DB::table('services')->insert([
                'category_id' => 0,
                'name' => $providers[$i],
                'img' => $images[$i] . '.jpg'
            ]);
        }

    }

    public function down()
    {
        DB::table('services')->delete();
    }
}
