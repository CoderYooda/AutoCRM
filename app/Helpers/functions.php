<?php

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