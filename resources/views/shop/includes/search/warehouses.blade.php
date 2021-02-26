<div class="title">
    <h2>Результаты поиска по связке {{ request()->manufacturer }} & {{ request()->article }}</h2>
</div>

<div class="table">

    <input type="hidden" name="manufacturer" value="{{ request()->manufacturer }}">
    <input type="hidden" name="article" value="{{ request()->article }}">

    <div class="back" onclick="search.showProviderBrands(this);">
        <div class="arrow"></div>
        <span class="float-r">Назад</span>
    </div>

    @if($product)
    <div class="in-category container bg-white">
        <div class="product_title">
            <h2 class="d-flex">
                {{ $product->name }}
                @if($product->sp_stock)
                    <div class="discount">
                        Акция
                    </div>
                @endif
            </h2>
            <h3>Производитель {{ $product->supplier->name }}</h3>
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
                            <div class="param_desc"><span>{{ strlen($product->sp_desc) ? $product->sp_desc : 'Описание не указано' }}</span></div>
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
                        </div>
                    </div>

                </div>

            </div>

        @endif
    </div>
    @endif

    <div class="name">
        <p>На нашем складе</p>
        <p>Адрес: {{ $shop->address_name }}</p>
    </div>

    <div class="header">

        <div class="flex-1 manufacturer">
            <span>Производитель</span>
        </div>

        <div class="flex-1 article">
            <span>Артикул</span>
        </div>

        <div class="flex-1 availability">
            <span>В наличии</span>
        </div>
        <div class="flex-2 price">
            <span>Цена</span>
        </div>

    </div>

    <div class="body">

        @if($product)

            @foreach($product->stores as $store)

                <div class="element" id="product_{{ $product->getHash($store->id) }}" data-store_id="{{ $store->id }}">
                    <div class="flex-1 manufacturer">
                        <span>{{ $product->supplier->name }}</span>
                        {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                    </div>

                    <div class="flex-1 article">
                        <span>{{ $product->article }}</span>
                        {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                    </div>
                    <div class="flex-1 availability">
                        @if($shop->show_amount)
                            {{ $product->getCountInStoreId($store->id) }} шт.
                        @else
                            {{ $product->getCountInStoreId($store->id) ? 'В Наличии' : 'Нет в Наличии' }}
                        @endif
                    </div>
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
                <span>Нет предложений с нашего склада</span>
            </div>

        @endif

    </div>

</div>

@foreach($providersOrders as $provider_key => $orders)

    @continue(count($orders['originals']) == 0 && count($orders['analogues']) == 0)

    <div class="table {{ $provider_key }}" data-service="{{ $provider_key }}">

        <div class="title">
            <span>Склад {{ $loop->index + 1 }}</span>
        </div>

        @if(count($orders['originals']))

            <div class="header">

                <div class="flex-1 manufacturer">
                    <span>Производитель</span>
                    {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                </div>

                <div class="flex-1 article">
                    <span>Артикул</span>
                    {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                </div>

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

        @endif

        @if(count($orders['analogues']))

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

        @endif

    </div>

@endforeach
