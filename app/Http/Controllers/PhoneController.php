<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use Illuminate\Http\Request;
use Auth;

class PhoneController extends Controller
{
    public static function upsertPhones($request)
    {
        $phones = collect();
        if($request['phones'] && count($request['phones']) > 0){
            foreach($request['phones'] as $r_phone){
                if($r_phone['number'] != NULL){
                    if(isset($r_phone['id'])){
                        $phone = Phone::where('id', $r_phone['id'])->first();
                    } else {
                        $phone = new Phone();
                    }
                    $phone->company_id = $request['company_id'];
                    $phone->number = str_replace(array('(', ')', ' ', '-'), '', $r_phone['number']);
                    if(isset($r_phone['main'])){$r_phone['main'] = true;} else {$r_phone['main'] = false;}
                    if(count($request['phones']) == 1){
                        $phone->main = true;
                    } else {
                        $phone->main = $r_phone['main'];
                    }
                    $phone->save();
                    $phones->add($phone);
                }
            }
        }

        return $phones;
    }

    public function removePhone($id)
    {
        $message = 'При удалении возникла ошибка';
        if($id != 'undefined'){
            $phone = Phone::where('id', (int)$id)->first();
            if($phone && self::userCanDeletePhone($phone)){
                $phone->delete();
                $message = 'Номер телефона удален';
                return response()->json(['phone_id' => $phone->id, 'message' => $message], 200);
            } else {
                $message = 'Номер не найден';
                return response()->json(['message' => $message], 422);
            }
        } else {
            return response()->json(['message' => $message], 422);
        }
    }

    public static function userCanDeletePhone($phone)
    {
        $user = Auth::user();
        if($phone->company_id == $user->company()->first()->id){
            return true;
        } else {
            return false;
        }
    }
}
