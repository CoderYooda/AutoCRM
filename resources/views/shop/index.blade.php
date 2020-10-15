@extends('shop.layout.app')

@section('content')
<div class="body">

    @if(count($shop->sliderImages))

        <div class="slider container bg-white">
            <div class="silder-content">
                <div class="head-slider-container">
                    @foreach($shop->sliderImages as $image)
                        <img style="display: block;" src="{{ $image->url }}" alt="">
                    @endforeach
                </div>
                <div class="controls">
                    <div class="control-item left" onclick="window.headSlider.prev()"></div>
                    <div class="control-item right" onclick="window.headSlider.next()"></div>
                </div>
                <div class="pins-container">
                    {{-- Логика в JS --}}
                </div>
            </div>
        </div>

    @endif

    <div class="popular container bg-white">
        <div class="title">
            <h2>Акционные товары</h2>
            <div class="products grid-4">
                <div class="popular-products">
                    @foreach($products as $product)
                    <div class="product">
                        <img class="product-img" title="{{ $product->name }}" src="{{ $product->image_path }}" alt="{{ $product->name }}">
                        <h3 class="product-name" title="{{ $product->name }}">{{ $product->name }}</h3>
                        <div class="brand">{{ $product->supplier->name }}</div>
                        <div class="article">{{ $product->article }}</div>
                        <div class="price-container">

                            <span class="price">{{ correct_price($product->stores->first()->pivot->retail_price) }}</span>

{{--                            <span class="price action">{{ correct_price($product->stores->first()->pivot->retail_price) }}</span>--}}
{{--                            <span class="strikethrough-price">{{ correct_price($product->stores->first()->pivot->retail_price) }}</span>--}}
                        </div>
                        <div class="top-left-label">
                            @if($product->getEntrancesCount())
                                <div class="in-stock">В наличии</div>
                            @else
                                <div class="out-of-stock">Под заказ</div>
                            @endif
{{--                            <div class="discount">-30%</div>--}}
                        </div>
                        <div class="top-right-label">
                            <div class="favour @if($favorite->isProductExists($product->id)) active @endif" onclick="favorite.toggleProduct(this, {{ $product->id }});"></div>
                            <div class="info" onclick="product.getInfo({{ $product->id }})"></div>
                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="controls">
                    <div class="control-item left" onclick="window.popularSlider.prev()"></div>
                    <div class="control-item right" onclick="window.popularSlider.next()"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="catalogues container bg-white">
        <div class="title">
            <h2>Каталог товаров</h2>
        </div>
        <div class="categories-container">
            @foreach($categories as $category)
                <div class="category">
                    <div class="description relative">
                        <div class="title">{{ $category->name }}</div>
                        <div class="link">
                            <a title="{{ $category->name }}" href="{{ $category->path() }}">Перейти</a>
                        </div>
                    </div>
                    <div class="photo" @isset($category->image) style="background: url({{ asset($category->image_path) }}) center no-repeat;" @endisset>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
