<div class="table">

    <input type="hidden" name="manufacturer" value="{{ request()->manufacturer }}">
    <input type="hidden" name="article" value="{{ request()->article }}">

    <div class="back" onclick="search.showProviderBrands(this);">
        <div class="arrow"></div>
        <span class="float-r">Назад</span>
    </div>

    <div class="name">
        На нашем складе
    </div>

    <div class="header">
        <div class="flex-1 availability">
            <span>В наличии</span>
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

        @if($product)

            @foreach($product->stores as $store)

                <div class="element" id="product_{{ $product->getHash($store->id) }}" data-store_id="{{ $store->id }}">
                    <div class="flex-1 availability">
                        @if($shop->show_amount)
                            {{ $product->getCountInStoreId($store->id) }} шт.
                        @else
                            {{ $product->getCountInStoreId($store->id) ? 'В Наличии' : 'Нет в Наличии' }}
                        @endif
                    </div>
                    <div class="flex-1 shop" title="{{ $shop->address_name }}">{{ $shop->address_name }}</div>

                    <div class="flex-2 price">
                        @if(!$product->sp_stock)
                            <span class="current">{{ correct_price($product->getPrice()) }} ₽</span>
                        @else
                            <span class="current">{{ correct_price($product->getPriceWithDiscount()) }} ₽</span>
                            <span class="old">{{ correct_price($product->getPrice()) }} ₽</span>
                        @endif
                    </div>

                    <div class="absolute shipping-container">
                        <div class="counter-container">
                            <div class="button minus" onclick="cart.decrement(this, '{{ $product->getHash($store->id) }}');"></div>
                            <input class="counter" value="{{ $cart->getProductCount($product->getHash($store->id)) }}" type="text" />
                            <div class="button plus" onclick="cart.increment(this, '{{ $product->getHash($store->id) }}');"></div>
                        </div>
                        <div class="cart-button @if($cart->isProductExists($product->getHash($store->id))) incart @endif" onclick="cart.add(this, '{{ $product->getHash($store->id) }}');"></div>
                    </div>

                </div>

            @endforeach

        @else

            <div class="empty_table">
                <span>Нет предложений с нешего склада</span>
            </div>

        @endif

    </div>

</div>

@foreach($providersOrders as $provider_key => $orders)

    <div class="table {{ $provider_key }}" data-service="{{ $provider_key }}">

        <div class="title">
            <span>Склад {{ $loop->index + 1 }}</span>
        </div>

        <div class="header">

            <div class="flex-1 availability pointer" onclick="search.sortBy(this, 'originals', 'rest');">
                <span>В наличии</span>
                <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
            </div>

            <div class="flex-1 price pointer" onclick="search.sortBy(this, 'originals', 'days_min');">
                <span>Срок поставки</span>
                <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
            </div>

            <div class="flex-2 shop pointer" onclick="search.sortBy(this, 'originals', 'price');">
                <span>Цена</span>
                <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
            </div>

            <div class="originals">Оригинальные</div>

        </div>

        @include('shop.includes.analogues_body', ['type' => 'originals'])

        <div class="header">

            <div class="flex-1 manufacturer">
                <span>Производитель</span>
                {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-1 article">
                <span>Артикул</span>
                {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-1 availability pointer" onclick="search.sortBy(this, 'analogues', 'rest');">
                <span>В наличии</span>
                <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
            </div>

            <div class="flex-1 price pointer" onclick="search.sortBy(this, 'analogues', 'days_min');">
                <span>Срок поставки</span>
                <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
            </div>

            <div class="flex-2 shop pointer" onclick="search.sortBy(this, 'analogues', 'price');">
                <span>Цена</span>
                <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
            </div>

            <div class="analogues">Аналоги</div>

        </div>

        @include('shop.includes.analogues_body', ['type' => 'analogues'])

    </div>

@endforeach
