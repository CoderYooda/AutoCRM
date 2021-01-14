<?php

namespace App\Models;

use App\Http\Controllers\ShipmentController;
use App\Http\Requests\ShipmentsRequest;
use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Support\Facades\DB;

class ClientOrder extends Model
{
    use OwnedTrait, PayableTrait, HasManagerAndPartnerTrait;

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'partner_id',
        'company_id',
        'do_date',
        'phone',
        'summ',
        'itogo',
        'discount',
        'inpercents',
        'comment',
        'status',
        'color',
        'created_at'
    ];

    protected $guarded = [];

    public function syncArticles($client_order_id, $pivot_array)
    {
        DB::table('article_client_orders')
            ->where('client_order_id', $client_order_id)
            ->delete();
        $relation = null;
        foreach($pivot_array as $pivot_data){
            $relation = DB::table('article_client_orders')->insert($pivot_data);
        }
        return $relation;
    }

    public function order()
    {
        return $this->hasOne(Order::class, 'clientorder_id', 'id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function data(){
        return $this->created_at->format('d.m H:i');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'article_client_orders', 'client_order_id', 'product_id')
            ->withPivot('id', 'count as count', 'shipped_count as shipped_count', 'price as price', 'total as total');
    }

    public static function getActiveOrders()
    {
        return self::where('status', '!=', 'complete')->where('status', '!=', 'canceled')->where('status', '!=', 'full')->get();
    }

    #Получить не отгруженные товары по заказу
    public function notShippedArticles()
    {
        return $this->products()->whereRaw('article_client_orders.shipped_count < article_client_orders.count');
    }

    #Получить доступные для отгрузки товары (кол-во)
    public function getAvailableToShippingProductsCount($product_id)
    {
        $product = $this->products()->wherePivot('product_id', $product_id)->first();
        return $product ? $product->count - $product->shipped_count : 0;
    }

    public function getProductPriceFromClientOrder($product_id)
    {
        $product = $this->products()->wherePivot('product_id', $product_id)->first();
        return $product->price;
    }

    public function getProductPriceFromClientOrderByPivotId($pivot_id)
    {
        $product = $this->products()->wherePivot('id', $pivot_id)->first();
        return $product->price;
    }

    public function getShippedProductsIds()
    {
        $products = $this->products()->wherePivot('shipped_count', '>', '0')->get();
        return $products ? $products->pluck('id') : [];
    }

    public function makeShipped()
    {
        $shipmentController = new ShipmentController();
        $request = new ShipmentsRequest();

        $products = [];

        foreach($this->products as $product) {
            $products[$product->id]['id'] = $product->id;

            if(isset($products[$product->id]['price'])) $products[$product->id]['price'] += $product->price;
            else $products[$product->id]['price'] = $product->price;

            if(isset($products[$product->id]['count'])) $products[$product->id]['count'] += $product->count;
            else $products[$product->id]['count'] = $product->count;

            if(isset($products[$product->id]['duplicates'])) $products[$product->id]['duplicates'] ++;
            else $products[$product->id]['duplicates'] = 1;
        }

        foreach ($products as $key => $product) {
            $products[$key]['price'] = $product['price'] / $product['duplicates'];
            unset($products[$key]['duplicates']);
        }

        $request['partner_id'] = $this->partner_id;
        $request['store_id'] = $this->store_id;
        $request['discount'] = $this->discount;
        $request['inpercents'] = $this->inpercents;
        $request['comment'] = '';
        $request['products'] = $products;
        $request['clientorder_id'] = $this->id;

        $response = $shipmentController->store($request);

        if(!$response->isOk() && $response->getData('messages') != null){
            $status = 422;
            $data = $response->getData('messages');
        }
        else {
            $status = 200;
            $data =  [
                'shipment_id' => $response->getData()->id,
                'type' => 'success',
                'message' => 'Отгружено'
            ];
        }

        return [
            'status' => $status,
            'data' => $data
        ];
    }

    public function IsAllProductsShipped()
    {
        foreach($this->products as $product){
           if($this->getShippedCount($product->id) < $product->count){
               return false;
           }
        }
    }

    public function IsAnyProductShipped()
    {
        foreach($this->products as $product){
            if($this->getShippedCount($product->id) > 0){
                return true;
            }
        }
        return false;
    }

    public function increaseShippedCount($product_id, $amount)
    {
        $count = $this->getShippedCount($product_id) + (int)$amount;
        $this->setShippedCount($product_id, $count);
    }

    public function setShiped(){
        $this->isShipped = true;
        $this->save();
    }

    public function decreaseShippedCount($product_id, $amount)
    {
        $count = $this->getShippedCount($product_id) - (int)$amount;
        $this->setShippedCount($product_id, $count);
    }

    public function setShippedCount($product_id, $count)
    {
        $this->products()->updateExistingPivot($product_id, array('shipped_count' => $count), false);
        return true;
    }

    public function getShippedCount($product_id)
    {
        $product = $this->products()->where('product_id', $product_id)->first();
        return $product ? $product->shipped_count : 0;
    }

    public function getShippedCountByPivotId($pivot_id)
    {
        $product = $this->products()->wherePivot('id', $pivot_id)->first();
        return $product ? $product->shipped_count : 0;
    }

    public function smsMessages()
    {
        return $this->belongsToMany('App\Models\SMSMessages', 's_m_s_message_client_order', 'client_order_id', 's_m_s_message_id')
            ->orderBy('created_at', 'DESC');
    }

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'clientorder_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function onlyData()
    {
        return $this->created_at->format('d.m.Y H:i');
    }

    public function freshWsumm(){
        //TODO Сложить сумму платежей в отдельное поле сущности (Оптимизация)
    }

    public function isFinished()
    {
        return $this->status == 'complete';
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', false)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', true)->sum('summ');
        return $plus - $minus;
    }
}
