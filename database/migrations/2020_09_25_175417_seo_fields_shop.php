<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeoFieldsShop extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->text('seo_delivery_title')->nullable();
            $table->text('seo_delivery_desc')->nullable();
            $table->text('seo_warranty_title')->nullable();
            $table->text('seo_warranty_desc')->nullable();

            $table->text('seo_contacts_title')->nullable();
            $table->text('seo_contacts_desc')->nullable();
            $table->text('seo_about_title')->nullable();
            $table->text('seo_about_desc')->nullable();
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('seo_delivery_title');
            $table->dropColumn('seo_delivery_desc');
            $table->dropColumn('seo_warranty_title');
            $table->dropColumn('seo_warranty_desc');

            $table->dropColumn('seo_contacts_title');
            $table->dropColumn('seo_contacts_desc');
            $table->dropColumn('seo_about_title');
            $table->dropColumn('seo_about_desc');
        });
    }
}
