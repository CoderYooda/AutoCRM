@extends('shop.layout.app')

@section('title', $product->name)

@section('content')
<div class="body product_page" data-product="{{ json_encode($product) }}">

    @include('shop.includes.breadcrumbs')

    <div class="in-category container bg-white">
        <div class="product_title">
            <h2>{{ $product->name }}</h2>
            <h3>Производитель {{ $product->supplier->name }}</h3>
            <h3>Артикул {{ $product->article }}</h3>
        </div>

        <input type="hidden" name="product_id" value="{{ $product->id }}">

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
                    <span>Наличии</span>
{{--                    <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
                </div>

                <div class="flex-1 shop">
                    Адрес
                </div>

                <div class="flex-2 price">
                    <span>Цена</span>
{{--                    <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
                </div>

            </div>

            <div class="body">

                @foreach($product->stores as $store)

                    <div class="element" id="product_{{ $product->getHash($store->id) }}" data-store_id="{{ $store->id }}">
                        <div class="flex-1 availability">
                            @if($shop->show_amount)
                                {{ $product->getCountInStoreId($store->id) }} шт.
                            @else
                                {{ $product->getCountInStoreId($store->id) ? 'В Наличии' : 'Нет в Наличии' }}
                            @endif
                        </div>
                        <div class="flex-1 shop">{{ $shop->address_name }}</div>

                        <div class="flex-2 price">
                            @if(!$product->sp_stock)
                                <span class="current">{{ correct_price($product->getPrice()) }} ₽</span>
                            @else
                                <span class="current">{{ correct_price($product->getPriceWithDiscount()) }} ₽</span>
                                <span class="old">{{ correct_price($product->getPrice()) }} ₽</span>
                            @endif
                        </div>

                        <div class="absolute shipping-container">
                            @if($product->getCountInStoreId($store->id))
                                <div class="counter-container">
                                    <div class="button minus" onclick="cart.decrement(this, '{{ $product->getHash($store->id) }}');"></div>
                                    <input class="counter" data-max="{{ $product->getCountInStoreId($store->id) }}" value="{{ $cart->getProductCount($product->getHash($store->id)) }}" type="text" />
                                    <div class="button plus" onclick="cart.increment(this, '{{ $product->getHash($store->id) }}');"></div>
                                </div>
                                <div class="cart-button @if($cart->isProductExists($product->getHash($store->id))) incart @endif" onclick="cart.add(this, '{{ $product->getHash($store->id) }}');"></div>
                            @else
                                <div class="counter-container">
                                    &#8212;
                                </div>
                            @endif

                        </div>

                    </div>

                @endforeach

            </div>

        </div>

        <div class="analogue_list mt-20">
            {{--        @include('shop.includes.product_analogues')--}}
        </div>

    </div>
</div>
@endsection
