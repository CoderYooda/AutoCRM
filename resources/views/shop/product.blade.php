@extends('shop.layout.app')

@section('content')
<div class="body product_page" data-providers="{{ json_encode($providersOrders) }}" data-product="{{ json_encode($product) }}">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="product_title">
            <h2>{{ $product->name }}</h2>
            <h3>Артикул {{ $product->article }}</h3>
        </div>

        @if($product->image != null || strlen($product->sp_desc) || count($product->specifications))

            <div class="in-category-container">

                <div class="product_info w-100 d-flex">

                    <div class="flex-1 photo">
                        <img class="w-100 h-100" src="{{ $product->image_path }}" title="{{ $product->name }}" alt="{{ $product->name }}" />
                    </div>

                    <div class="flex-2 description">
                        <div class="relative"> {{-- is-full --}}
                            <div class="param_title">Описание</div>
                            <div class="param_desc">{{ strlen($product->sp_desc) ? $product->sp_desc : 'Описание не указано' }}</div>
                            <span class="show pointer" onclick="product.showFullText(this);">...</span>
                        </div>
                    </div>

                    <div class="flex-2 specifications">
                        <div class="relative"> {{-- is-full --}}
                            <div class="param_title">Характеристики</div>
                            <div class="specifications_table">
                                @forelse($product->specifications as $specification)

                                    <div class="specification_element">
                                        <div class="flex-1">{{ $specification->label }}</div>
                                        <div class="flex-1">{{ $specification->value }}</div>
                                    </div>

                                @empty

                                    Характеристики не указаны

                                @endforelse
                            </div>
                            <span class="show pointer" onclick="product.showFullText(this);">...</span>
                        </div>
                    </div>

                </div>

            </div>

        @endif

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

                <div class="flex-1 shop">
                    Магазин
                </div>

                <div class="flex-2 price">
                    <span>Цена</span>
                    <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>
                </div>

            </div>

            <div class="body">

                @foreach($product->stores as $store)

                    <div class="element" id="product_{{ $product->getHash($store->id) }}" data-store_id="{{ $store->id }}">
                        <div class="flex-1 availability">{{ $product->getCountInStoreId($store->id) }} шт.</div>
                        <div class="flex-1 shop">{{ $store->name }}</div>

                        <div class="flex-2 price">
                            <span class="current">{{ correct_price($store->pivot->retail_price) }} ₽</span>
    {{--                        <span class="old">150 000 ₽</span>--}}
                        </div>

                        <div class="absolute shipping-container">
                            @if($product->getCountInStoreId($store->id))
                                <div class="counter-container">
                                    <div class="button minus" onclick="cart.decrement(this, '{{ $product->getHash($store->id) }}');"></div>
                                    <input class="counter" value="{{ $cart->getProductCount($product->getHash($store->id)) }}" type="text" />
                                    <div class="button plus" onclick="cart.increment(this, '{{ $product->getHash($store->id) }}');"></div>
                                </div>
                                <div class="cart-button @if($cart->isProductExists($product->getHash($store->id))) incart @endif" onclick="cart.add(this, '{{ $product->getHash($store->id) }}');"></div>
                            @else
                                <div class="counter-container">
                                    Нет в наличие
                                </div>
                            @endif

                        </div>

                    </div>

                @endforeach

            </div>

        </div>

        @foreach($providersOrders as $providerKey => $orders)

            <div class="table">

                <div class="name">
                    {{ $providerKey }}
                </div>

                <div class="header">
                    <div class="flex-1 availability">
                        <span>Наличие</span>
                        <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>
                    </div>

                    <div class="flex-1 price">
                        <span>Срок поставки</span>
                        <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>
                    </div>

                    <div class="flex-2 shop">
                        <span>Цена</span>
                        <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>
                    </div>

                </div>

                <div data-simplebar class="body" style="max-height: 300px;">

                    @forelse($orders as $order)

                        <div class="element" id="product_{{ $order['hash'] }}">

                            <div class="flex-1 availability">{{ $order['model']['hash_info']['rest'] }} шт.</div>
                            <div class="flex-1 shop">{{ $order['days_min'] }} дн.</div>
                            <div class="flex-2 price">
                                <span class="current">{{ correct_price($order['price']) }} ₽</span>
                            </div>

                            <div class="absolute shipping-container">
                                <div class="counter-container">
                                    <div class="button minus" onclick="cart.decrement(this, '{{ $order['hash'] }}');"></div>
                                    <input type="text" class="counter" value="{{ $cart->getProductCount($order['hash']) }}" />
                                    <div class="button plus" onclick="cart.increment(this, '{{ $order['hash'] }}');"></div>
                                </div>
                                <div class="cart-button @if($cart->isProductExists($order['hash'])) incart @endif" onclick="cart.add(this, '{{ $order['hash'] }}');"></div>

                            </div>

                        </div>

                    @empty

                        <div class="empty_table">
                            <span>Нет предложений по этому поставщику</span>
                        </div>

                    @endforelse

                </div>

            </div>

        @endforeach

    </div>
</div>
@endsection
