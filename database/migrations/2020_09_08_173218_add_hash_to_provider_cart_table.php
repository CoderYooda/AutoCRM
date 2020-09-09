<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHashToProviderCartTable extends Migration
{
    public function up()
    {
        if(Schema::hasColumn('providers_cart', 'hash')) {
            Schema::table('providers_cart', function (Blueprint $table) {
                $table->dropColumn('hash');
            });
        }

        Schema::table('providers_cart', function (Blueprint $table) {
            $table->string('hash');
        });
    }

    public function down()
    {
        if(Schema::hasColumn('providers_cart', 'hash')) {
            Schema::table('providers_cart', function (Blueprint $table) {
                $table->dropColumn('hash');
            });
        }
    }
}
