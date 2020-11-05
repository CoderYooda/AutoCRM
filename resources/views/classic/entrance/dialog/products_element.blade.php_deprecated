@foreach($providerorder->articles as $product)

    @php

        $index = $product->pivot->id;
        $price = $product->pivot->price ?? $providerorder->getArticlePrice($product->id);
        $entered_count = $providerorder->getArticleEnteredCountByPivotId($product->pivot->id);
        $total_count = $product->pivot->count;
        $valid_count = $total_count - $entered_count;

    @endphp

    @if($valid_count > 0)
        <tr class="product_list_elem" id="product_selected_{{ $product->id }}">
            <input name="products[{{ $index }}][id]" value="{{ $product->id }}" type="hidden" >
            <input name="products[{{ $index }}][price]" value="{{ $price }}" type="hidden" >

            <td title="{{ $product->name }}"><span class="product_list_element_name" style="width: 200px">{{ $product->name }}</span></td>

            <td><div class="compressed" style="width: 100px;"><a onclick="window.helper.copy('{{ $product->article }}');" >{{ $product->article }}</a></div></td>
            <td><input onclick="this.select();" name="products[{{ $index }}][count]" class="form-control form-control-sm" value="{{ $valid_count }}" type="number" ></td>
            <td>{{ $entered_count }} / {{ $total_count }}</td>
            <td>{{ $price }}</td>
            <td><button onclick="{{ $request['refer'] ?? $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button></td>
        </tr>
    @endif

@endforeach
