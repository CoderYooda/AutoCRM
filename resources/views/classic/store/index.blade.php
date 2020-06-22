{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Склад')

@section('tab')
    <div class="box w-290">

    </div>

    <div class="w-100">
        <div class="box" style="height: 56px;"></div>
        <div class="box" style="height: 790px;"></div>
    </div>

@endsection

{{--@section('tab')--}}
{{--@php $class = 'store' @endphp--}}
{{--<div class="top-container">--}}
{{--    <div class="search-panel box">--}}
{{--        <div class="search-field-container w-100">--}}
{{--            <input onclick="store.showBrands()" id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="{{ request('search') }}" type="text">--}}
{{--            <div class="box">--}}
{{--                <div class="store-title">--}}
{{--                    Выберите производителя:--}}
{{--                </div>--}}
{{--                <div id="store-list" class="store-list">--}}

{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}

{{--        <div class="actions">--}}

{{--            <select name="manufacture" class="form-control input-c ml-15">--}}

{{--            </select>--}}

{{--            @can('Создавать категории')--}}
{{--                <button onclick="{{ $class }}.openCategoryModal()" class="button primary ml-12">Новая категория</button>--}}
{{--            @endcan--}}
{{--            @can('Создавать товары')--}}
{{--                    <button onclick="{{ $class }}.openProductModal()" class="button primary ml-12">Новый товар</button>--}}
{{--            @endcan--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</div>--}}
{{--<div id="ajax-table-store" class="bottom-container" style="height: calc(100% - 79px)!important;">--}}
{{--    @include(env('DEFAULT_THEME', 'classic') . '.store.elements.table_container')--}}
{{--</div>--}}
{{--@endsection--}}

