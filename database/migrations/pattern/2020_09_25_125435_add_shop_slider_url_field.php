<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddShopSliderUrlField extends Migration
{
    public function up()
    {
        Schema::table('shop_images_slider', function (Blueprint $table) {
            $table->text('target_url');
        });
    }

    public function down()
    {
        Schema::table('shop_images_slider', function (Blueprint $table) {
            $table->dropColumn('target_url');
        });
    }
}
