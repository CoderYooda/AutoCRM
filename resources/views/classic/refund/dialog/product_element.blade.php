<tr
    data-id="{{ $product->id }}"
    data-count="@if($request['count'] != null) {{$request['count']}} @elseif(isset($product->pivot->count)) {{$product->pivot->count}} @else 0 @endif"
    data-price="{{ $product->pivot->price }}"
    data-total="@if(isset($product->pivot->total)) {{ sprintf("%.2f", $product->pivot->total) }} @else 0.00 @endif"
    class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span style="max-width: 350px;" class="product_list_element_name">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm" value="{{ $product->pivot->count - ($refunded_count[$product->id] ?? 0) }}" type="number"  min="0" step="1" @if(isset($refund)) disabled @endif></td>
    <td><input onclick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm price_elem" value="{{ sprintf("%.2f", $product->pivot->price ?? 0.0) }}" type="number" min="0" step="0.1" disabled></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->pivot->total)) value="{{ sprintf("%.2f", $product->pivot->total) }}"@else value="0.00" @endif
               disabled type="number"></td>
    <td>


        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
