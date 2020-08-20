<tr
{{--    @dd(decimal_price($product->price))--}}

        data-id="{{ $product->id }}"
        data-count="@if($request['count'] != null) {{$request['count']}} @elseif(isset($product->count)) {{$product->count}} @else 0 @endif"
        data-price="@if(isset($shipment)) {{ decimal_price($product->price) }}  @else {{ 0 /* TODO RRC*/ }} @endif"
        data-total="@if(isset($product->total)) {{ decimal_price($product->total) }} @else 0.00 @endif"
        class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td title="{{ $product->name }}"><span style="max-width: 350px;" class="product_list_element_name">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm count_elem"
               @if($request['count'] != null) value="{{$request['count']}}" @elseif(isset($product->count)) value="{{$product->count}}" @else value="0" @endif
               type="number"  min="0" step="1" @if(isset($shipment) && $shipment->hasRelations()) disabled @endif></td>

    <td>
        {{ $product->getEntrancesCount() }}
    </td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][price]" class="form-control form-control-sm price_elem"
               @if(isset($shipment))
                    value="{{ decimal_price($product->price) }}"
               @else
                    value="{{ decimal_price($product->getPrice()) }}"
               @endif
               type="text"></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->total)) value="{{ decimal_price($product->total) }}"@else value="{{ $product->getPrice() }}" @endif
               disabled type="text"></td>
    <td>
        <button onclick="{{ $request['refer'] ?? $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
    </td>
</tr>
