

<tr class="product_list_elem" id="product_selected_{{ $product->product->id }}_{{ $product->store_id }}">
    <input name="products[{{ $product->store_id }}][{{ $product->product->id }}][id]" value="{{ $product->product->id }}" type="hidden" >
    <td title="{{ $product->product->name }}"><span class="product_list_element_name">{{ $product->product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->product->article }}</div></td>
    <td>
        {{ \App\Http\Controllers\StoreController::getStoreById($product->store_id)->name }}
    </td>
    <td><input name="products[{{ $product->store_id }}][{{ $product->product->id }}][count]" class="form-control form-control-sm"
               @if(isset($product->count)) value="{{$product->count}}"@elseif($product->count) value="{{$product->count}}" @else value="0" @endif
               type="number"  min="0" step="1"></td>
    <td><input name="products[{{ $product->store_id }}][{{ $product->product->id }}][price]" class="form-control form-control-sm"
               @if(isset($product->count)) value="{{$product->price}}"@else value="0" @endif
               type="number" min="0" step="0.1" ></td>
    <td><input name="products[{{ $product->store_id }}][{{ $product->product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->count)) value="{{$product->total}}"@else value="0.00" @endif
               disabled type="number"></td>
    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->store_id }}, {{ $product->product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->store_id }}, {{ $product->product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
