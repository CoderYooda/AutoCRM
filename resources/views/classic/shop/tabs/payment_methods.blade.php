{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-payment_methods" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdatePaymentMethods') }}" method="POST" class="w-50">

                <h2 class="mt-0 style_header">Способы оплаты</h2>

                <div class="methods mt-10">
                    <label>Tinkoff Merchant</label>
                    <div data-error="methods[tinkoff]" class="input-group mb-10 method">

                        <input type="text" name="methods[tinkoff][terminal_key]" class="form-control mr-5" placeholder="Ключ терминала" value="{{ $paymentMethods['tinkoff']['params']['terminal_key'] ?? '' }}">
                        <input type="text" name="methods[tinkoff][secret_key]" class="form-control mr-5" placeholder="Секретный ключ" value="{{ $paymentMethods['tinkoff']['params']['secret_key'] ?? '' }}">

                        <label data-error="methods_main" class="custom_checkbox">
                            <input type="radio" class="not_default" name="methods_main" @if($paymentMethods['tinkoff']['main'] ?? false) checked @endif value="tinkoff" />
                            <span></span>
                        </label>

                    </div>

                    <label>Yandex Checkout</label>
                    <div data-error="methods[yandex]" class="input-group mb-10 method">

                        <input type="text" name="methods[yandex][shop_id]" class="form-control mr-5" placeholder="ID магазина" value="{{ $paymentMethods['yandex']['params']['shop_id'] ?? '' }}">
                        <input type="text" name="methods[yandex][secret_key]" class="form-control mr-5" placeholder="Секретный ключ" value="{{ $paymentMethods['yandex']['params']['secret_key'] ?? '' }}">

                        <label data-error="methods_main" class="custom_checkbox">
                            <input type="radio" class="not_default" name="methods_main" @if($paymentMethods['yandex']['main'] ?? false) checked @endif value="yandex" />
                            <span></span>
                        </label>

                    </div>

                    <label>Sberbank Merchant</label>
                    <div data-error="methods[sberbank]" class="input-group mb-10 method">

                        <input type="text" name="methods[sberbank][login]" class="form-control mr-5" placeholder="Логин" value="{{ $paymentMethods['sberbank']['params']['login'] ?? '' }}">
                        <input type="text" name="methods[sberbank][password]" class="form-control mr-5" placeholder="Пароль" value="{{ $paymentMethods['sberbank']['params']['password'] ?? '' }}">

                        <label data-error="methods_main" class="custom_checkbox">
                            <input type="radio" class="not_default" name="methods_main" @if($paymentMethods['sberbank']['main'] ?? false) checked @endif value="sberbank" />
                            <span></span>
                        </label>

                    </div>

                    <label>Robokassa</label>
                    <div data-error="methods[robokassa]" class="input-group mb-10 method">

                        <input type="text" name="methods[robokassa][login]" class="form-control mr-5" placeholder="Идентификатор магазина" value="{{ $paymentMethods['robokassa']['params']['login'] ?? '' }}">
                        <input type="text" name="methods[robokassa][first_password]" class="form-control mr-5" placeholder="Пароль #1" value="{{ $paymentMethods['robokassa']['params']['first_password'] ?? '' }}">
                        <input type="text" name="methods[robokassa][second_password]" class="form-control mr-5" placeholder="Пароль #2" value="{{ $paymentMethods['robokassa']['params']['second_password'] ?? '' }}">

                        <label data-error="methods_main" class="custom_checkbox">
                            <input type="radio" class="not_default" name="methods_main" @if($paymentMethods['sberbank']['main'] ?? false) checked @endif value="robokassa" />
                            <span></span>
                        </label>

                    </div>

                </div>

                <div>
                    <button type="button" onclick="{{ $class }}.savePaymentMethods(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

