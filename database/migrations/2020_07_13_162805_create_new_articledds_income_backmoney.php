<?php

use App\Models\DdsArticle;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewArticleddsIncomeBackmoney extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DdsArticle::create([
            'name' => 'Получение средств',
            'locked' => 1,
            'company_id' => null,
            'category_id' => 9,
            'dds_types_id' => 5,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DdsArticle::where([
            'name' => 'Получение средств',
            'category_id' => 9
        ])->delete();
    }
}
