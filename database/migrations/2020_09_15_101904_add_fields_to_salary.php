<?php

use App\Models\SalarySchema;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToSalary extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        SalarySchema::truncate();

        Schema::table('salary_schemas', function (Blueprint $table) {
            $table->text('name')->nullable();
            $table->boolean('isInPercent')->default(false);
            $table->boolean('ishm')->default(0)->comment('Является ли почасовой');
            $table->text('comment')->nullable()->comment('Коментарий');
        });

        Schema::table('salary_schemas_partner', function (Blueprint $table) {
            $table->integer('h_m_value')->default(40)->comment('Часов в неделю');
            $table->text('comment')->nullable()->comment('Коментарий');
        });

        if (Schema::hasColumn('salary_schemas_partner', 'id')) {
            Schema::table('salary_schemas_partner', function (Blueprint $table) {
                $table->dropColumn('id');
            });
        }

        SalarySchema::create(['isPositive' => true, 'template' => 'oklad', 'name' => 'Оклад', 'isInPercent' => false, 'ishm' => true, 'comment' => 'Стандартный оклад']);
        SalarySchema::create(['isPositive' => true, 'template' => 'percent', 'name' => 'Начисление', 'isInPercent' => false, 'ishm' => false, 'comment' => 'Начисление в процентном соотношении']);
        SalarySchema::create(['isPositive' => false, 'template' => 'percent', 'name' => 'Списание', 'isInPercent' => false, 'ishm' => false, 'comment' => 'Фиксированная сумма списания']);
        SalarySchema::create(['isPositive' => true, 'template' => 'percent', 'name' => 'Начисление', 'isInPercent' => true, 'ishm' => false, 'comment' => 'Фиксированная сумма начисления']);
        SalarySchema::create(['isPositive' => false, 'template' => 'percent', 'name' => 'Списание', 'isInPercent' => true, 'ishm' => false, 'comment' => 'Списание в процентном соотношении']);
        SalarySchema::create(['isPositive' => true, 'template' => 'percent', 'name' => 'Начисление', 'isInPercent' => true, 'ishm' => false, 'comment' => 'Процент с продаж']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('salary_schemas', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('isInPercent');
            $table->dropColumn('ishm');
            $table->dropColumn('comment');
        });
        Schema::table('salary_schemas_partner', function (Blueprint $table) {
            $table->dropColumn('h_m_value');
            $table->dropColumn('comment');
        });
    }
}
