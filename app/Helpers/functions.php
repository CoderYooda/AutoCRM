<?php

if(!function_exists('get_template')) {
    function get_template($template = 'default')
    {
        if($template == 'default') $template = env('DEFAULT_THEME', 'classic');

        return $template;
    }
}