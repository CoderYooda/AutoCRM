@extends('shop.layout.app')

@section('content')
<div class="body">
    <div class="slider container bg-white">
        <div class="silder-content">
            <div class="head-slider-container">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
            </div>
            <div class="controls">
                <div class="control-item left" onclick="window.headSlider.prev()"></div>
                <div class="control-item right" onclick="window.headSlider.next()"></div>
            </div>
            <div class="pins-container">
{{--                <div class="pin"></div>--}}
{{--                <div class="pin"></div>--}}
{{--                <div class="pin active"></div>--}}
{{--                <div class="pin"></div>--}}
{{--                <div class="pin"></div>--}}
            </div>
        </div>
    </div>
    <div class="popular container bg-white">
        <div class="title">
            <h2>Популярные товары</h2>
            <div class="products grid-4">
                <div class="popular-products">
                    @for($i = 0; $i < 7; $i++)
                    <div class="product">
                        <img class="product-img" title="сюда имя товара" src="/images/shop/product-{{ rand(0,3) }}.png" alt="">
                        <h3 class="product-name" title="Название товара!!!">Моторное масло</h3>
                        <div class="brand">VAG</div>
                        <div class="article">k1279</div>
                        <div class="price-container">
                            @php $isAction = rand(0,1); $price = rand(1000, 300000) @endphp
                            <span class="price @if($isAction) action @endif">{{ number_format($price, 0, ',', ' ') }}</span>
                            @if($isAction)
                            <span class="strikethrough-price">{{ number_format($price + rand(1000, 900000), 0, ',', ' ') }}</span>
                            @endif
                        </div>
                        <div class="top-left-label">
                            @if(rand(0,1))
                                <div class="in-stock">В наличии</div>
                            @else
                                <div class="out-of-stock">Под заказ</div>
                            @endif
                            @if($isAction)
                            <div class="discount">-30%</div>
                            @endif
                        </div>
                        <div class="top-right-label">
                            <div class="favour"></div>
                            <div class="info" onclick="getProductInfo({{ $i }})"></div>
                        </div>
                        <div class="shipping-container">
                            <div class="counter-container">
                                <div class="button minus"></div>
                                <input class="counter" value="1" type="text">
                                <div class="button plus"></div>
                            </div>
                            <div class="cart-button {{ rand(0,1) ? 'incart' : '' }}"></div>
                        </div>
                    </div>
                    @endfor
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
            @for($i = 0; $i <= 10; $i++)
            <div class="category">
                <div class="description">
                    <div class="title">Название категории</div>
                    <div class="link">
                        <a title="Название категории сюда" href="/shop/index?page=category">Перейти</a>
                    </div>
                </div>
                <div class="photo">
                    @if(rand(0,3))
                    <img title="Название категории сюда" src="/images/shop/category-{{ rand(1,2) }}.png" alt="">
                    @endif
                </div>
            </div>
            @endfor
        </div>
    </div>
</div>
@endsection
