<?php

namespace App\Models\ICat;

//use Illuminate\Database\Eloquent\Model;

class ACat
{
    private $ApiKey;

    private $protocol = 'https';
    private $domain = 'acat.online/api/catalogs';
    private $count_repeat = 5;    //количество попыток достучаться до сервера если он не доступен

    function __construct($ApiKey) {
        $this->ApiKey = $ApiKey;
    }

    /**
     * Получение модификаций
     */
    public function getMarks()
    {
        $url = $this->protocol . '://' . $this->domain;
        $request = $this->Request($url);
        return $this->CheckReplyError($request, 'getMarks');
    }

    /**
     * Получение моделей
     */
    public function getModels($href)
    {
        $url = $this->protocol . '://' . $this->domain . $href;
        $request = $this->Request($url);
        return $this->CheckReplyError($request, 'getModels');
    }

    /**
     * Получение модификаций
     */
    public function getModificationsByModel($href)
    {
        $url = $this->protocol . '://' . $this->domain . $href;
        $request = $this->Request($url);
        return $this->CheckReplyError($request, 'getModifications');
    }

    private function Request($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);

        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: ' . $this->ApiKey));
        $body = curl_exec($ch);
        if ($body === FALSE) {
            $error = curl_error($ch);
        }
        else {
            $error = FALSE;
        }
        curl_close($ch);
        if ($error && $this->count_repeat > 0) {
            $this->count_repeat--;
            return $this->Request($url, null);
        }
        return $body;
    }

    private function CheckReplyError($res, $action) {

        if (!$res) {
            $temp = new \stdClass();
            $temp->status = "ERROR";
            $temp->status_code = "000";
            $temp->status_text = "Невозможно установить связь с сервером.";
            return $temp;
        }

        $result = json_decode($res);

        if (!$result) {
            $temp = new \stdClass();
            $temp->status = "ERROR";
            $temp->status_code = "000";
            $temp->status_text = "Невозможно установить связь с сервером.";
            return $temp;
        }

        return $result;
    }
}

