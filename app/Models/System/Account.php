<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class Account extends Model
{
    protected $table = 'accounts';
    protected $guarded = [];

    protected $connection = 'mysql';

    public $name;

    public function generate()
    {
        DB::connection('mysql')->statement("DROP DATABASE IF EXISTS " . $this->db_name);
        DB::connection('mysql')->statement("CREATE DATABASE " . $this->db_name);


        if(NULL === config()->get('database.connections.' . $this->db_connection)){
            config()->set('database.connections.' .  $this->db_connection, [
                'driver'    => $this->db_driver ?? 'mysql',
                'host'      => $this->db_host ?? '127.0.0.1',
                'port'      => $this->db_port ?? '3306',
                'database'  => $this->db_name,
                'username'  => $this->db_user,
                'password'  => $this->db_password,
                'charset'   => 'utf8',
                'collation' => 'utf8_unicode_ci',
                'prefix'    => '',
                'strict'    => true,
                'engine' => null,
                'options' => extension_loaded('pdo_mysql') ? array_filter([
                    \PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
                ]) : [],
            ]);
        }

//        DB::purge($this->db_connection);
//        DB::reconnect($this->db_connection);
        //dd(Config::get)
        Artisan::call('migrate --database=' . $this->db_name . ' --path=database/migrations/pattern');





//        DB::purge($connection);
//        DB::reconnect($connection);
//
//
//
//        DB::purge('mysql');
//        DB::reconnect('mysql');
    }
}
