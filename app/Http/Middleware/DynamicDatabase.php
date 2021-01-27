<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DynamicDatabase
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        dd($user->account->db_connection);
        if(NULL === config()->get('database.connections.' . $user->account->db_connection)){
            config()->set('database.connections.company', [
                'driver'    => $user->account->db_driver,
                'host'      => $user->account->db_host,
                'port'      => $user->account->db_port,
                'database'  => $user->account->db_name,
                'username'  => $user->account->db_user,
                'password'  => $user->account->db_password,
                'charset'   => 'utf8',
                'collation' => 'utf8_unicode_ci',
                'prefix'    => '',
                'strict'    => false
            ]);
        }

        DB::purge('mysql');
        DB::reconnect('mysql');
        return $next($request);
    }
}
