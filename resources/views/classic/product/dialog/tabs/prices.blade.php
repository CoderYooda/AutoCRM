<div data-simplebar class="tab-pane p-3 prices" id="{{ $class }}_tab_prices" style="max-height: 400px;">

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

    <div class="block">

        <label>Источник наценки на закупочную стоимость товара</label>

        <div class="form-group">
            <label>На все товары на складе (%)</label>
            <div class="input-group mb-3">
                <input type="number" min="0" class="form-control ml-0 markup_global" value="{{ decimal_price($globalMarkup) }}" disabled >

                <div class="markup_selector">
                    <label class="absolute custom_checkbox">
                        <input type="radio" class="not_default" onclick="{{ $class }}.recalculateMarkup();" name="markup_source" value="global" @if(!$product || $product->markup_source == 'global') checked @endif />
                        <span></span>
                    </label>
                </div>

            </div>
        </div>

        <div class="form-group">
            <label>На все товары в категории "<span class="category_name">{{ $category->name }}</span>" (%)</label>
            <div class="input-group mb-3">
                <input type="number" min="0" class="form-control ml-0 markup_category" value="{{ decimal_price($category->markup) }}" disabled >

                <div class="markup_selector">
                    <label class="absolute custom_checkbox">
                        <input type="radio" class="not_default" onclick="{{ $class }}.recalculateMarkup();" name="markup_source" value="category" @if($product && $product->markup_source == 'category') checked @endif />
                        <span></span>
                    </label>
                </div>

            </div>
        </div>

        <div class="form-group">
            <label>Только на этот товар (%)</label>
            <div class="input-group mb-3">
                <input type="number" min="0" name="markup" onkeyup="{{ $class }}.recalculateMarkup();" class="form-control ml-0 markup_product" value="{{ decimal_price($product->markup ?? 0) }}" >

                <div class="markup_selector">
                    <label class="absolute custom_checkbox">
                        <input type="radio" class="not_default" onclick="{{ $class }}.recalculateMarkup();" name="markup_source" value="product" @if($product && $product->markup_source == 'product') checked @endif />
                        <span></span>
                    </label>
                </div>

            </div>
        </div>

    </div>

    <div class="form-group">
        <label>Итоговая стоимость (руб.)</label>
        <div class="input-group mb-3">
            <input type="number" min="0" name="" class="form-control ml-0 total_markup" value="{{ decimal_price($product ? $product->getPrice() : 0) }}" disabled >
        </div>
    </div>

</div>
