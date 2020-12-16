<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DomainDnsRule implements Rule
{
    private $server_ip;

    public function __construct()
    {
        $this->server_ip = request()->server('SERVER_ADDR');
    }

    public function passes($attribute, $value)
    {
        if($this->server_ip == '127.0.0.1') return true;

        if(str_contains_cyrillic($value)) {

            $json = file_get_contents('http://ip-api.com/json/' . idn_to_ascii($value) . '?lang=ru');
            $response = json_decode($json, TRUE);

            return $response['query'] == $this->server_ip;
        }

        return gethostbyname($value) == $this->server_ip;
    }

    public function message()
    {
        return 'Доменное имя должно быть направлено на Наш IP адрес: ' . $this->server_ip;
    }
}
