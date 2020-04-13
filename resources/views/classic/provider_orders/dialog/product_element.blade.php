<tr class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span class="product_list_element_name" style="width: 200px">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;"><a onclick="window.helper.copy('{{ $product->article }}');" >{{ $product->article }}</a></div></td>
    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm"
               @if(isset($request['count']) && $request['count'] != null) value="{{ $request['count'] }}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="1" @endif
               type="number" ></td>
    <td><input onclick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm price_elem"
               @if(isset($product->pivot->count)) value="{{$product->pivot->price}}"@else value="0" @endif
               type="number" min="0" step="0.1" ></td>
    <td><input name="products[{{ $product->id }}][nds_percent]" class="form-control form-control-sm"
               @if(isset($product->pivot->count)) value="{{$product->pivot->nds_percent}}"@else value="20" @endif
               disabled type="number" ></td>
    <td><input name="products[{{ $product->id }}][nds]" class="form-control form-control-sm"
               @if(isset($product->pivot->count)) value="{{$product->pivot->nds}}"@else value="0.00" @endif
               disabled type="number" ></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->pivot->count)) value="{{$product->pivot->total}}"@else value="0.00" @endif
               disabled type="number"></td>
    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>

