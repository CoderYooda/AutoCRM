@foreach($stores as $store)
    <tr
        data-delivery_key="{{ $store['delivery_info']['id'] }}"
        data-name="{{ $store['delivery_info']['name'] }}"
        data-manufacturer="{{ $store['delivery_info']['manufacturer'] }}"
        data-price="{{ $store['delivery_info']['price'] }}">

        <td><div class="tree_image"></div></td>
        <td><span>{{ $store['name'] }}</span></td>
        <td><span>{{ $store['code'] }}</span></td>
        <td><span>{{ $store['days_min'] }} дн.</span></td>
        <td><span>{{ correct_price($store['price']) }} <i style="font-size: 20px;" class="fa fa-cart-plus pointer" onclick="store.addToCart(this)" aria-hidden="true"></i></span></td>
    </tr>
@endforeach
