<tr class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="quick_products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >
    <td>
        <input class="w-100 form-control form-control-sm" type="text" name="quick_products[{{ $product->id }}][name]" >
    </td>
    <td>
        <input class="w-100 form-control form-control-sm" type="text" name="quick_products[{{ $product->id }}][article]" >
    </td>
    <td>
        <input class="w-100 form-control form-control-sm" type="text" name="quick_products[{{ $product->id }}][new_supplier_name]">
    </td>
    <td>
        <input name="quick_products[{{ $product->id }}][count]" class="form-control form-control-sm j_count"
               value="1"
               type="number" >
    </td>
    <td>
        <input name="quick_products[{{ $product->id }}][price]" class="form-control form-control-sm j_price"
               value="0"
               type="number" min="0" step="0.1" >
    </td>
    <td>
        <input name="quick_products[{{ $product->id }}][total_price]" class="form-control form-control-sm j_total_price"
               value="0.00"
               disabled type="number">
    </td>
    <td class="text-right">
        @if(isset($request) && $request['refer'] != null)
            <button onclick="{{ $request['refer'] }}.removeItem('{{ $product->id }}')" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @else
            <button onclick="{{ $class }}.removeItem('{{ $product->id }}')" type="button" class="btn btn-sm white"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
