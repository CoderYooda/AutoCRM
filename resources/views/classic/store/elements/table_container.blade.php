{{--@php $articles = \App\Http\Controllers\ProductController::getArticles($request) @endphp--}}
@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 2) @endphp
{{--{{ dd($category) }}--}}
{{--style="height: 100%;"--}}

@php $class = 'store' @endphp

@can('Смотреть категории')
    <div class="content-menu box w-290" id="category-nav" >
        @include(env('DEFAULT_THEME', 'classic') . '.category.aside-list')
    </div>
@endcan

<div class="box-lister box" style="width: 1px!important;">
    <div class="box-header" id="breadcrumbs-nav">
    </div>
    <div id="table-container" class="box-content">
        <div id="store-table" ></div>
    </div>
</div>
