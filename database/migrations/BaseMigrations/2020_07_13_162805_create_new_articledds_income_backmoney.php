<?php

use App\Models\DdsArticle;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewArticleddsIncomeBackmoney extends Migration
{
    public function up()
    {
        DdsArticle::create([
            'id' => 8,
            'name' => 'Получение средств',
            'locked' => 1,
            'company_id' => null,
            'category_id' => 9,
            'dds_types_id' => 5,
        ]);
    }

    public function down()
    {
        DdsArticle::where([
            'name' => 'Получение средств',
            'category_id' => 9
        ])->delete();
    }
}
