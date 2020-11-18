@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="title">
            <h2>Результаты поиска</h2>
        </div>

        @if(count($products))
            <div class="search_header">

                <div class="w-20">Производитель</div>
                <div class="w-20">Артикул</div>
                <div class="w-60">Название</div>

            </div>

            <div class="search_body">
                @foreach($products as $product)

                    <div class="product" onclick="helper.triggerClick(this);">

                        <a class="d-none redirect_link" href="{{ $product->path() }}"></a>

                        <div class="w-20 brand">
                            <div>{{ $product->supplier->name }}</div>
                        </div>

                        <div class="w-20 article">
                            <div>{{ $product->article }}</div>
                        </div>

                        <div class="w-60 name">
                            {{ $product->name }}
                        </div>

                        <div class="link">
                            <a href="{{ $product->path() }}">подробнее</a>
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </div>

                    </div>

                @endforeach

            </div>
        @else

            <div class="empty_table">Пусто</div>

        @endif

        {{ $products->links('shop.pagination.default') }}

    </div>
</div>
@endsection
