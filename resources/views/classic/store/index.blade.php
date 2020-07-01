{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Склад')

@section('tab')

    @php $class = 'store' @endphp

    <div id="ajax-table-store" class="bottom-container" style="height: calc(100% - 79px) !important;">
        @include(env('DEFAULT_THEME', 'classic') . '.store.elements.table_container')
    </div>

@endsection

