<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCurrentStoreIdToUsers extends Migration
{
    public function up()
    {
        $users = \App\Models\User::all();

//        foreach ($users as $user) {
//            $user->update(['current_store' => $user->company_id]);
//        }
    }

    public function down()
    {

    }
}
