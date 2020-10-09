@extends('shop.layout.app')

@section('content')
<div class="body">
    <div class="pagination container bg-white">
        <div class="paginator">
            <span class="item" ><a href="javascript:void(0)">Главная</a></span>
            <span class="item" ><a href="javascript:void(0)">После главной</a></span>
            <span class="item" >Последняя</span>
        </div>
    </div>
    <div class="in-category container bg-white">
        <div class="title">
            <h2>Название Товара</h2>
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
                <div class="shipment">
                    <div class="header">
                        На нашем складе
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
