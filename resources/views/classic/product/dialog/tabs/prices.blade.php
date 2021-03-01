<div class="tab-pane p-3 prices" id="{{ $class }}_tab_prices" style="max-height: 600px;">

    <div class="form-group @if($priceSource != 'purchase') d-none @endif">
        @foreach($stores as $store)
            <label>Закупочная цена (руб.)</label>
            <div class="input-group mb-3">
                <input type="number" min="0" onkeyup="{{ $class }}.recalculateMarkup();" name="storage[{{ $store->id }}][retail_price]" class="form-control ml-0" value="@if($product){{ decimal_price($product->stores->find($store->id)->pivot->retail_price ?? '0') }}@endif" >
            </div>
        @endforeach
    </div>

    <div class="form-group @if($priceSource == 'purchase') d-none @endif">
        <label>Закупочная цена последнего поступления этого товара (руб.)</label>
        <div class="input-group mb-3">
            <input type="number" name="last_entrance_price" class="form-control ml-0" value="{{ decimal_price($lastEntrancePrice) }}" disabled >
        </div>
    </div>

    <div class="form-group">

        <label>Источник формирования цены</label>

        <div class="input-group">
            <select custom_select name="price_id" onchange="{{ $class }}.recalculateMarkup();">
                @foreach($prices as $price)
                    <option value="{{ $price->id }}" @if($price->id === $product->price_id) selected @endif>{{ $price->name }}</option>
                @endforeach
            </select>
        </div>

    </div>

    <div class="form-group">
        <label>Итоговая стоимость (руб.)</label>
        <div class="input-group mb-3">
            <input type="number" min="0" name="" class="form-control ml-0 total_markup" value="{{ decimal_price($product ? $product->getPrice() : 0) }}" disabled >
        </div>
    </div>

</div>
