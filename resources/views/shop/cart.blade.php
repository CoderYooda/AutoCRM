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

                    <div class="cart_element" id="product_{{ $product->id }}">

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

                        <div class="flex-1 params_second">
                            <div class="current_price">1 050 000 ₽</div>
                            <div class="total_price">1 800 000 ₽</div>
                        </div>


                        <div class="absolute shipping-container">
                            <div class="counter-container">
                                <div class="button minus" onclick="cart.decrement(this, {{ $product->id }});"></div>
                                <input type="text" class="counter" value="{{ $cart->getProductCount($product->id) }}" />
                                <div class="button plus" onclick="cart.increment(this, {{ $product->id }});"></div>
                            </div>
                            <div class="cart-button incart" onclick="cart.remove(this, {{ $product->id }});"></div>

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

        <div class="order_form" style="width: 80%;">

            <div id="register-tabs" class="cart_tabs">
                <div class="pointer active" data-target="tab_fl">
                    <div class="button">
                        <span>Физическое лицо</span>
                        <div class="selected"></div>
                    </div>
                </div>
                <div class="pointer" data-target="tab_ip">
                    <div class="button">
                        <span>Индивидуальный предприниматель</span>
                        <div class="selected"></div>
                    </div>
                </div>
                <div class="pointer" data-target="tab_ul">
                    <div class="button">
                        <span>Юридическое лицо</span>
                        <div class="selected"></div>
                    </div>
                </div>
            </div>

            <form action="" method="POST" class="d-flex flex-column" id="tab_fl">

                <div class="form-group-flex">
                    <label>Телефон <span class="required_field">*</span></label>
                    <input type="text" class="form-control" name="phone" placeholder="+7(999)999-99-99" />
                </div>

                <div class="form-group-flex">
                    <label>Фамилия <span class="required_field">*</span></label>
                    <input type="text" class="form-control" name="surnanme" placeholder="Иванов" />
                </div>

                <div class="form-group-flex">
                    <label>Имя <span class="required_field">*</span></label>
                    <input type="text" class="form-control" name="name" placeholder="Иван" />
                </div>

                <div class="form-group-flex">
                    <label>Отчество</label>
                    <input type="text" class="form-control" name="middlename" placeholder="Иванович" />
                </div>

                <div class="form-group-flex">
                    <label>Электронная почта <span class="required_field">*</span></label>
                    <input type="email" class="form-control" name="email" placeholder="example@domain.ru" />
                </div>

                <div class="form-group-flex">
                    <label for="delivery_type">Способ доставки <span class="required_field">*</span></label>
                    <select name="delivery_type">
                        <option value="0">Самовывоз</option>
                        <option value="1">Доставка</option>
                    </select>
                </div>

                <div class="form-group-flex">
                    <label>Способ оплаты <span class="required_field">*</span></label>
                    <div class="d-flex float-r" style="width: 352px;">
                        <label class="custom_radio" style="margin-right: 42px;">
                            На сайте
                            <input type="radio" class="not_default" name="pay_type" checked value="0" />
                            <span></span>
                        </label>
                        <label class="custom_radio">
                            При получение
                            <input type="radio" class="not_default" name="pay_type" value="1" />
                            <span></span>
                        </label>
                    </div>
                </div>

                <div class="register mb-20">
                    <div class="d-flex float-r" style="width: 352px;">
                        <label class="custom_checkbox">
                            <input type="checkbox" class="mr-20" name="rules" checked />
                            <span></span>
                            <a href="#">Обработка персональных данных</a>
                        </label>
                    </div>
                </div>

                <div class="register mb-20">
                    <div class="d-flex float-r" style="width: 352px;">
                        <label class="custom_checkbox">
                            <input type="checkbox" class="mr-20" name="register" checked />
                            <span></span>
                            Регистрация в #bbcrm
                        </label>
                    </div>
                </div>

                <div class="mb-16">
                    <div class="float-r" style="width: 352px;">
                        <div class="order_button relative right-0">
                            Оформить заказ
                        </div>
                    </div>
                </div>

            </form>

        </div>

        @else

            <div class="empty_table">
                <span>Пусто</span>
            </div>

        @endif

    </div>
</div>
@endsection
