<?php

use App\Models\Partner;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPartnerFieldType extends Migration
{
    public function up()
    {
        $partners = Partner::all();

        foreach ($partners as $partner) {
            $partner->update(['isfl' => $partner->isfl ? 0 : 2]);
        }

        Schema::table('partners', function (Blueprint $table) {
            $table->renameColumn('isfl', 'type');
        });
    }

    public function down()
    {
        $partners = Partner::all();

        foreach ($partners as $partner) {
            $partner->update(['type' => $partner->type ? 1 : 0]);
        }

        Schema::table('partners', function (Blueprint $table) {
            $table->renameColumn('type', 'isfl');
        });
    }
}
