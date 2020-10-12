@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="title">
            <h2>Название категории</h2>
        </div>

        <div class="in-category-container">
            <div class="left-menu-container">
                <ul>
                    <li class="active"><a href="/shop/index?page=category">Общий каталог</a>
                        <ul>
                            <li>
                                <a href="/shop/index?page=category">Внытренняя категория</a>
                            </li>
                            <li>
                                <a href="/shop/index?page=category">Внытренняя категория</a>
                            </li>
                            <li>
                                <a href="/shop/index?page=category">Внытренняя категория</a>
                            </li>
                            <li>
                                <a href="/shop/index?page=category">Внытренняя категория</a>
                            </li>
                            <li>
                                <a href="/shop/index?page=category">Внытренняя категория</a>
                            </li>
                        </ul>
                    </li>
                    <li><a href="/shop/index?page=category">Моторныйе масла</a></li>
                    <li><a href="/shop/index?page=category">Запчасти для ТО</a></li>
                    <li><a href="/shop/index?page=category">Оригинальные запчасти</a></li>
                    <li><a href="/shop/index?page=category">Автомобильные жидкости</a></li>
                    <li><a href="/shop/index?page=category">Шины и диски</a></li>
                    <li><a href="/shop/index?page=category">Аккумуляторы</a></li>
                    <li><a href="/shop/index?page=category">Аксессуары</a></li>
                    <li><a href="/shop/index?page=category">Автохимия</a></li>
                </ul>
            </div>
            <div class="items">
                {{--<div class="categories-block">--}}
                    {{--@for($i = 0; $i <= 9; $i++)--}}
                        {{--<div class="category">--}}
                            {{--<a href="">--}}
                                {{--<div class="photo">--}}
                                    {{--@if(rand(0,3))--}}
                                        {{--<img title="Название категории сюда" src="/images/shop/category-{{ rand(1,2) }}.png" alt="">--}}
                                    {{--@endif--}}
                                {{--</div>--}}
                                {{--<div class="description">--}}
                                    {{--<div class="title">Название категории</div>--}}
                                {{--</div>--}}
                            {{--</a>--}}
                        {{--</div>--}}
                    {{--@endfor--}}
                {{--</div>--}}
                {{--<div class="product-filter">--}}
                    {{--<div class="sorting">--}}
                        {{--<div class="title">Сортировать:</div>--}}
                        {{--<div class="by-price desc">По цене</div>--}}
                        {{--<div class="in-stock">--}}
                            {{--<label for="instock">Только в наличии</label>--}}
                            {{--<input id="instock" type="checkbox" name="instock">--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<div class="list-grid">--}}
                        {{--<div class="list active"></div>--}}
                        {{--<div class="grid"></div>--}}
                    {{--</div>--}}
                {{--</div>--}}
                <div class="products row">
                    @for($i = 0; $i < 8; $i++)
                        <a href="/shop/index?page=product">
                            <div class="product">
                                <img class="product-img" title="сюда имя товара" src="/images/shop/product-{{ rand(0,3) }}.png" alt="">


                                <div class="top-left-label">
                                    @if(rand(0,1))
                                        <div class="in-stock">В наличии</div>
                                    @else
                                        <div class="out-of-stock">Под заказ</div>
                                    @endif
                                    @if(rand(0,1))
                                        <div class="discount">-30%</div>
                                    @endif
                                </div>

                                <div class="name-container">
                                    <div class="brand">VAG</div>
                                    <div class="article">k1279</div>
                                </div>
                                <h3 class="product-name" title="Название товара!!!">Моторное масло</h3>

                                <div class="top-right-label">
                                    <div class="favour"></div>
                                    {{--<div class="info" onclick="getProductInfo({{ $i }})"></div>--}}
                                </div>
                            </div>
                        </a>
                    @endfor
                </div>
            </div>
        </div>

    </div>
</div>
@endsection
