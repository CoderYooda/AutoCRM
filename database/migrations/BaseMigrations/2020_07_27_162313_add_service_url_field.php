<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddServiceUrlField extends Migration
{
    public function up()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('url');
        });

        $urls = [
            'http://www.trinity-parts.ru/',
            'https://aipart.ru/',
            'https://exist.ru/',
            'https://armtek.ru/',
            'http://www.avtomarket.com/',
            'https://mikado-parts.ru/'
        ];

        foreach ($urls as $key => $url) {
            \App\Models\Service::find($key + 1)->update(['url' => $url]);
        }
    }

    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('url');
        });
    }
}
