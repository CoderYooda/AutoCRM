<tr class="product_list_elem"
    data-id="{{ $product->id }}"
    data-article="{{ $product->article }}"
    data-count="{{ $product->pivot->count }}"
    data-price="{{ $product->pivot->price }}"
    id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span class="product_list_element_name">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm"
               @if($request['count'] != null) value="{{$request['count']}}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}" @else value="0" @endif
               type="number"  min="0" step="1"></td>
    <td><input onclick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm price_elem"
               @if(isset($shipment)) value="{{ sprintf("%.2f", $product->pivot->price) }}"  @else value="{{ $product->getMidPriceByStoreId(Auth::user()->getStoreFirst()->id, true) }}" @endif
               type="number" min="0" step="0.1" ></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->pivot->total)) value="{{ sprintf("%.2f", $product->pivot->total) }}"@else value="0.00" @endif
               disabled type="number"></td>
    <td>
        <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
    </td>
</tr>
