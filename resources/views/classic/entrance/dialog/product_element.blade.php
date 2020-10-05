@php

    $index = $product->pivot->id;
    $price = $product->pivot->price;
    $entered_count = $providerorder->getArticleEnteredCountByPivotId($product->pivot->provider_pivot_id ?? $product->pivot->id);
    $total_count = $providerorder->getArticleCountByPivotId($product->pivot->provider_pivot_id ?? $product->pivot->id);
    $count = $providerorder ? $product->pivot->count : ($total_count - $entered_count);

@endphp

<tr
    data-id="{{ $product->id }}"
    data-count="{{ $count }}"
    data-price="{{ decimal_price($price) }}"
    class="product_list_elem" id="product_selected_{{ $product->id }}">

    <input name="products[{{ $index }}][id]" value="{{ $product->id }}" type="hidden" >

    <td title="{{ $product->name }}">
        <span style="max-width: 350px;" class="product_list_element_name">
            {{ $product->name }}
            @if($product->deleted_at)
                <i onclick="helper.restoreProduct(this, {{ $product->id }})" title="Этот продукт был удалён, нажмите для восстановления" class="fa fa-repeat ml-5 pointer" aria-hidden="true"></i>
            @endif
        </span>
    </td>

    <td><div class="compressed" style="width: 100px;">{{ $product->article }}</div></td>

    <td>
        @if(!isset($entrance))
            <input onclick="this.select();" name="products[{{ $index }}][count]" class="form-control form-control-sm count_elem" value="{{ $count }}" type="number"  min="0" step="1">
        @else
            {{ $count }}
        @endif
    </td>

    <td>{{ $entered_count }} / {{ $total_count }}</td>

    <td>{{ decimal_price($price * $count) }}</td>

    <td>
        @if(!isset($entrance))
            <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
