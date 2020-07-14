@if(!isset($entrance_refund) && (!isset($refunded_count[$product->id]) || $refunded_count[$product->id] != $product->pivot->count) || isset($entrance_refund) && $entrance_refund->articles->find($product->id) != null)

    <tr
        data-id="{{ $product->id }}"
        data-count="{{ $product->pivot->count }}"
        data-price="{{ $product->pivot->price }}"
        data-total="{{ sprintf("%.2f", $product->pivot->total) }}"
        class="product_list_elem" id="product_selected_{{ $product->id }}">

        <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
        <td title="{{ $product->name }}"><span style="max-width: 350px;" class="product_list_element_name">{{ $product->name }}</span></td>
        <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>
        @if(isset($entrance_refund))
            <td>{{ $entrance_refund->articles->find($product->id)->pivot->count ?? 0 }}</td>
        @else
            <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm" value="{{ $product->pivot->count - ($refunded_count[$product->id] ?? 0) }}" type="number" min="1" step="1"></td>
        @endif
        <td>{{ ($refunded_count[$product->id] ?? 0) }} / {{ $product->pivot->count }}</td>
        <td id="product_price_{{ $product->id }}">{{ sprintf("%.2f", $product->pivot->price) }}</td>
        <td id="product_total_price_{{ $product->id }}">{{ sprintf("%.2f", (isset($entrance_refund) ? $entrance_refund->articles->find($product->id)->pivot->count : $product->pivot->count) * $product->pivot->price) }}</td>

        <td>
            @if(!isset($entrance_refund))
                <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
            @endif
        </td>
    </tr>
@endif
