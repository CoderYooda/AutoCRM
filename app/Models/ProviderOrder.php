<?php

namespace App\Models;

use App\Traits\HasManagerAndPartnerTrait;
use App\Traits\OwnedTrait;
use App\Traits\PayableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProviderOrder extends Model
{
    use OwnedTrait, SoftDeletes, HasManagerAndPartnerTrait, PayableTrait;

    protected $casts = [
        'created_at'  => 'date:d.m.Y H:i',
        'updated_at' => 'date:d.m.Y H:i'
    ];

    public $fields = [
        'partner_id',
        'manager_id',
        'company_id',
        'store_id',
        'do_date',
        'store_id',
        'summ',
        'discount',
        'nds',
        'nds_included',
        'inpercents',
        'comment',
        'created_at'
    ];

    protected $guarded = [];

    //protected $dateFormat = 'Y-m-d/H:i';

    public function freshWsumm(){
        //TODO Сложить сумму платежей в отдельное поле сущности (Оптимизация)
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'article_provider_orders', 'provider_order_id', 'product_id')
            ->withTrashed()
            ->withPivot('id', 'count', 'price', 'nds', 'nds_percent', 'nds_included', 'total');
    }

    public function getArticleCountByPivotId($id)
    {
        $product = $this->products()->wherePivot('id', $id)->first();

        return $product->pivot->count;
    }

    public function getArticleEnteredCountByPivotId($id)
    {
        return DB::table('article_entrance')->where('provider_pivot_id', $id)->sum('count');
    }

    public function productsJson()
    {
        return$this->belongsToMany(Product::class, 'article_provider_orders', 'provider_order_id', 'product_id')
            ->withPivot('count as count', 'price as price', 'nds as nds', 'nds_percent as nds_percent', 'nds_included as nds_included', 'total as total');
    }
    #Получить еще не оприходованные товары
    public function getNotEnteredProducts()
    {
        $products = $this->products;

        foreach($products as $key => $product){

            $count = $product->pivot->count - $this->getProductEntredCount($product->id);

            if($count){
                $product->pivot->count = $count;
            } else {
                unset($products[$key]);
            }
        }
        return $products;
    }

    public function getProductCount($product_id)
    {
        $product = $this->products()->where('product_id', $product_id)->first();
        return $product->pivot->count ?? 0;
    }

    public function productsCount()
    {
        $count = $this->products()->sum('count');
        return $count;
    }

    public function getPlanProductCount()
    {
        $count = $this->products()->sum('count');
        return (int)$count;
    }

    public function getEnteredProductCount()
    {
        $entered_count = 0;
        foreach($this->entrances->load('products') as $entrance) {
            foreach ($entrance->products as $product) {
                $entered_count += $product->pivot->count;
            }
        }

        return $entered_count;
    }


    public function updateIncomeStatus()
    {
        $plan = $this->getPlanProductCount();
        $fact = $this->getEnteredProductCount();

        $status = 0;

        if($fact && $fact < $plan){
            $status = 1;
        } else if($fact == $plan){
            $status = 2;
        } else if($fact > $plan){
            $status = 3;
        }

        $this->update(['incomes' => $status]);
    }

    public function entrances()
    {
        return $this->hasMany(Entrance::class, 'providerorder_id');
    }

    public function getProductEntredCount($product_id)
    {
        $summ = 0;
        foreach($this->entrances as $entrance){
            $summ += $entrance->products()->where('product_id', $product_id)->sum('count');
        }

        return $summ;
    }

    public function getWarrantPositive()
    {
        $minus = $this->warrants()->where('isIncoming', true)->sum('summ');
        $plus = $this->warrants()->where('isIncoming', false)->sum('summ');
        return $plus - $minus;
    }

    public function getProductPrice($product_id)
    {
        $product = $this->products()->where('product_id', $product_id)->first();
        return $product != null ? $product->pivot->price : 0;
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function normalizedData()
    {
        return $this->created_at->format('d.m.Y (H:i)');
    }

    public function outputName() //Вывод имени или наименования
    {
        return 'Заявка поставщику №' . $this->id;
    }

    public function getProductsCountById($id){
        $product = $this->products()->where('product_id', $id)->first();
        return $product ? $product->pivot->count : 0;
    }
}
