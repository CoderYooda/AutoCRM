<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddShopPriceSourceField extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->unsignedBigInteger('price_id')->nullable();
        });

        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('supplier_percent');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('markup');
        });

        $prices = \App\Models\Price::all();

        foreach (\App\Models\Shop::all() as $shop) {

            $price = $prices->where('company_id', $shop->company_id)->first();

            $shop->update(['price_id' => $price->id]);
        }
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('price_id');
        });

        Schema::table('shops', function (Blueprint $table) {
            $table->decimal('supplier_percent', 12, 2);
        });
    }
}
