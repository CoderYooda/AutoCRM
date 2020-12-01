@foreach($providersOrders as $providerKey => $orders)

    <div class="table @if($loop->first) mt-0 @endif">

        <div class="name mt-0">
            Склад {{ $loop->index + 1 }}
        </div>

        <div class="header">

            <div class="flex-1 availability">
                <span>Наличии</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-1 price">
                <span>Срок поставки</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-2 shop">
                <span>Цена</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="originals">Оригинальные</div>

        </div>

        <div data-simplebar class="body" style="max-height: 300px;">

            @if($counts[$providerKey]['originals'])

                @foreach($orders as $order)

                    @continue($order['is_analogue'])

                    <div class="element" id="product_{{ $order['hash'] }}">

                        <div class="flex-1 availability">{{ $order['model']['hash_info']['rest'] }} шт.</div>
                        <div class="flex-1 shop">{{ $order['days_min'] }} дн.</div>
                        <div class="flex-2 price">
                            <span class="current">{{ correct_price($order['price']) }} ₽</span>
                        </div>

                        <div class="absolute shipping-container">
                            <div class="counter-container">
                                <div class="button minus" onclick="cart.decrement(this, '{{ $order['hash'] }}');"></div>
                                <input type="text" data-max="{{ $order['model']['hash_info']['rest'] }}" class="counter" value="{{ $cart->getProductCount($order['hash']) }}" />
                                <div class="button plus" onclick="cart.increment(this, '{{ $order['hash'] }}');"></div>
                            </div>
                            <div class="cart-button @if($cart->isProductExists($order['hash'])) incart @endif" onclick="cart.add(this, '{{ $order['hash'] }}');"></div>

                        </div>

                    </div>

                @endforeach

            @else

                <div class="empty_table">
                    <span>Нет предложений по этому поставщику</span>
                </div>

            @endif

        </div>

        <div class="header">

            <div class="flex-1 manufacturer">
                <span>Производитель</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-1 article">
                <span>Артикул</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-1 availability">
                <span>Наличии</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-1 price">
                <span>Срок поставки</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="flex-2 shop">
                <span>Цена</span>
                {{--                            <i class="fa fa-caret-down ml-10" aria-hidden="true"></i>--}}
            </div>

            <div class="analogues">Аналоги</div>

        </div>

        <div data-simplebar class="body" style="max-height: 300px;">

            @if($counts[$providerKey]['analogues'])

                @foreach($orders as $order)

                    @continue(!$order['is_analogue'])

                    <div class="element" id="product_{{ $order['hash'] }}">

                        <div class="flex-1 manufacturer">{{ $order['manufacturer'] }}</div>
                        <div class="flex-1 article">{{ $order['article'] }}</div>
                        <div class="flex-1 availability">{{ $order['model']['hash_info']['rest'] }} шт.</div>
                        <div class="flex-1 shop">{{ $order['days_min'] }} дн.</div>
                        <div class="flex-2 price">
                            <span class="current">{{ correct_price($order['price']) }} ₽</span>
                        </div>

                        <div class="absolute shipping-container">
                            <div class="counter-container">
                                <div class="button minus" onclick="cart.decrement(this, '{{ $order['hash'] }}');"></div>
                                <input type="text" data-max="{{ $order['model']['hash_info']['rest'] }}" class="counter" value="{{ $cart->getProductCount($order['hash']) }}" />
                                <div class="button plus" onclick="cart.increment(this, '{{ $order['hash'] }}');"></div>
                            </div>
                            <div class="cart-button @if($cart->isProductExists($order['hash'])) incart @endif" onclick="cart.add(this, '{{ $order['hash'] }}');"></div>

                        </div>

                    </div>

                @endforeach

            @else
                <div class="empty_table">
                    <span>Нет предложений по этому поставщику</span>
                </div>
            @endif

        </div>

    </div>

@endforeach
