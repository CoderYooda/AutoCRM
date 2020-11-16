<?php

namespace App\Models;

use App\Models\System\Image;
use App\Services\ShopManager\ShopManager;
use App\Traits\Imageable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use Imageable;

    protected $guarded = [];

    public $fields = [
        'company_id',
        'name',
        'balance',
        'image_id'
    ];

    public function image()
    {
        return $this->hasOne(Image::class, 'id', 'image_id');
    }

    public function getImagePathAttribute()
    {
        return $this->image ? $this->image->url : asset('/images/shop/no-photo.svg');
    }

    public function parents()
    {
        $parents = collect([]);

        $parent = $this->parent;

        while(!is_null($parent) && $parent->id > 2) {
            $parents->push($parent);
            $parent = $parent->parent;
        }

        return $parents->reverse();
    }

    public function path()
    {
        return route('pages.path', $this->getParentsSlugs());
    }

    public function getParentsSlugs()
    {
        $parents = $this->parents();

        $slugs = '';

        if(count($parents)) {
            $slugs = implode('/', $parents->pluck('slug')->toArray()) . '/';
        }

        return '/catalogue/' . $slugs . $this->slug;
    }

    public function parent()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $builder = $this->belongsTo(Category::class, 'category_id');

        $builder->where(function (Builder $query) use($shop) {
            $company_id = $shop->company_id ?? Auth::user()->company_id;

            $query->where('company_id', $company_id)
                ->orWhere('company_id', null);
        });

        return $builder;
    }

    public function childs()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $builder = $this->hasMany(Category::class, 'category_id');

        $builder->where(function (Builder $query) use($shop) {
            $company_id = $shop->company_id ?? Auth::user()->company_id;

            $query->where('company_id', $company_id)
                ->orWhere('company_id', null);
        });

        return $builder;
    }

//    public function parent()
//    {
//        return $this->belongsTo(Category::class, 'category_id')
//            ->where(function($q){
//                $company_id = Auth::user()->company()->first()->id;
//                $q->where('company_id', $company_id)->orWhere('company_id', NUll);
//            });
//    }
//
//    public function childs()
//    {
//        return $this->hasMany(Category::class, 'category_id')
//            ->where(function($q){
//                $company_id = Auth::user()->company()->first()->id;
//                $q->where('company_id', $company_id)->orWhere('company_id', NUll);
//            });
//    }

    public function articles()
    {
        return $this->hasMany(Article::class, 'category_id');
    }

    public function partners()
    {
        return $this->hasMany(Partner::class, 'category_id');
    }

    public function ddsarticles()
    {
        return $this->hasMany(DdsArticle::class, 'category_id');
    }

    public function getRootType() //Находит тип ближайшей залоченой категории и выдаёт роут редиректа
    {
        $finded = false;
        $root = null;
        $category = $this;
        while($finded == false){
            $parent = $category->parent()->first();
            if($parent->locked){$finded = true;$root = $parent;break;} else {$category = $parent;}
        }
        if($root){
            return $root->type;
        } else {
            return response()->json(['message' => 'Ошибка наследования категрории'], 500);
        }
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where(function($q) use ($company_id){
            $q->where('company_id', $company_id)->orWhere('company_id', NUll);
        });
    }
}
