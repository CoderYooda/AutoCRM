<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;

class SystemMessage extends Model
{
    protected $table = 'system_message';

    public $guarded = [];

    public $fields = [
        'user_id',
        'reciever_id',
        'type',
        'kind_id',
        'kind',
        'link',
        'hash',
        'viewed',
        'message',
        'channel'
    ];

    public static function owned(){
        $user_id = Auth::user()->id;
        return self::where('reciever_id', $user_id);
    }

    public static function getMessages($request)
    {

        $size = 50;
        if (isset($request['size'])) {
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if (isset($request['sorters'])) {
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }
        if ($field === null && $dir === null) {
            $field = 'created_at';
            $dir = 'DESC';
        }

        if ($request['provider'] == null) {
            $request['provider'] = [];
        }

        if ($request['accountable'] == null) {
            $request['accountable'] = [];
        }

        $messages = self::owned()
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->when($request['user_id'] != null, function($query) use ($request) {
                $query->where('reciever_id', $request['user_id']);
            })
            ->orderBy($field, $dir)
            //->toSql();

            //dd($partners);
            ->limit($size)
            ->get();

        return $messages;
    }


}
