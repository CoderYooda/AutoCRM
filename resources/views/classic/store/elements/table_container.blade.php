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


<div class="box-lister" style="width: 1px!important;">

    <div class="search-panel box mb-15">
        <div class="search-field-container w-100">
            <input onclick="store.showBrands()" id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="{{ request('search') }}" type="text">
            <div class="box">
                <div class="store-title">
                    Выберите производителя:
                </div>
                <div id="store-list" class="store-list">

                </div>
            </div>
        </div>

        <div class="actions">

            <select name="manufacture" class="form-control input-c ml-15">

            </select>

            @can('Создавать категории')
                <button onclick="{{ $class }}.openCategoryModal()" class="button primary ml-12">Новая категория</button>
            @endcan
            @can('Создавать товары')
                <button onclick="{{ $class }}.openProductModal()" class="button primary ml-12">Новый товар</button>
            @endcan
        </div>
    </div>

    <div class="box h-100">
        <div class="box-header" id="breadcrumbs-nav">
        </div>
        <div id="table-container" class="box-content h-100">
            <div id="store-table" ></div>
        </div>
    </div>
</div>
