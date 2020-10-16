@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white relative">
        <div class="title">
            <h2>Корзина</h2>
        </div>

        <div class="order_button">
            Оформить заказ
        </div>

        @if(count($products))

        <div class="cart_stores">

            @foreach($stores as $store)
                <div class="store @if($loop->first) active @endif">
                    <div class="name">{{ $store->name }}</div>
                    <div class="total">14 000 ₽</div>
                </div>
            @endforeach

        </div>

        <div class="cart_table w-100">

            <div class="cart_body">

                @foreach($products as $product)

                    <div class="cart_element">

                        <div class="flex-1 photo">
                            <img src="{{ $product->image_path }}" alt="{{ $product->name }}" title="{{ $product->name }}"/>
                        </div>

                        <div class="flex-1 info ">
                            <div>{{ $product->supplier->name }}</div>
                            <div>{{ $product->article }}</div>
                        </div>

                        <div class="flex-1 name" title="{{ $product->name }}">
                            <div>{{ $product->name }}</div>
                        </div>

                        <div class="flex-1 params_first">
                            <div class="old_price">1 060 000 ₽</div>
                            <div class="count">{{ $cart->getProductCount($product->id) }} шт.</div>
                        </div>

                        <div class="flex-1 params_second ">
                            <div class="current_price">1 050 000 ₽</div>
                            <div class="total_price">1 800 000 ₽</div>
                        </div>


                        <div class="absolute shipping-container">
                            <div class="counter-container">
                                <div class="button minus" onclick="cart.decrement(this, {{ $product->id }});"></div>
                                <input class="counter" value="{{ $cart->getProductCount($product->id) }}" type="text" />
                                <div class="button plus" onclick="cart.increment(this, {{ $product->id }});"></div>
                            </div>
                            <div class="cart-button" onclick="cart.remove(this, {{ $product->id }});"></div>

                        </div>

                    </div>

                @endforeach

            </div>

        </div>

        <div class="relative">

            <div class="clear_cart">
                <span>Очистить корзину</span>
                <div class="image"></div>
            </div>

            <div class="cart_total">
                <span>Итого:</span>
                <span id="count">1 050 000 ₽</span>
            </div>

        </div>

        <div class="title" style="margin-top: 62px;">
            <h2>Оформление заказа</h2>
        </div>

        <div class="forms">
            <div class="order_form">

                <form>

                    <div class="form-group">

                        <label>Телефон <span style="color: red;">*</span></label>
                        <input type="text" name="phone" placeholder="+7(999)999-99-99" />

                    </div>

                </form>

            </div>
        </div>

        @else

            <div class="empty_table">
                <span>Пусто</span>
            </div>

        @endif

    </div>
</div>
@endsection
