<div data-simplebar class="body {{ $type }}" style="max-height: 300px;">

    @forelse($orders[$type] as $order)

        <div class="element" id="product_{{ $order['hash'] }}" data-type="{{ $type }}">

            @if($type == 'analogues')
                <div class="flex-1 manufacturer">{{ $order['manufacturer'] }}</div>
                <div class="flex-1 article">{{ $order['article'] }}</div>
            @endif

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
