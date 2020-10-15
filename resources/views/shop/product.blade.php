@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="product_title">
            <h2>{{ $product->name }}</h2>
            <h3>Артикул {{ $product->article }}</h3>
        </div>

        <div class="in-category-container">

            <div class="product_info w-100 d-flex">

                <div class="flex-1 photo">
                    <img class="w-100 h-100" src="{{ $product->image_path }}" title="{{ $product->name }}" alt="{{ $product->name }}" />
                </div>

                <div class="flex-2 description">
                    <div class="relative"> {{-- is-full --}}
                        <div class="param_title">Описание</div>
                        <div class="param_desc">{{ $product->sp_desc }}</div>
                        <span class="show pointer" onclick="product.showFullText(this);">...</span>
                    </div>
                </div>

                <div class="flex-2 specifications">
                    <div class="relative"> {{-- is-full --}}
                        <div class="param_title">Характеристики</div>
                        <div class="specifications_table">
                            @foreach($product->specifications as $specification)

                                <div class="specification_element">
                                    <div class="flex-1">{{ $specification->label }}</div>
                                    <div class="flex-1">{{ $specification->value }}</div>
                                </div>

                            @endforeach
                        </div>
                        <span class="show pointer" onclick="product.showFullText(this);">...</span>
                    </div>
                </div>

            </div>

        </div>

        <div class="product_title" style="margin-top: 40px;">
            <h2>Предложения</h2>
        </div>

        <div class="table">

            <div class="name">
                На нашем складе
            </div>

            <div class="header">
                <div class="flex-1 availability">
                    <span>Наличие</span>
                    <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>
                </div>

                <div class="flex-1 price">
                    <span>Цена</span>
                    <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>
                </div>

                <div class="flex-2 shop">
                    Магазин
                </div>

            </div>

            <div class="body">

                @foreach($product->stores as $store)

                <div class="element">
                    <div class="flex-1 availability">{{ $product->getCountInStoreId($store->id) }} шт.</div>
                    <div class="flex-1 price">
                        <span class="current">{{ correct_price($store->pivot->retail_price) }} ₽</span>
{{--                        <span class="old">150 000 ₽</span>--}}
                    </div>
                    <div class="flex-2 shop">{{ $store->name }}</div>

                    <div class="absolute shipping-container">
                        <div class="counter-container">
                            <div class="button minus" onclick="cart.decrement(this, {{ $product->id }});"></div>
                            <input class="counter" value="{{ $cart->getProductCount($product->id) }}" type="text" />
                            <div class="button plus" onclick="cart.increment(this, {{ $product->id }});"></div>
                        </div>
                        <div class="cart-button @if($cart->isProductExists($product->id)) incart @endif" onclick="cart.add(this, {{ $product->id }});"></div>

                    </div>

                </div>

                @endforeach

            </div>

        </div>

    </div>
</div>
@endsection
