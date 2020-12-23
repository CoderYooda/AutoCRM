<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductPriceSource extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedBigInteger('price_id');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('markup');
            $table->dropColumn('markup_source');
        });

        $companies = \App\Models\Company::all();

        $params = [
            'from' => 0,
            'to' => 1000,
            'percent' => 30
        ];

        foreach ($companies as $company) {
            $price = \App\Models\Price::create([
                'company_id' => $company->id,
                'name' => 'Розничная'
            ]);

            $price->types()->create($params);

            \App\Models\Article::where('company_id', $company->id)->update(['price_id' => $price->id]);
        }
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('price_id');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->decimal('markup', 12, 2);
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->decimal('markup', 12, 2);
            $table->string('markup_source')->default('global');
        });
    }
}
