<tr class="product_list_elem" id="product_selected_{{ $product->id }}_new">
    <input name="products[new][{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td>
        {{--<span class="badge badge-pill success pos-rlt text-sm mr-2">5</span>--}}
    </td>
    <td>
        <input class="w-100 form-control form-control-sm" type="text" name="products[new][{{ $product->id }}][name]" >
    </td>
    <td>
        <input class="w-100 form-control form-control-sm" type="text" name="products[new][{{ $product->id }}][article]" >
    </td>
    <td>
        <input class="w-100 form-control form-control-sm" type="text" name="products[new][{{ $product->id }}][new_supplier_name]">
    </td>
    {{--<td>--}}
        {{--<input name="" class="form-control form-control-sm j_count" type="number" disabled >--}}
    {{--</td>--}}
    <td>
        <input name="products[new][{{ $product->id }}][count]" class="form-control form-control-sm j_count"
               value="1"
               type="number" >
    </td>
    <td>
        <input name="products[new][{{ $product->id }}][price]" class="form-control form-control-sm j_price"
               value="0"
               type="number" min="1" step="0.1" >
    </td>
    <td>
        <input name="products[new][{{ $product->id }}][total_price]" class="form-control form-control-sm j_total_price"
               value="0.00"
               disabled type="number">
    </td>
    <td class="text-right">
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem('new','{{ $product->id }}')" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem('new','{{ $product->id }}')" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
