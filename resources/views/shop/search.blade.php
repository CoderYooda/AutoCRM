@extends('shop.layout.app')

@section('title', 'Поиск')

@section('content')
<div class="body search_page">

    @include('shop.includes.breadcrumbs')

    <input type="hidden" name="article" value="{{ request()->search }}">

    <div class="in-category container bg-white">
        <div class="title">
            <h2>Результаты поиска</h2>
        </div>

        <div class="result">

            @include('shop.includes.search.brands')
{{--        @include('shop.includes.search.warehouses')--}}

        </div>

    </div>

</div>
@endsection
