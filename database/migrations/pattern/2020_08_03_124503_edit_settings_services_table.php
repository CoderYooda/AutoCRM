<?php

use App\Models\Service;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditSettingsServicesTable extends Migration
{
    public function up()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('key');
        });

        $services = [
            'Тринити' => 'trinity',
            'Автоимпорт' => 'avtoimport',
            'ArmTek' => 'armtek',
        ];

        foreach ($services as $name => $key) {
            Service::where('name', $name)->update(['key' => $key]);
        }
    }

    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('key');
        });
    }
}
