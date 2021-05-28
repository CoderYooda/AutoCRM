@forelse($stores as $store)

    <tr id="{{ $store['index'] }}">
        <td><div class="tree_image"></div></td>
        <td><span>{{ $store['rest'] }} шт.</span></td>
        <td><span>{{ $store['packing'] }} шт.</span></td>
        <td><span>{{ $store['delivery'] }}</span></td>
        <td style="width: 250px;">
            <div class="relative d-flex pr-10">

                <div class="flex-1">{{ correct_price($store['price']) }} руб.</div>

                <div class="flex-1 add-to-cart @if($store['count'] > 0) d-none @endif" style="width: 100px;">
                    <img class="pointer ml-15 absolute" style="top: 4px; right: 50px;" src="{{ asset('/images/icons/provider-cart-add.svg') }}" onclick="store.addToCart(this, {{ $store['packing'] }})" alt="">
                </div>

                <div class="flex-1 d-flex edit-cart-count @if($store['count'] < 1) d-none @endif" style="width: 100px;">
                    <button class="fa fa-minus pci left" onclick="store.decrementArticleCartAmount(this, {{ $store['packing'] }})" aria-hidden="true"></button>
                    <input class="provider-cart-input" type="text" disabled value="{{ $store['packing'] }}" />
                    <button class="fa fa-plus pci right" onclick="store.incrementArticleCartAmount(this, {{ $store['packing'] }})" aria-hidden="true"></button>
                </div>

            </div>
        </td>
    </tr>

@empty

    <tr>
        <td colspan="5">
            <div class="text-center">Результат запроса пуст.</div>
        </td>
    </tr>

@endforelse