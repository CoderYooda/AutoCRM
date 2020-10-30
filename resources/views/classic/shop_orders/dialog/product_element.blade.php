<div class="element-item"
     data-id="{{ $position->id }}"
     data-count="{{ $position->count }}"
     data-price="{{ decimal_price($position->price) }}"
     data-total="{{ decimal_price($position->count * $position->price) }}">

    <input type="hidden" name="products[{{ $position->id }}][name]" value="{{ $position->name }}">
    <input type="hidden" name="products[{{ $position->id }}][article]" value="{{ $position->article }}">
    <input type="hidden" name="products[{{ $position->id }}][manufacturer]" value="{{ $position->manufacturer }}">

    <div class="w-35 pl-10" title="{{ $position->name }}">{{ $position->name }}</div>
    <div class="w-10" title="{{ $position->article }}">{{ $position->article }}</div>
    <div class="w-20" title="{{ $position->manufacturer }}">{{ $position->manufacturer }}</div>
    <div class="w-10">
        @if($order->status == 0)
            <input type="text" class="form-control count_elem" name="products[{{ $position->id }}][count]" value="{{ $position->count }}">
        @else
            <span>{{ $position->count }}</span>
        @endif
    </div>
    <div class="w-10">
        @if($order->status == 0)
            <input type="text" class="form-control price_elem" name="products[{{ $position->id }}][price]" value="{{ $position->price }}">
        @else
            <span>{{ $position->price }}</span>
        @endif
    </div>
    <div class="w-10 total_elem">{{ correct_price($position->count * $position->price) }}</div>
    @if($order->status == 0)
        <div class="w-5 remove_button">
            <div onclick="{{ $request->refer ?? $class }}.removeProduct(this);"></div>
        </div>
    @endif

</div>
