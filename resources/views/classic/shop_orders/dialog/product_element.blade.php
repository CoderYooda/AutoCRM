@php

    $price = $product->getPrice();
    $count = $product->getCount();

@endphp

<div class="element-item"
     data-id="{{ $product->id }}"
     data-count="{{ $count }}"
     data-price="{{ decimal_price($price) }}"
     data-total="{{ decimal_price($count * $price) }}">

    <div class="w-25 pl-10" title="{{ $product->name }}">{{ $product->name }}</div>
    <div class="w-10" title="{{ $product->article }}">{{ $product->article }}</div>
    <div class="w-20" title="{{ $product->supplier->name }}">{{ $product->supplier->name }}</div>
    <div class="w-10">
        @if($order->status == 0)
            <input type="text" class="form-control count_elem" name="products[{{ $product->id }}][count]" value="{{ $count }}">
        @else
            <span>{{ $count }}</span>
        @endif
    </div>
    <div class="w-10">{{ $product->getEntrancesCount() }}</div>
    <div class="w-10">
        @if($order->status == 0)
            <input type="text" class="form-control price_elem" name="products[{{ $product->id }}][price]" value="{{ $price }}">
        @else
            <span>{{ $price }}</span>
        @endif
    </div>
    <div class="w-10 total_elem">{{ correct_price($count * $price) }}</div>
    @if($order->status == 0)
        <div class="w-5 remove_button">
            <div onclick="{{ $request->refer ?? $class }}.removeProduct(this);"></div>
        </div>
    @endif
</div>
