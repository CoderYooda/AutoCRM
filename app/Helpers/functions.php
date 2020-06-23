<?php

use Illuminate\Http\Exceptions\HttpResponseException;

if(!function_exists('get_template')) {
    function get_template($template = 'default')
    {
        if($template == 'default') $template = env('DEFAULT_THEME', 'classic');

        return $template;
    }
}

if(!function_exists('isDate')) {
    function isDate($string)
    {
        return is_numeric(strtotime($string));
    }
}

if(!function_exists('exception')) {
    function exception(int $status, array $attributes = [])
    {
        throw new HttpResponseException(
            response()->json($attributes, 422)
        );
    }
}

if(!function_exists('convertPHPSizeToBytes')) {
    function convertPHPSizeToBytes($sSize)
    {
        $sSuffix = strtoupper(substr($sSize, -1));
        if (!in_array($sSuffix,array('P','T','G','M','K'))){
            return (int)$sSize;
        }
        $iValue = substr($sSize, 0, -1);
        switch ($sSuffix) {
            case 'T':
            case 'G':
            case 'M':
            case 'K':
            case 'P':
                $iValue *= 1024;
                break;
        }
        return (int)$iValue;
    }
}
