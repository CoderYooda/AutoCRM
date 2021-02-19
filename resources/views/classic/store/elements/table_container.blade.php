{{--@php $articles = \App\Http\Controllers\ProductController::getProducts($request) @endphp--}}
@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 2) @endphp
{{--{{ dd($category) }}--}}
{{--style="height: 100%;"--}}

@php $class = 'store' @endphp

@can('Смотреть категории')
    <div class="content-menu box w-250" id="category-nav" >
        @include(get_template() . '.category.aside-list')
    </div>
@endcan

<div class="box-lister">
    <div class="d-flex mb-15">
        <div class="search-field-container w-100">
            <input id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="{{ request('search') }}" type="text">
        </div>

        <div class="actions">

            @can('Создавать категории')
                <button type="button" onclick="{{ $class }}.openCategoryModal()" class="button primary ml-15">Новая категория</button>
            @endcan

            @can('Создавать товары')
                <button type="button" onclick="{{ $class }}.openProductModal()" class="button primary ml-15">Новый товар</button>
            @endcan

        </div>
    </div>
    <div class="box h-100 d-flex" style="flex-direction: column">
        <div class="box-header" id="breadcrumbs-nav">
            {!! $breadcrumbs !!}
        </div>
        {{--class="box-content h-100"--}}
        <div id="table-container" class="flex-1">
            <div data-data="{{ $data }}" id="storeTable"></div>
        </div>
    </div>
</div>
