<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Article;
use App\Models\System\Image;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PartnerController;
use Auth;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    private static $root_category = 1;

    public function index()
    {
        $categories = Category::with('childs', 'parent')->get();
        dd($categories);
    }

    public function loadAside(Request $request)
    {
        $categories = CategoryController::getCategories($request, $request['class']);
        $cat_info = [];
        $cat_info['route'] = 'StoreIndex';
        $cat_info['params'] = ['active_tab' => 'store'];
        $data = null;

        $request['page'] = 1;

        switch ($request['class']) {
            case 'store':
                $cat_info['root_id'] = 2;
                $data = ProductController::getArticles($request);
                break;
            case 'partner':
                $cat_info['root_id'] = 3;
                $data = PartnerController::getPartners($request);
                break;
        }
        $data = json_encode($data->toArray());
        $class = $request['class'];

        $request['category_id'] = $request['category_id'] ? $request['category_id'] : $cat_info['root_id'];

        $response = [];
        $response['html'] = view(get_template() . '.category.aside-list', compact('categories', 'cat_info', 'request', 'class') )->render();
        $response['data'] = $data;
        $response['breadcrumbs'] = self::loadBreadcrumbs($request);

        if($request['class'] == 'partner'){
            $partners = PartnerController::getPartners($request);
            $response['tableData'] = $partners;
        }

        return response()->json($response);
    }

    public static function loadBreadcrumbs(Request $request)
    {
        $category = Category::find($request['category_id']);

        $parentCategories = $category->ancestors;

        return view(get_template() . '.category.includes.breadcrumbs', compact('parentCategories'))->render();
    }

    public function store(CategoryRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать категории' : 'Создавать категории');

        if($request['id'] == $request['category_id']){
            return response()->json([
                'system_message' => view('messages.category_loop')->render(),
            ], 422);
        }

        return \DB::transaction(function () use($request) {
            if($request['category_id'] != null){
                $parent = Category::find($request['category_id']);
            }

            $category = Category::firstOrNew(['id' => (int)$request['id']]);

            if($category->locked){

                return response()->json([
                    'id' => $category->id,
                    'type' => 'error',
                    'message' => 'Категория защищена от редактирования'
                ], 200);
            }

            dd($category->category_id, $request->category_id);

            $category->fill($request->except('image'));
            $category->creator_id = Auth::id();
            $category->company_id = Auth::user()->company_id;
            $category->type = $parent->type ?? null;

            $category->save();

            if($category->hasMoved()) {
                dd(1);
            }

            UA::makeUserAction($category, 'create');

            return response()->json([
                'message' => 'Категория сохранена',
                'event' => 'CategoryStored'
            ]);
        });
    }

    public function delete($id)
    {
        PermissionController::canByPregMatch('Удалять категории');
        $category = Category::where('id', $id)->first();
        $type = 'success';
        if(!$category->locked) {
            if ($category->childs()->count() > 0 ||
                $category->articles()->count() > 0 ||
                $category->ddsarticles()->count() > 0 ||
                $category->partners()->count() > 0
            ) {
                $this->status = 200;
                $type = 'error';
                $this->message = 'Удаляемая категория не пуста, удаление невозможно.';
            } else {
                $category->delete();
                $this->status = 200;
                $this->message = 'Категория удалена';
            }
        } else {
            $this->status = 200;
            $type = 'error';
            $this->message = 'Удаляемая категория защищена от удаления';
        }

        return response()->json([
            'id' => $category->id,
            'type' => $type,
            'message' => $this->message
        ], $this->status);
    }

    public static function categoryDialog(Request $request)
    {
        $category = Category::find($request['category_id']);

        $parent = null;

        if($category) {
            $parent = Category::find($category->category_id);
        }

        $class = 'categoryDialog' . ($category->id ?? '');

        if($request['category_select']){
            $parent = Category::find($request['category_select']);
        }

        $view = view(get_template() . '.category.dialog.form_category', compact('category', 'parent', 'class', 'request'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }

    public function select($id)
    {
        $category = Category::owned()->where('id', $id)->first();
        if(!$category){
            return response()->json([
                'message' => 'Категория не найдена, возможно она была удалёна',
            ], 422);
        }
        return response()->json([
            'id' => $category->id,
            'name' => $category->name,
            'markup' => $category->markup
        ]);
    }

    public function enterDialog(Request $request)
    {
        $class = 'selectCategoryDialog';
        $data = self::findSelectedId($request);
        $category = Category::owned()->where('id', (int)$data['selected_id'])->first();
        $root = $data['root'];
        $searching = false;
        return response()->json([
            'html' => view(get_template() . '.category.dialog.select_category_inner', compact('root', 'class', 'searching', 'category', 'request'))->render()
        ]);
    }

    public static function selectCategoryDialog($request)
    {
        return self::selectCategoryInner($request);
    }

    public function dialogSearch(Request $request)
    {
        return self::selectCategoryInner($request);
    }

    private static function selectCategoryInner(Request $request){

        $class = 'selectCategoryDialog';

        $request['root_category'] = $request['root_category'] ? $request['root_category'] : self::$root_category;

        $request['category_id'] = $request['category_id'] ? $request['category_id'] : $request['root_category'];

        $cats = Category::owned()
            ->where(function($q) use ($request){
                $q->where('name', 'LIKE', '%' . $request['string'] .'%');
            })
            ->when($request['category_id'], function(Builder $q) use ($request){
                $q->where('category_id', $request['category_id']);
            })
            ->orderBy('name')
            ->limit(30)
            ->get();

        $categories = CategoryController::getModalCategories($request['root_category'], $request);

        $view = $request['inner'] ? 'select_category_inner' : 'select_category';

        $content = view(get_template() . '.category.dialog.' . $view, compact('cats', 'categories', 'class', 'request'))->render();
        return response()->json([
            'tag' => 'selectCategoryDialog',
            'html' => $content
        ]);
    }

    private static function findSelectedId($request){
        $selected_id = null;
        $root = null;
        if($request['refer']){
            if(strpos($request['refer'], 'partnerDialog') !== false){
                $root = 3;
            }else if(strpos($request['refer'], 'employeeDialog') !== false){
                $root = 5;
            }else if(strpos($request['refer'], 'categoryDialog') !== false){
                $root = 1;
            }else if(strpos($request['refer'], 'productDialog') !== false){
                $root = 2;
            }else if(strpos($request['refer'], 'ddsarticleDialog') !== false){
                $root = 4;
            } else {
                return response()->json([
                    'message' => 'Не указан рефер',
                ], 422);
            }
        } else {
            return response()->json([
                'message' => 'Не найден рефер окна.',
            ], 422);
        }
        if($request['category_selected'] != null
            && $request['category_selected'] != 'null'
            && $request['category_selected'] != 'undefined'
        ){
            $selected_id = $request['category_selected'];
        }
        if($selected_id == null){
            $selected_id = $root;
        }
        $data['selected_id'] = $selected_id;
        $data['root'] = $root;
        return $data;
    }

    public static function getCategory($request, $root){
        if($request['category_id'] != NULL){
            $category = Category::owned()->where('id', $request['category_id'])->first();
        } else {
            $category = Category::owned()->where('id', $root)->first();
        }
        return $category;
    }

    public static function getCategories($request, $type = null)
    {
        if($request['search'] == null){
            if($request['category_id'] != null){
                $category_id = (int)$request['category_id'];
            }else if($type != null) {
                $category_id = Category::owned()->where('type', $type)->first()->id;
            }
            $parent = Category::owned()->where('id',$category_id)->firstOrFail();
            $categories['stack'] = $parent->childs()->orderBy('name')->get();
            $categories['parent'] = $parent;
        } else {
            $categories['stack'] = Category::owned()->where(function($q) use ($request){
                $q->where('name', 'like', '%' . $request['search'] . '%');
            })->get();
            $categories['parent'] = null;
        }
        return $categories;
    }

    public static function getModalCategories($root_category, $request)
    {
        if($request['category_id'] != null){
            $category_id = (int)$request['category_id'];
        }else {
            $category_id = $root_category;
        }
        $parent = Category::owned()->where('id',$category_id)->first();
        if($parent == null){
            abort(404);
        }

        $categories['stack'] = $parent->childs()->orderBy('name')->get();
        $categories['parent'] = $parent;
        $categories['parent_root'] = $parent->id == $root_category;

        return $categories;
    }
}
