@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="title">
            <h2>Название Товара</h2>
        </div>

        <div class="in-category-container">
            <div class="left-menu-container">
                <div class="button_back">
                    @if($selectedCategory->category_id != 2)
                        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                        <a href="{{ $selectedCategory->parent->path() }}">Назад</a>
                    @endif
                </div>

                <ul>
                    @foreach($categories as $category)
                        <li @if($category->id == $selectedCategory->id) class="active" @endif>
                            <a href="{{ $category->path() }}">{{ $category->name }}</a>
                            @if($category->id == $selectedCategory->id && count($category->childs))
                                <ul>
                                    @foreach($category->childs as $childrenCategory)
                                        <li>
                                            <a href="{{ $childrenCategory->path() }}">{{ $childrenCategory->name }}</a>
                                        </li>
                                    @endforeach
                                </ul>
                            @endif
                        </li>
                    @endforeach
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
