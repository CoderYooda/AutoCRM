<tr
    data-id="{{ $product->id }}"
    data-count="@if($request['count'] != null) {{$request['count']}} @elseif(isset($product->pivot->count)) {{$product->pivot->count}} @else 0 @endif"
    data-price="@if(isset($entrance)) {{ sprintf("%.2f", $product->pivot->price) }}  @else {{ 0 /* TODO RRC */ }} @endif"
    class="product_list_elem" id="product_selected_{{ $product->id }}">
    <input name="products[{{ $product->id }}][id]" value="{{ $product->id }}" type="hidden" >

    <td title="{{ $product->name }}">
        <span style="max-width: 350px;" class="product_list_element_name">
            {{ $product->name }}
            @if($product->deleted_at)
                <i onclick="helper.restoreProduct(this, {{ $product->id }})" title="Этот продукт был удалён, нажмите для восстановления" class="fa fa-repeat ml-5 pointer" aria-hidden="true"></i>
            @endif
        </span>
    </td>

    <td>
        <div class="compressed" style="width: 100px;">{{ $product->article }}</div>
    </td>

    <td>
        @if(!isset($entrance))
            <input onclick="this.select();" name="products[{{ $product->id }}][count]" class="form-control form-control-sm count_elem" value="{{ $product->pivot->count }}" type="number"  min="0" step="1">
        @else
            {{ $product->pivot->count }}
        @endif
    </td>

    <td>
        {{ $entrance->providerorder->getArticleEntredCount($product->id) }} / {{ $entrance->providerorder->getArticlesCountById($product->id) }}
    </td>

    <td>
        {{ sprintf("%.2f", $product->pivot->price * $product->pivot->count) }}
    </td>

    <td>
        @if(!isset($entrance))
        <button onclick="{{ $class }}.removeItem({{ $product->id }})" type="button" class="trash-button"><i class="fa fa-trash"></i></button>
        @endif
    </td>
</tr>
