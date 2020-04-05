{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Склад')

@section('tab')

<div class="top-container">
    <div class="search-panel box">
        <div class="search-field-container w-100">
            <input id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="{{ request('search') }}" type="text">
        </div>
        <div class="actions">
            @can('Создавать категории')
                <button onclick="openDialog('categoryDialog')" class="button primary ml-12">Новая категория</button>
            @endcan
            @can('Создавать товары')
                    <button onclick="openDialog('productDialog')" class="button primary ml-12">Новый товар</button>
            @endcan
        </div>
    </div>
</div>
<div id="ajax-table-store" class="bottom-container">
    @include(env('DEFAULT_THEME', 'classic') . '.store.elements.table_container')
</div>
@endsection

