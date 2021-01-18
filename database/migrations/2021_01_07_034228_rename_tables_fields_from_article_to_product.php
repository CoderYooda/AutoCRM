<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameTablesFieldsFromArticleToProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('article_adjustment', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
            $table->renameColumn('article_entrance_id', 'product_entrance_id');
        });

        Schema::table('article_client_orders', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('article_entrance', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('article_entrance_refund', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('article_provider_orders', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('article_refund', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('article_shipment', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('article_store', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });

        Schema::table('specifications', function (Blueprint $table) {
            $table->renameColumn('article_id', 'product_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('article_adjustment', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
            $table->renameColumn('product_entrance_id', 'article_entrance_id');
        });

        Schema::table('article_client_orders', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('article_entrance', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('article_entrance_refund', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('article_provider_orders', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('article_refund', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('article_shipment', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('article_store', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });

        Schema::table('specifications', function (Blueprint $table) {
            $table->renameColumn('product_id', 'article_id');
        });
    }
}
