<?php

namespace App\Models;

use App\Models\System\Image;
use App\Services\ShopManager\ShopManager;
use App\Traits\Imageable;
use Baum\Node;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Category extends Node
{
    use Imageable;

    protected $table = 'categories';

//    protected $scoped = ['company_id'];
    protected $parentColumn = 'category_id';
    protected $leftColumn = '_lft';
    protected $rightColumn = '_rgt';
    protected $depthColumn = 'depth';
    protected static $_guarded = ['id', 'category_id', '_lft', '_rgt', 'depth'];

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
        DB::table('products')->where('id', $this->id)->update(['slug' => $slug]);
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
        $parents = $this->getAncestors();

        $slugs = '';

        foreach ($parents as $index => $parent) {
            if($parent->id < 3) unset($parents[$index]);
        }

        if(count($parents)) {
            $slugs = implode('/', $parents->pluck('slug')->toArray()) . '/';
        }

        $path = '/catalogue/' . $slugs . $this->slug;

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

    public static function owned(){
        $company_id = Auth::user()->company_id;
        return self::where(function($q) use ($company_id){
            $q->where('company_id', $company_id)->orWhere('company_id', NUll);
        });
    }
}
