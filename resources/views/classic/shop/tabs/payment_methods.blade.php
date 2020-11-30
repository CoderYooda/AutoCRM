{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-payment_methods" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdatePaymentMethods') }}" method="POST" class="w-50">

                <h2 class="mt-0 style_header">Способы оплаты</h2>

                <div class="methods mt-10">
                    <label>Tinkoff</label>
                    <div data-error="methods[tinkoff]" class="input-group mb-10 method">

                        <input type="text" name="methods[tinkoff][terminal_key]" class="form-control mr-5" placeholder="Ключ терминала" value="{{ $paymentMethods['tinkoff']['params']['terminal_key'] ?? '' }}">
                        <input type="text" name="methods[tinkoff][secret_key]" class="form-control mr-5" placeholder="Секретный ключ" value="{{ $paymentMethods['tinkoff']['params']['secret_key'] ?? '' }}">

                        <label data-error="methods_main" class="custom_checkbox">
                            <input type="radio" class="not_default" name="methods_main" @if($paymentMethods['tinkoff']['main'] ?? false) checked @endif value="tinkoff" />
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

