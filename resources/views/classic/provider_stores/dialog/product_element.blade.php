<div id="article_123" class="relative w-100 table-position">

    <div class="pointer w-100 d-flex table-element" style="padding-right: 30px;">
        <div class="pl-10" style="width: 90px;">{{ $order->data->hash_info->article }}</div>
        <div class="pl-10" style="width: 112px;">{{ $order->data->hash_info->manufacturer }}</div>
        <div class="pl-10 price_elem" style="width: 84px;">{{ correct_price($order->data->hash_info->price) }}</div>
        <div class="pl-10" style="width: 127px;">
            <input type="text" class="count_elem" name="orders[{{ $order->id }}][count]" value="{{ $order->count }}" />
        </div>
        <div class="pl-10 d-flex total_elem">{{ correct_price($order->data->hash_info->price * $order->count) }}</div>
    </div>

    <div class="delete_button absolute pointer" onclick="{{ $class }}.removeProduct(this, {{ $order->id }});">

    </div>

</div>
