<?php

use App\Models\System\Account;
use Illuminate\Http\Exceptions\HttpResponseException;
use Milon\Barcode\DNS1D;

if(!function_exists('num_word')) {
    function num_word($value, $words, $show = true)
    {
        $num = $value % 100;
        if ($num > 19) {
            $num = $num % 10;
        }

        $out = ($show) ?  $value . ' ' : '';
        switch ($num) {
            case 1:  $out .= $words[0]; break;
            case 2:
            case 3:
            case 4:  $out .= $words[1]; break;
            default: $out .= $words[2]; break;
        }

        return $out;
    }
}

if(!function_exists('display_phone')) {
    function display_phone($phone) {

        $parts = sscanf($phone,'%1c%3c%3c%2c%2c');

        return '+' . $parts[0] . '(' . $parts[1] . ')' . $parts[2] . '-' . $parts[3] . '-' . $parts[4];
    }
}

if(!function_exists('clear_phone_number')) {
    function clear_phone_number($number) {
        return str_replace(['(', ')', ' ', '-', '+'], '', $number);
    }
}

if(!function_exists('domain_info')) {
    function domain_info($host) {
        $host = strtolower(trim($host));
        $host = ltrim(str_replace("http://","",str_replace("https://","",$host)),"www.");
        $count = substr_count($host, '.');
        if($count === 2){
            if(strlen(explode('.', $host)[1]) > 3) $host = explode('.', $host, 2)[1];
        } else if($count > 2){
            $host = getDomainOnly(explode('.', $host, 2)[1]);
        }
        $host = explode('/',$host);
        return $host[0];
    }
}

if(!function_exists('search_formatter'))
{
    function search_formatter($search)
    {
        $chars = ["-","!","?",".",""," "];
        return mb_strtolower(str_replace($chars, '', $search));
    }
}

if(!function_exists('mb_ucfirst'))
{
    function mb_ucfirst($string, $enc = 'UTF-8')
    {
        return mb_strtoupper(mb_substr($string, 0, 1, $enc), $enc) .
            mb_substr($string, 1, mb_strlen($string, $enc), $enc);
    }
}

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

if(!function_exists('throw_error')) {
    function throw_error($message) {
        exception(422, [
            'message' => $message,
            'type' => 'error'
        ]);
    }
}

if(!function_exists('throw_validator_exception')) {
    function throw_validator_exception($errors) {
        exception(422, [
            'messages' => $errors
        ]);
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

if(!function_exists('correct_price')) {
    function correct_price($price, $desc = false) {

        $string = number_format((float)$price, 2, '.', ' ');

        if($desc) {
            $string .= ' ' . num_word($price, ['рубль', 'рубля', 'рублей'], false);
        }

        return $string;
    }
}

if(!function_exists('decimal_price')) {
    function decimal_price($price) {
        return number_format((float)$price, 2, '.', '');
    }
}

if(!function_exists('sum_percent')) {
    function sum_percent($sum, $percent) {
        return $sum / 100 * $percent;
    }
}

if(!function_exists('sum_cents')) {
    function sum_cents($price) {
        return explode('.', $price)[1] ?? 0;
    }
}

if(!function_exists('getBarcodePNG')) {
    function getBarcodePNG($code)
    {
        return DNS1D::getBarcodePNG($code, "C39");
    }
}

if(!function_exists('getBarcodeSVG')) {
    function getBarcodeSVG($code)
    {
        return DNS1D::getBarcodeSVG($code, "C39");
    }
}

if(!function_exists('phone_format')) {
    function phone_format($sPhone)
    {
        $sPhone = preg_replace("![^0-9]+!", '', $sPhone);
        if (strlen($sPhone) != 11) return (false);
        $sCountry = substr($sPhone, 0, 1);
        $sArea = substr($sPhone, 1, 3);
        $sPrefix = substr($sPhone, 4, 3);
        $sNumber = substr($sPhone, 7, 2);
        $sNumber2 = substr($sPhone, 9, 2);

        if ($sCountry != 8) {
            $sCountry = '+' . $sCountry;
        }
        $sPhone = $sCountry . "(" . $sArea . ")" . $sPrefix . "-" . $sNumber . "-" . $sNumber2;
        return ($sPhone);
    }
}

if(!function_exists('num2str')) {
    /**
     * $type 0 - с копейками
     * $type 1 - без копеек
     * $type 2 - только копейки
     * @param $num
     * @param int $type
     * @return string
     */

    function num2str($num, $type = 0)
    {
        $nul = 'ноль';
        $ten = array(
            array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'),
            array('', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'),
        );
        $a20 = array('десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
        $tens = array(2 => 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
        $hundred = array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
        $unit = array( // Units
            array('копейка', 'копейки', 'копеек', 1),
            array('рубль', 'рубля', 'рублей', 0),
            array('тысяча', 'тысячи', 'тысяч', 1),
            array('миллион', 'миллиона', 'миллионов', 0),
            array('миллиард', 'милиарда', 'миллиардов', 0),
        );
        //

        list($rub, $kop) = explode('.', sprintf("%015.2f", floatval($num)));
        $out = array();
        if (intval($rub) > 0) {
            foreach (str_split($rub, 3) as $uk => $v) { // by 3 symbols
                if (!intval($v)) continue;
                $uk = sizeof($unit) - $uk - 1; // unit key
                $gender = $unit[$uk][3];
                list($i1, $i2, $i3) = array_map('intval', str_split($v, 1));
                // mega-logic
                $out[] = $hundred[$i1]; # 1xx-9xx
                if ($i2 > 1) $out[] = $tens[$i2] . ' ' . $ten[$gender][$i3]; # 20-99
                else $out[] = $i2 > 0 ? $a20[$i3] : $ten[$gender][$i3]; # 10-19 | 1-9
                // units without rub & kop
                if ($uk > 1) $out[] = morph($v, $unit[$uk][0], $unit[$uk][1], $unit[$uk][2]);
            } //foreach
        } else $out[] = $nul;
        if($type != 2) $out[] = morph(intval($rub), $unit[1][0], $unit[1][1], $unit[1][2]); // rub
        if($type == 2 || $type == 0) $out[] = $kop . ' ' . morph($kop, $unit[0][0], $unit[0][1], $unit[0][2]); // kop

        return trim(preg_replace('/ {2,}/', ' ', join(' ', $out)));
    }
}

function morph($n, $f1, $f2, $f5) {
    $n = abs(intval($n)) % 100;
    if ($n>10 && $n<20) return $f5;
    $n = $n % 10;
    if ($n>1 && $n<5) return $f2;
    if ($n==1) return $f1;
    return $f5;
}
