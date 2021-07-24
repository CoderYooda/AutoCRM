<div data-simplebar class="table_body" style="max-height: 200px;">

    @forelse($stores[$type] as $store)

        <div class="table_item" data-type="{{ $type }}" id="{{ $store['index'] }}">
            @if($type == 'analogues')
                <div class="item">{{ $store['manufacturer'] }}</div>
                <div class="item">{{ $store['article'] }}</div>
            @endif
            <div class="item">{{ $store['can_return'] }}</div>
            <div class="item">{{ $store['rest'] }} шт.</div>
            <div class="item">{{ $store['packing'] }} шт.</div>
            <div class="item">{{ $store['delivery'] }}</div>
            <div class="item mw-100">{{ correct_price($store['price']) }} руб.</div>
            <div class="item">
                <div class="add-to-cart @if($store['count'] > 0) d-none @endif" onclick="store.addToCart(this, {{ $store['packing'] }})">
                </div>
                <div class="edit-cart-count @if($store['count'] < 1) d-none @endif">
                    <button
                        class="fa fa-minus pci left"
                        onclick="store.decrementArticleCartAmount(this, {{ $store['packing'] }});"
                        aria-hidden="true"
                    >
                    </button>

                    <input
                        class="provider-cart-input"
                        type="text"
                        onkeyup="store.setArticleCartAmount(event.target)"
                        value="{{ $store['count'] }}"
                        min="0"
                    />

                    <button
                        class="fa fa-plus pci right"
                        onclick="store.incrementArticleCartAmount(this, {{ $store['packing'] }});"
                        aria-hidden="true">
                    </button>
                </div>
            </div>
        </div>

    @empty

        <div class="empty_table">Нет предложений</div>

    @endforelse

</div>
