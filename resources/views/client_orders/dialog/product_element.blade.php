<tr class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span class="product_list_element_name">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->supplier()->first()->name }}</div></td>
    <td><input name="products[{{ $product->id }}][count]" class="form-control form-control-sm j_count"
               @if(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               type="number" ></td>
    <td><input name="products[{{ $product->id }}][price]" class="form-control form-control-sm j_price"
               @if(isset($product->pivot->count)) value="{{$product->pivot->price}}"@else value="0" @endif
               type="number" min="0" step="0.1" ></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm j_total_price"
               @if(isset($product->pivot->count)) value="{{$product->pivot->total}}"@else value="0.00" @endif
               disabled type="number"></td>
    <td class="text-right">
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
