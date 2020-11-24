@extends('shop.layout.app')

@section('content')
<div class="body">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white relative">
        <div class="title">
            <h2>Корзина</h2>
        </div>

{{--        <div onclick="cart.makeOrder(this);" class="order_button">--}}
{{--            Оформить заказ--}}
{{--        </div>--}}

        @if(count($orders))

{{--            <div class="cart_stores">--}}

{{--                @foreach($stores as $store)--}}
{{--                    <div class="store @if($loop->first) active @endif">--}}
{{--                        <div class="name">{{ $store->name }}</div>--}}
{{--                        <div class="total"><span id="total_store_{{ $store->id }}">{{ correct_price($storesTotal[$store->id] ?? 0) }}</span> ₽</div>--}}
{{--                    </div>--}}
{{--                @endforeach--}}

{{--            </div>--}}

            <div class="cart_table w-100">

                <div class="cart_body">

                    @foreach($orders as $hash => $order)

                        <div class="cart_element" id="product_{{ $hash }}" @isset($order['store_id']) data-store_id="{{ $order['store_id'] }}" @endisset>

                            <div class="flex-1 photo">
                                <img src="{{ $order['image'] }}" alt="{{ $order['name'] }}" title="{{ $order['name'] }}"/>
                            </div>

                            <div class="flex-1 info ">
                                <div>{{ $order['manufacturer'] }}</div>
                                <div>{{ $order['article'] }}</div>
                            </div>

                            <div class="flex-1 name" title="{{ $order['name'] }}">
                                <div>{{ $order['name'] }}</div>
                            </div>

                            <div class="flex-1 params_first">
    {{--                            <div class="old_price">{{ correct_price($order['data']['model']['hash_info']['price']) }} ₽</div>--}}
                                <div class="count"><span>{{ $order['count'] }}</span> шт.</div>
                            </div>

                            <div class="flex-1 params_second">
                                <div class="current_price"><span>{{ correct_price($order['price']) }}</span> ₽</div>
                                <div class="total_price"><span>{{ correct_price($order['price'] * $order['count']) }}</span> ₽</div>
                            </div>

                            <div class="absolute shipping-container">
                                <div class="counter-container">
                                    <div class="button minus" onclick="cart.decrement(this, '{{ $hash }}');"></div>
                                    <input type="text" data-max="{{ $order['max_count'] }}" class="counter" value="{{ $order['count'] }}" />
                                    <div class="button plus" onclick="cart.increment(this, '{{ $hash }}');"></div>
                                </div>
                                <div class="cart-button incart" onclick="cart.remove(this, '{{ $hash }}');"></div>
                            </div>

                        </div>

                    @endforeach

                </div>

            </div>

            <div class="cart_actions relative">

                <div class="clear_cart">
                    <span>Очистить корзину</span>
                    <div onclick="cart.clear();" class="image"></div>
                </div>

                <div class="cart_total">
                    <span>Итого:</span>
                    <span id="count">{{ correct_price($totalPrice) }}</span> ₽
                </div>

            </div>

            @if(!auth()->check())
                <div class="order_types mt-62 @if(old('register_type') != null) d-none @endif">

                    <div onclick="cart.toggleFields('anonymous');">продолжить без регистрации</div>
                    <div onclick="cart.toggleFields('register');">зарегистрироваться</div>
                    <div onclick="cart.toggleFields('auth');">войти</div>

                </div>
            @endif

            <div class="order_register @if(old('register_type') == null && !auth()->check()) d-none @endif">
                <div class="title mt-62">
                    <h2>Оформление заказа</h2>
                </div>

                @if(auth()->check())
                    <div class="registered_form" style="width: 700px;">

                        <form action="{{ route('cart.order') }}" method="POST">

                            @csrf

                            <div class="form-group-flex">
                                <label>Телефон</label>
                                <div class="float-r w-50">
                                    <span>{{ display_phone(auth()->user()->phone) }}</span>
                                </div>
                            </div>

                            <div class="form-group-flex">
                                <label>ФИО</label>
                                <div class="float-r w-50">
                                    <span>{{ auth()->user()->companyPartner->fio }}</span>
                                </div>
                            </div>

                            <div class="form-group-flex">
                                <label>Электронная почта</label>
                                <div class="float-r w-50">
                                    <span>{{ auth()->user()->companyPartner->email }}</span>
                                </div>
                            </div>

                            <div class="form-group-flex">
                                <label for="delivery_type">Способ доставки</label>
                                <div class="float-r w-50">
                                    <select onchange="cart.changeDeliveryType(this);" name="delivery_type">
                                        <option value="0">Самовывоз</option>
                                        <option value="1">Доставка</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group-flex @if(old('delivery_type')) d-none @endif">
                                <label for="store_id">Точка получения заказа</label>
                                <div class="float-r w-50">
                                    <select name="pickup_id">
                                        @foreach($stores as $store)
                                            <option value="{{ $store->id }}">{{ $store->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group-flex @if(!old('delivery_type')) d-none @endif">
                                <label for="store_id">Адрес доставки</label>
                                <div class="float-r w-50">
                                    <select name="delivery_id">
                                        @foreach($deliveryAddresses as $deliveryAddress)
                                            <option value="{{ $deliveryAddress->id }}">{{ $deliveryAddress->text }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group-flex">
                                <label>Способ оплаты</label>
                                <div class="d-flex float-r w-50">
                                    <label class="custom_radio" style="margin-right: 42px;">
                                        При получении
                                        <input type="radio" class="not_default" name="pay_type" checked value="0" />
                                        <span></span>
                                    </label>
                                    <label class="custom_radio">
                                        На сайте
                                        <input type="radio" class="not_default" name="pay_type" value="1" />
                                        <span></span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group-flex">
                                <label>Комментарий</label>
                                <div class="float-r w-50">
                                    <div class="field">
                                        <textarea class="form-control" name="comment" placeholder="Комментарий">{{ old('comment') }}</textarea>
                                    </div>
                                    @error('comment')
                                        <div class="error_text">{{ $message }}</div>
                                        <div class="error_notify">!</div>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="float-r w-50">
                                    <button class="register_button" type="submit">Оформить заказ</button>
                                </div>
                            </div>

                        </form>
                    </div>
                @else
                    @include('shop.layout.register_fields')
                @endif

            </div>

        @endif

        <div class="empty_table @if(count($orders)) d-none @endif">
            <span>Пусто</span>
        </div>

    </div>

</div>
@endsection
