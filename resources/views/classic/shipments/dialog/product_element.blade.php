<tr
{{--    @dd($product)--}}

        data-id="{{ $product->id }}"
        data-count="@if($request['count'] != null) {{$request['count']}} @elseif(isset($product->count)) {{$product->count}} @else 0 @endif"
        data-price="@if(isset($shipment)) {{ sprintf("%.2f", $product->price) }}  @else {{ 0 /* TODO RRC*/ }} @endif"
        data-total="@if(isset($product->total)) {{ sprintf("%.2f", $product->total) }} @else 0.00 @endif"
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
               @if(isset($shipment)) value="{{ sprintf("%.2f", $product->price) }}"  @else value="{{ $product->getPrice() }}" @endif
               type="number" min="0" step="0.1" @if(isset($shipment) && ($shipment->clientorder || $shipment->hasRelations())) disabled @endif ></td>
    <td><input name="products[{{ $product->id }}][total_price]" class="form-control form-control-sm"
               @if(isset($product->total)) value="{{ sprintf("%.2f", $product->total) }}"@else value="{{ $product->getPrice() }}" @endif
               disabled type="number"></td>
    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>


{{--<tr--}}
{{--    data-id="{{ $product->article_id }}"--}}
{{--    data-count="{{ $product->count }}"--}}
{{--    data-price="{{ sprintf("%.2f", $product->price) }}"--}}
{{--    data-total="{{ $product->total }}"--}}
{{--    class="product_list_elem" id="product_selected_{{ $product->article_id }}">--}}

{{--    <input name="products[{{ $product->article_id }}][id]" value="{{ $product->article_id }}" type="hidden" >--}}

{{--    <td title="{{ $product->name }}"><span style="max-width: 350px;" class="product_list_element_name">{{ $product->name }}</span></td>--}}

{{--    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>--}}

{{--    <td><input onclick="this.select();" name="products[{{ $product->article_id }}][count]" class="form-control form-control-sm count_elem" value="{{$product->count}}" type="number"  min="0" step="1" @if(isset($shipment) && $shipment->hasRelations()) disabled @endif></td>--}}

{{--    <td>{{ $product->getEntrancesCount() }}</td>--}}

{{--    <td><input onclick="this.select();" name="products[{{ $product->article_id }}][price]" class="form-control form-control-sm price_elem" value="{{ isset($shipment) ? sprintf("%.2f", $product->price) : $product->getPrice() }}" type="number" min="0" step="0.1" @if(isset($shipment) && ($shipment->clientorder || $shipment->hasRelations())) disabled @endif ></td>--}}

{{--    <td><input name="products[{{ $product->article_id }}][total_price]" class="form-control form-control-sm" value="{{ isset($shipment) ? sprintf("%.2f", $product->total) : $product->getPrice() }}"disabled type="number"></td>--}}

{{--    <td><button onclick="{{ $request['refer'] ?? $class }}.removeItem({{ $product->article_id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button></td>--}}
{{--</tr>--}}
