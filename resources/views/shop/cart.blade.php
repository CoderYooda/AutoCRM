@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="title">
            <h2>Корзина</h2>
        </div>

        <div class="in-category-container">
            <div class="cart_table w-100">

                <div class="cart_body">

                    @foreach($products as $product)

                        <div class="cart_element">

                            <div class="image">
                                <img src="{{ $product->image_path }}" alt="{{ $product->name }}" title="{{ $product->name }}"/>
                            </div>

                            <div class="info">
                                <span>{{ $product->supplier->name }}</span>
                                <span>{{ $product->article }}</span>
                            </div>

                            <div class="name">
                                {{ $product->name }}
                            </div>

                            <div class="params_first">
                                <span class="old_price">1 060 000 ₽</span>
                                <span class="count">{{ $cart->getProductCount($product->id) }} шт.</span>
                            </div>

                            <div class="params_second">
                                <span class="current_price">1 050 000 ₽</span>
                                <span class="total_price">1 800 000 ₽</span>
                            </div>


{{--                            <div class="absolute shipping-container">--}}
{{--                                <div class="counter-container">--}}
{{--                                    <div class="button minus" onclick="cart.decrement(this, {{ $product->id }});"></div>--}}
{{--                                    <input class="counter" value="{{ $cart->getProductCount($product->id) }}" type="text" />--}}
{{--                                    <div class="button plus" onclick="cart.increment(this, {{ $product->id }});"></div>--}}
{{--                                </div>--}}
{{--                                <div class="cart-button @if($cart->isProductExists($product->id)) incart @endif" onclick="cart.add(this, {{ $product->id }});"></div>--}}

{{--                            </div>--}}

                        </div>

                    @endforeach

                </div>

            </div>
        </div>

    </div>
</div>
@endsection
