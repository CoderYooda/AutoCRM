<tr
{{--    @dd(decimal_price($product->price))--}}

        data-id="{{ $product->id }}"
        data-count="{{ $product->count }}"
        data-price="{{ decimal_price($product->price) }}"
        data-total="{{ decimal_price($product->total) }}"
        class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span style="max-width: 350px;" class="product_list_element_name">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm count_elem" value="{{ $product->count }}" type="number"  min="0" step="1" @if(isset($shipment) && $shipment->hasRelations()) disabled @endif></td>

    <td>
        {{ $product->getEntrancesCount() }}
    </td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm price_elem" value="{{ decimal_price(isset($shipment) ? $product->price : $product->getPrice()) }}" type="text"></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm" value="{{ decimal_price(isset($shipment) ? $product->total : $product->getPrice()) }}" disabled type="text"></td>
    <td>
        <button onclick="{{ $request['refer'] ?? $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
    </td>
</tr>
