<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDescFieldForServicesTable extends Migration
{
    public function up()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->text('desc');
        });

        foreach (\App\Models\Service::all() as $service) {
            $service->update(['desc' => 'test']);
        }
    }

    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('desc');
        });
    }
}
