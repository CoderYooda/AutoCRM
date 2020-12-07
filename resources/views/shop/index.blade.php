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

    @if(count($stockProducts))
        <div class="popular container bg-white">
            <div class="title">
                <h2>Сейчас актуально</h2>
                <div class="products grid-4">
                    <div class="popular-products">
                        @foreach($stockProducts as $product)
                            <div class="product">
                                <a href="{{ $product->path() }}">
                                    <img class="product-img" title="{{ $product->getShopName() }}" src="{{ $product->image_path }}" alt="{{ $product->getShopName() }}">
                                    <h3 class="product-name" title="{{ $product->getShopName() }}">{{ $product->getShopName() }}</h3>
                                    <div class="brand">{{ $product->supplier->name }}</div>
                                    <div class="article">{{ $product->article }}</div>
                                    <div class="price-container">
                                        @if(!$product->sp_stock)
                                            <span class="price">{{ correct_price($product->getPrice()) }}</span>
                                        @else
                                            <span class="price action">{{ correct_price($product->getPriceWithDiscount()) }}</span>
                                            <span class="strikethrough-price">{{ correct_price($product->getPrice()) }}</span>
                                        @endif
                                    </div>
                                    <div class="top-left-label">
                                        @dd($product, $product->getEntrancesCount())
                                        @if($product->getEntrancesCount())
                                            <div class="in-stock">В наличии</div>
                                        @else
                                            <div class="out-of-stock">Под заказ</div>
                                        @endif
            {{--                            <div class="discount">-30%</div>--}}
                                    </div>
                                    <div class="top-right-label">
                                        <div class="favour @if($favorite->isProductExists($product->id)) active @endif" onclick="favorite.toggleProduct(this, {{ $product->id }});"></div>
                                        @if($product->sp_desc)
                                            <div class="info" onclick="product.getInfo({{ $product->id }})"></div>
                                        @endif
                                    </div>
                                </a>
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

    @endif

    <div class="catalogues container bg-white">
        <div class="title">
            <h2>Каталог товаров</h2>
        </div>
        <div class="categories-container">
            @foreach($categories as $category)
                <div class="category pointer" onclick="window.location.href = '{{ $category->path() }}';">
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

            <div class="category pointer" onclick="window.location.href = '{{ route('pages.catalogue') }}';">
                <div class="description relative">
                    <div class="title">+{{ $categories->total() }} категорий</div>
                    <div class="link">
                        <a title="Показать все" href="{{ route('pages.catalogue') }}">Показать все</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
