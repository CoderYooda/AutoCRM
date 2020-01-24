<tr class="product_list_elem " id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td>
        @if(isset($product->instock))
            <span class="badge badge-pill @if($product->instock >= $product->count) success @else warn @endif pos-rlt text-sm mr-2">{{ $product->instock }}</span>
        @endif
    </td>
    <td title="{{ $product->name }}"><span class="product_list_element_name" style="width: 200px">{{ $product->name }}</span></td>

    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>

    <td>{{ $product->supplier()->first()->name }}</td>

    <td><input onClick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm"
               @if($request['count'] != null) value="{{$request['count']}}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               type="number" ></td>

    <td><input onClick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm"
               @if(isset($client_order)) value="{{ $product->pivot->price }}"  @else value="{{ $product->getMidPriceByStoreId(Auth::user()->getStoreFirst()->id, true) }}" @endif
               type="number" min="0" step="0.1" ></td>

    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->pivot->total)) value="{{ sprintf("%.2f", $product->pivot->total) }}" @else value="0.00" @endif
               disabled type="number"></td>

    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>

