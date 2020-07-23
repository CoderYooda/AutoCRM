<?php

namespace App\Http\Controllers\Providers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use stdClass;

class TrinityController extends Controller
{

    /** @var string  */
    protected $userCode;
    protected $host = 'http://trinity-parts.ru/httpws/hs/';
    public    $error = '';

    public function __construct($userCode) {
        $this->userCode = $userCode;
        mb_internal_encoding('UTF8');
    }

    /**
     * @param array $params
     *
     * @return resource
     */
    protected function createParams(array $params = array()) {
        $data = new stdClass();
        $data->clientCode = $this->userCode;
        foreach ( $params as $name=>$param){
            $data->$name = $param;
        }
        return stream_context_create([
            'http' => [
                'header' => "Content-Type:application/json\r\n\User-Agent:Trinity/1.0",
                'method' => "POST",
                'content' => json_encode($data)
            ]
        ]);
    }

    /**
     * @param string   $url
     * @param resource $context
     * @param boolean $asArray
     *
     * @return array|mixed
     */
    protected function query($url, $context, $asArray = true){
        $this->error = '';
        $data = @file_get_contents($url, false, $context);
        if (!$data) {
            $this->error = (!$error = error_get_last()) ? 'Ошибка при получении данных' : $error['message'];
            return array();
        }
        return json_decode($data, $asArray);
    }

