@foreach($stores as $store)

    <tr id="{{ $store['index'] }}">
        <td><div class="tree_image"></div></td>
        <td><span>{{ $store['name'] }}</span></td>
        <td><span>{{ $store['code'] }}</span></td>
        <td><span>{{ $store['days_min'] }} дн.</span></td>
        <td style="width: 200px;">
            <div class="relative d-flex pr-10">

                <div class="flex-1">{{ correct_price($store['price']) }}</div>

                <div class="flex-1 add-to-cart @if($store['count'] > 0) d-none @endif" style="width: 100px;">
                    <img class="pointer ml-15 absolute" style="top: 4px; right: 50px;" src="{{ asset('/images/icons/provider-cart-add.svg') }}" onclick="store.addToCart(this)" alt="">
                </div>

                <div class="flex-1 d-flex edit-cart-count @if($store['count'] < 1) d-none @endif" style="width: 100px;">
                    <button class="fa fa-minus pci left" onclick="store.decrementArticleCartAmount(this)" aria-hidden="true"></button>
                    <input class="provider-cart-input" onchange="store.setArticleCartAmount(this)" type="text" value="{{ $store['count'] }}" />
                    <button class="fa fa-plus pci right" onclick="store.incrementArticleCartAmount(this)" aria-hidden="true"></button>
                </div>

            </div>
        </td>
    </tr>
@endforeach
