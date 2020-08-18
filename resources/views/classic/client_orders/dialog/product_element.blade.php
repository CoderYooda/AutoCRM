
<tr class="product_list_elem @if(isset($client_order) && $product->pivot->shipped_count == $product->pivot->count) shipped @endif"
    id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td>
        @if(isset($product->instock))
            <span class="pos-rlt text-sm mr-2 no-wrap">{{ $product->instock }} шт.</span>
        @endif
    </td>
    <td title="{{ $product->name }}" style="max-width: 350px"><span class="product_list_element_name">{{ $product->name }}</span></td>

    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>
    @if($product->supplier)
    <td><span class="no-wrap">{{ $product->supplier->name }}</span></td>
    @endif
    <td><input onClick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm count_elem"
               @if($request['count'] != null) value="{{$request['count']}}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               @if(isset($client_order) && $client_order->status === 'canceled') disabled @endif
               type="number" ></td>

    <td><input name="products[{{ $product->id }}][shipped]" class="form-control form-control-sm "
               @if(isset($client_order)) value="{{ $product->pivot->shipped_count }}" @else value="0" @endif
               type="number" disabled></td>

    <td><input onClick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm price_elem"
               @if(isset($client_order) && $client_order->status === 'canceled') disabled @endif
               @if(isset($product->pivot->total)) value="{{ sprintf("%.2f", $product->pivot->price) }}"@else value="{{ $product->getPrice() }}" @endif
               type="number" min="0" step="0.1" @if(isset($client_order) && $client_order->getShippedCount($product->id) > 0) disabled  @endif></td>

    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->pivot->total)) value="{{ sprintf("%.2f", $product->pivot->total) }}" @else value="0.00" @endif
               disabled type="number"></td>
    <td>

{{--        @if(isset($client_order) && $client_order->getShippedCount($product->id) == 0)--}}
                <button onclick="{{ $request['refer'] ?? $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
{{--        @endif--}}
    </td>
</tr>

