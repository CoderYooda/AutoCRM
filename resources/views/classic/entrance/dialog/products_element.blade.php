@foreach($providerorder->articles()->get() as $product)
@php $class = 'entranceDialog' @endphp
<tr class="product_list_elem" id="product_selected_{{ $product->id }}">

    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <input name="products[{{ $product->id }}][price]" value="{{ $providerorder->getArticlePrice($product->id) }}" type="hidden" >

    <td title="{{ $product->name }}"><span class="product_list_element_name" style="width: 200px">{{ $product->name }}</span></td>
    <td><div class="compressed" style="width: 100px;"><a onclick="window.helper.copy('{{ $product->article }}');" >{{ $product->article }}</a></div></td>

    <td><input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm"
               @if($product->count != null) value="{{ $product->count }}" @elseif(isset($product->pivot->count)) value="{{$product->pivot->count}}"@else value="0" @endif
               type="number" ></td>
    <td>
        {{ $providerorder->getArticleEntredCount($product->id) }} / {{ $providerorder->getArticleCount($product->id) }}
    </td>
    <td>
        {{ $providerorder->getArticlePrice($product->id) }}
    </td>
    <td>
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
@endforeach
