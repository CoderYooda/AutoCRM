<?php

namespace App\Rules\Import;

use Illuminate\Contracts\Validation\Rule;

class EncodeRule implements Rule
{
    public function passes($attribute, $value)
    {
        if (($handle = fopen($value, 'r')) !== FALSE) {
            $row = fgetcsv($handle, 1000, ';');
            $str = implode("", $row);
            $encoding = mb_detect_encoding($str, 'UTF-8, ISO-8859-1, WINDOWS-1252, WINDOWS-1251' , true);
            return $encoding == 'UTF-8';
        }

        return false;
    }

    public function message()
    {
        return 'Поддерживается только UTF-8 кодировка.';
    }
}