    /**
     * Получение списка брендов по артикулу
     * @link http://trinity-parts.ru/wiki/#search-code
     *
     * @param string  $article
     * @param bool    $online   Использовать данные онлайн поставщика
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function searchBrands($article, $online = true, $asArray = true) {
        $params = array(
            'searchCode' => $article,
            'online' => $online ? 'allow' : 'disallow'
        );
        $url = $this->host . 'search/byCode';
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получение списка товаров по артикулу и бренду
     * @link http://trinity-parts.ru/wiki/#search-brands
     *
     * @param string $article
     * @param string $brand
     * @param string $searchType full - включает онлайн результата, prices - без онлайн данный (склады + прайсы), onlyStock - только склады
     * @param bool $asArray Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function searchItems($article, $brand, $searchType = 'full', $asArray = true) {
        $article = strtoupper($article);
        $brand = strtoupper($brand);
        $searchParams = new stdClass();
        $searchParams->$article = $brand;
        $params = [
            'searchCode' => $searchParams,
            'onlyStock' => '0',
        ];
        switch ($searchType) {
            case 'onlyStock':
                $params['onlyStock'] = '1';
                break;
            case 'prices':
                $params['online'] = 'disallow';
                $params['analogs'] = [];
                break;
            case 'full':
                $params['online'] = 'allow';
                break;
        }
        $url = $this->host . 'search/byCodeBrand';
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получение списка товаров по артикулу и бренду (пакетная)
     * @link http://trinity-parts.ru/wiki/#search-brands
     *
     * @param array $searchItems
     * @param string $onlyStock если 1 - только наличие на складе
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function searchMassiveItems(array $searchItems, $onlyStock = '0', $asArray = true) {
        $searchParams = new stdClass();
        foreach ( $searchItems as $brand => $article ){
            $article = strtoupper($article);
            $brand = strtoupper($brand);
            $searchParams->$brand = $article;
        }
        $params = [
            'onlyStock' => $onlyStock,
            'searchCode' => $searchItems
        ];
        $url = $this->host . 'search/byCodeBrandBatch';
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получение списка возвратов
     * @link http://trinity-parts.ru/wiki/#claims
     *
     * @param string $dateFrom   фильтр по дате (начало)
     * @param string $dateTo     фильтр по дате (окончание)
     * @param int    $showOff    с какой записи (номер п/п)
     * @param int    $showNumber кол-во записей
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getClaimsList($dateFrom = '', $dateTo = '', $showOff = 1, $showNumber = 20, $asArray = true){
        $params = array(
            'showOff' => $showOff,
            'showNumber' => $showNumber
        );
        if (preg_match('#[\d{8}]#u', $dateFrom)){
            $params['dateFrom'] = $dateFrom;
        }
        if (preg_match('#[\d{8}]#u', $dateTo)){
            $params['dateTo'] = $dateTo;
        }
        $url = $this->host . 'balance/ClaimList';
        return $this->query($url, $this->createParams($params), $asArray);

    }

    /**
     * Получить список документов
     * @link http://trinity-parts.ru/wiki/#balance-docs
     *
     * @param string $dateFrom фильтр по дате (начало)
     * @param string $dateTo фильтр по дате (начало)
     * @param string $document
     * @param string $comment
     * @param integer $showNumber кол-во
     * @param integer $showOff с какой записи
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getDocuments($dateFrom = '', $dateTo = '', $document, $comment,$showNumber = 200, $showOff = 1, $asArray = true){
        $params = array(
            'filters' => new stdClass(),
            'showNumber' => $showNumber,
            'showOff' => $showOff
        );
        if ($dateFrom != ''){
            $params['filters']->dateFrom = $dateFrom;
        }

        if ($dateTo != '' && $dateFrom != ''){
            $params['filters']->dateTo = $dateTo;
        }

        if ($document != ''){
            $params['filters']->document = $document;
        }

        if ($comment != ''){
            $params['filters']->comment = $comment;
        }

        $url = $this->host . 'balance/getPayments';
        return $this->query($url, $this->createParams($params));
    }

    /**
     * Получить состав документа
     * @http://trinity-parts.ru/wiki/#balance-docs-info
     *
     * @param string $documentId
     * @param string $documentType
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getDocument($documentId, $documentType, $asArray = true){
        $params = array(
            'documentId' => $documentId,
            'documentType' => $documentType
        );
        $url = $this->host . 'balance/getDocument';
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получить возможные статусы заказов
     * @link http://trinity-parts.ru/wiki/#order-status
     *
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getOrderStatuses($asArray = true){
        $url = $this->host . 'siteInfo/getStatusList';
        return $this->query($url, $this->createParams(), $asArray);
    }

    /**
     * Уставить для заказов статус "Просмотрено"
     * @link http://trinity-parts.ru/wiki/#order-read
     *
     * @param array $ordersIds
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function setWatched(array $ordersIds, $asArray = true){
        $url = $this->host . 'siteInfo/setWatched';
        $params = array(
            'IDs' => $ordersIds
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получить список заказов
     * @link http://trinity-parts.ru/wiki/#order-list
     *
     * @param string $dateFrom
     * @param string $dateTo
     * @param string $countReturned
     * @param string $statusCode
     * @param integer $showNumber
     * @param integer $showOff
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getOrdersList($dateFrom = '', $dateTo = '', $statusCode = '', $countReturned = '', $showOff = 1, $showNumber = 200, $asArray = true){
        $url = $this->host . 'balance/orderList';
        $params = array(
            'filters' => new stdClass(),
            'showNumber' => $showNumber,
            'showOff' => $showOff,
            'showTotalNum' => 1,
        );
        if (preg_match('#[\d{4}-\d{2}-\d{2}]#u', $dateFrom)){
            $params['filters']->dateFrom = $dateFrom;
        }

        if (preg_match('#[\d{4}-\d{2}-\d{2}]#u', $dateTo)){
            $params['filters']->dateTo = $dateTo;
        }

        if ($statusCode != ''){
            $params['filters']->CodeOfStatus = $statusCode;
        }

        if ($countReturned != ''){
            $params['filters']->Qty_Returned = $countReturned;
        }

        $params['filters']->Watched = 'On';

        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * История товара в заказа
     * @link http://trinity-parts.ru/wiki/#order-history
     * @param array $itemsIDs
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getOrderHistory(array $itemsIDs, $asArray = true){
        $url = $this->host . 'getInfo/orderHistory';
        $params = array(
            'IDs' => $itemsIDs
        );
        return $this->query($url, $this->createParams($params),$asArray);
    }

    /**
     * Добавление товаров в корзину
     * @link http://trinity-parts.ru/wiki/#cart-add
     *
     * @param array $items
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function addToCart(array $items, $asArray = true){
        $url = $this->host . 'cart/saveGoods';
        $params = array(
            'parts' => $items
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получить список товаров в корзине
     * @link http://trinity-parts.ru/wiki/#cart-list
     *
     * @param bool $asArray Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getCart($asArray = true){
        $url = $this->host . 'cart/getCartGoods';
        return $this->query($url, $this->createParams(), $asArray);
    }

    /**
     * Заказать товары (оформить заказ)
     * @link http://trinity-parts.ru/wiki/#cart-to-order
     *
     * @param array $itemsIds
     * @param boolean $asArray
     *
     * @return array|mixed
     */
    public function sendToOrder(array $itemsIds, $asArray = true){
        $url = $this->host . 'cart/confirm';
        $params = array(
            'IDs' => $itemsIds
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Проверка актуальности товаров в корзине
     * @link http://trinity-parts.ru/wiki/#cart-check
     *
     * @param array $itemsIds
     * @param boolean $extended
     * @param boolean $asArray
     *
     * @return array|mixed
     */
    public function checkCart(array $itemsIds, $extended = false, $asArray = false){
        $url = $this->host . 'cart/checkBasketGoods';
        if ($extended){
            $url .= '?v=2';
        }
        $params = array(
            'IDs' => $itemsIds
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Удаление товаров из корзины
     * @link http://trinity-parts.ru/wiki/#cart-delete
     *
     * @param array $itemsIds
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function deleteFromCart(array $itemsIds, $asArray = true){
        $url = $this->host . 'cart/delGoods';
        $params = array(
            'IDs' => $itemsIds
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получение информации о поставщике
     * @link http://trinity-parts.ru/wiki/#supplier-info
     *
     * @param string $supplierId
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getSupplierInfo($supplierId, $asArray = true){
        $url = $this->host . 'getInfo/getDeliveryInfo';
        $params = array(
            'supplier_id' => $supplierId
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Получить статистику по поставщику
     * @link http://trinity-parts.ru/wiki/#supplier-statistics
     *
     * @param integer $supplierId
     * @param string  $n_file
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function getSupplierStatistics($supplierId, $n_file = '', $asArray = true){
        $url = $this->host . 'getInfo/showStatistics';
        $params = array(
            'supplier_id' => $supplierId,
        );
        if ($n_file != ''){
            $params['n_file'] = $n_file;
        }
        return $this->query($url, $this->createParams($params), $asArray);
    }

    /**
     * Отменить заказанный товар
     * @link http://trinity-parts.ru/wiki/#order-cancel
     *
     * @param array $orderItemIds
     * @param bool    $asArray  Ответ в ввиде массива
     *
     * @return array|mixed
     */
    public function cancelOrderItem(array $orderItemIds, $asArray = true){
        $url = $this->host . 'cart/cancelAnOrder';
        $params = array(
            'IDs' => $orderItemIds
        );
        return $this->query($url, $this->createParams($params), $asArray);
    }
}
