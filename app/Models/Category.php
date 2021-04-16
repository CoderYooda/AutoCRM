<?php

namespace App\Models;

use App\Models\System\Image;
use App\Services\ShopManager\ShopManager;
use App\Traits\Imageable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Category extends Model
{
    use Imageable;

    protected $table = 'categories';

    protected $guarded = [];

    public $fields = [
        'company_id',
        'name',
        'balance',
        'image_id'
    ];

    public function isRoot()
    {
        return $this->id < 3;
    }

    public function isTrashed()
    {
        return $this->type === 'del';
    }

    public function parent()
    {
        return $this->HasOne(Category::class, 'id', 'category_id');
    }

    public function image()
    {
        return $this->hasOne(Image::class, 'id', 'image_id');
    }

    public function getImagePathAttribute()
    {
        return $this->image ? $this->image->url : asset('/images/shop/no-photo.svg');
    }

    public function freshSlug()
    {
        $slug = Str::slug($this->name . '-' . $this->id);

        //Обновляем slug через фасад, чтобы избежать рекурсии в observer'e
        DB::table('categories')->where('id', $this->id)->update(['slug' => $slug]);
    }

    public function getAncestors()
    {
        $allCategories = Category::owned()->get();

        $searchId = $this->category_id;

        $ancestorsCategories = collect();

        repeat:

        $category = $allCategories->where('id', $searchId)->first();

        if($category) {
            $ancestorsCategories->push($category);
            $searchId = $category->category_id;
            goto repeat;
        }

        return $ancestorsCategories->reverse();
    }

    public function getDescendantsAndSelf()
    {
        $allCategories = Category::owned()->get();

        $searchIds = [];

        array_push($searchIds, $this->id);

        $descendantsCategories = collect()->push($this);

        repeat:

        foreach ($allCategories as $globalCategory) {

            if(!in_array($globalCategory->category_id, $searchIds)) continue;
            if($descendantsCategories->search($globalCategory)) continue;

            $descendantsCategories->push($globalCategory);

            $searchIds[] = $globalCategory->id;

            goto repeat;
        }

        return $descendantsCategories;
    }

    public function breadcrumbs()
    {
        $parents = $this->getAncestors();

        foreach ($parents as $index => $parent) {
            if($parent->id < 3) unset($parents[$index]);
        }

        return $parents;
    }

    public function path()
    {
        $path = '/categories/' . $this->slug;

        return route('pages.path', $path);
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

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
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

    public static function owned()
    {
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $companyId = $shop ? $shop->company_id : Auth::user()->company_id;

        return self::where(function($q) use ($companyId){
            $q->where('company_id', $companyId)->orWhere('company_id', null);
        });
    }
}
