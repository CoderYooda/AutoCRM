<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DomainDnsRule implements Rule
{
    private $server_ip = null;

    public function __construct()
    {
        $this->server_ip = request()->server('SERVER_ADDR');
    }

    public function passes($attribute, $value)
    {
        if($this->server_ip == '127.0.0.1') return true;

        return gethostbyname($value) == $this->server_ip;
    }

    public function message()
    {
        return 'Доменное имя должно быть направлено на Наш IP адрес: ' . $this->server_ip;
    }
}
