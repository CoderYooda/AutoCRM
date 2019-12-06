<tr class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span class="product_list_element_name" style="width: 230px">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->supplier()->first()->name }}</div></td>
    @if(!isset($adjustment))
    <td>
        <input class="form-control form-control-sm"
               @if(isset($product)) value="{{ $product->getCountInStoreId(2) }}"@else value="0" @endif
               type="number" disabled >
    </td>
    @else
        <td>
            <input class="form-control form-control-sm"
                   @if(isset($product)) value="{{$product->pivot->prev_count}}"@else value="0" @endif
                   type="number" disabled >
        </td>
    @endif

    <td><input onClick="this.select();" name="products[{{ $product->id }}][fact]" class="form-control form-control-sm"
               @if(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               type="number" ></td>
    <td><input onClick="this.select();"  class="form-control form-control-sm"
               @if(isset($product->pivot->prev_price)) value="{{$product->pivot->prev_price}}"@else value="0" @endif
               type="number" disabled ></td>
    <td><input onClick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm"
               @if(isset($product->pivot->count)) value="{{$product->pivot->price}}"@else value="0" @endif
               type="number" min="0" step="0.1" ></td>
    <td>
        @if(!isset($adjustment))
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
