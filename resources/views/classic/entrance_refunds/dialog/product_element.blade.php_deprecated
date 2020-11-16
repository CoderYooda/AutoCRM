@if(!isset($entrance_refund) && $available_count[$product->id] || isset($entrance_refund) && $entrance_refund->articles->find($product->id) != null)

    <tr
        data-id="{{ $product->id }}"
        data-count="{{ isset($entrance_refund) ? $entrance_refund->articles->find($product->id)->pivot->count : $available_count[$product->id] }}"
        data-price="{{ decimal_price($product->pivot->price) }}"
        data-total="{{ decimal_price("%.2f", $product->pivot->total) }}"
        class="product_list_elem" id="product_selected_{{ $product->id }}">

        <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
        <td title="{{ $product->name }}"><span style="max-width: 350px;" class="product_list_element_name">{{ $product->name }}</span></td>
        <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>
        <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm" value="{{ isset($entrance_refund) ? $entrance_refund->articles->find($product->id)->pivot->count : $available_count[$product->id] }}" type="number" min="1" step="1"></td>
        <td>{{ $product->pivot->released_count }} / {{ $product->pivot->count }}</td>
        <td id="product_price_{{ $product->id }}">{{ decimal_price($product->pivot->price) }}</td>
        <td id="product_total_price_{{ $product->id }}">{{ decimal_price(($available_count[$product->id] ?? $product->pivot->count) * $product->pivot->price) }}</td>

        <td>
            @if(!isset($entrance_refund))
                <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
            @endif
        </td>
    </tr>
@endif
