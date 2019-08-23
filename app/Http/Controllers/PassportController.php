<?php

namespace App\Http\Controllers;

use App\Models\Passport;
use Illuminate\Http\Request;

class PassportController extends Controller
{
    public static function upsertPassport($request, $partner)
    {
        if(isset($request['passport_id'])){
            $passport = Passport::where('id', $request['passport_id'])->first();
        } else {
            $passport = new Passport();
        }
        $passport->partner_id = $partner->id;
        $passport->number = $request['number'];
        $passport->issued_by = $request['issued_by'];
        $passport->issued_date = $request['issued_date'];
        $passport->issued_place = $request['issued_place'];
        $passport->save();

        return $passport;
    }
}
