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

    <td><input name="products[{{ $product->id }}][count]" class="form-control form-control-sm"
               @if($request['count'] != null) value="{{$request['count']}}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               type="number" ></td>

    <td><input name="products[{{ $product->id }}][price]" class="form-control form-control-sm"
               @if(isset($product->pivot->price)) value="{{$product->pivot->price}}"@else value="0" @endif
               type="number" min="0" step="0.1" ></td>

    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->pivot->total)) value="{{$product->pivot->total}}" @else value="0.00" @endif
               disabled type="number"></td>

    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>



{{--<tr style="@if(isset($product->complited) && $product->complited) background: #22b66e2e; @endif" class="product_list_elem" id="product_selected_{{ $product->product->id }}">--}}
    {{--<input name="products[{{ $product->store_id }}][{{ $product->product->id }}][id]" value="{{ $product->product->id }}" type="hidden" >--}}
    {{--<td>--}}
        {{--@if(isset($product->instock))--}}
            {{--<span class="badge badge-pill @if($product->instock >= $product->count) success @else warn @endif pos-rlt text-sm mr-2">{{ $product->instock }}</span>--}}
        {{--@endif--}}
    {{--</td>--}}
    {{--<td title="{{ $product->product->name }}"><span class="product_list_element_name">{{ $product->product->name }}</span></td>--}}
    {{--<td><div class="compressed" style="width: 100px;">{{ $product->product->article }}</div></td>--}}
    {{--<td>{{ $product->product->supplier()->first()->name }}</td>--}}
    {{--<td style="white-space: nowrap;">--}}
        {{--{{ \App\Http\Controllers\StoreController::getStoreNameById($product->store_id) }}--}}
    {{--</td>--}}
    {{--<td><input name="products[{{ $product->store_id }}][{{ $product->product->id }}][count]" class="form-control form-control-sm"--}}
               {{--@if(isset($product->count)) value="{{$product->count}}"@elseif($product->count) value="{{$product->count}}" @else value="0" @endif--}}
               {{--type="number"  min="0" step="1"></td>--}}
    {{--<td><input name="products[{{ $product->store_id }}][{{ $product->product->id }}][price]" class="form-control form-control-sm"--}}
               {{--@if(isset($product->count)) value="{{$product->price}}"@else value="0" @endif--}}
               {{--type="number" min="0" step="0.1" ></td>--}}
    {{--<td><input name="products[{{ $product->store_id }}][{{ $product->product->id }}][total_price]" class="form-control form-control-sm"--}}
               {{--@if(isset($product->count)) value="{{sprintf("%.2f", $product->total)}}"@else value="0.00" @endif--}}
               {{--disabled type="number"></td>--}}
    {{--<td class="text-right">--}}
        {{--@if(isset($request) && $request['refer'] != null)--}}
            {{--<button onclick="{{ $request['refer'] }}.removeItem({{ $product->store_id }}, {{ $product->product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>--}}
        {{--@else--}}
            {{--<button onclick="{{ $class }}.removeItem({{ $product->store_id }}, {{ $product->product->id }})" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>--}}
        {{--@endif--}}
    {{--</td>--}}
{{--</tr>--}}
