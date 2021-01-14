<tr class="product_list_elem " id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >

    <input name="products[{{ $product->id }}][price]" value="{{ $providerorder->getProductPrice($product->id) }}" type="hidden" >

    <td title="{{ $product->name }}"><span class="product_list_element_name">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->supplier()->first()->name }}</div></td>
    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm"
               @if($product->count != null) value="{{ $product->count }}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               type="number" ></td>
    <td>
        {{ $providerorder->getProductEntredCount($product->id) }} / {{ $providerorder->getProductCount($product->id) }}

    </td>

    <td>
        {{ $providerorder->getProductPrice($product->id) }}
    </td>
    {{--<td><input name="products[{{ $product->id }}][nds_percent]" class="form-control form-control-sm"--}}
               {{--@if(isset($product->pivot->count)) value="{{$product->pivot->nds_percent}}"@else value="20" @endif--}}
               {{--disabled type="number" ></td>--}}
    {{--<td><input name="products[{{ $product->id }}][nds]" class="form-control form-control-sm"--}}
               {{--@if(isset($product->pivot->count)) value="{{$product->pivot->nds}}"@else value="0.00" @endif--}}
               {{--disabled type="number" ></td>--}}
    {{--<td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"--}}
               {{--@if(isset($product->pivot->count)) value="{{$product->pivot->total}}" @else value="0.00" @endif--}}
               {{--disabled type="number"></td>--}}
    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
