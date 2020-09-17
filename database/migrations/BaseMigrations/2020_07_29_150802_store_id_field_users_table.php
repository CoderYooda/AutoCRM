<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StoreIdFieldUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('current_store');
        });

        $users = \App\Models\User::with('partner')->get();

        foreach ($users as $user) {

            $user->update(['current_store' => $user->partner->store_id]);
        }
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('current_store');
        });
    }
}
