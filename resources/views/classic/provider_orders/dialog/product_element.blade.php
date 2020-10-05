<div class="element-item" id="product_selected_{{ $product->id }}">

    <input name="products[][id]" class="id_elem" value="{{ $product->id }}" type="hidden" />

    @isset($product->pivot->id)
        <input name="products[][pivot_id]" class="pivot_id_elem" value="{{ $product->pivot->id }}" type="hidden" />
    @endisset

    <div class="w-30 pl-10" title="{{ $product->name }}">{{ $product->name }}</div>
    <div class="w-15" title="{{ $product->article }}">{{ $product->article }}</div>
    <div class="w-10">
        <input name="products[][count]" onclick="this.select();"  class="form-control form-control-sm count_elem" value="{{ $request['count'] ?? $product->pivot->count ?? 1 }}" type="number" >
    </div>
    <div class="w-10">
        <input name="products[][price]" onclick="this.select();"  class="form-control form-control-sm price_elem" value="{{ $product->pivot->price ?? $product->getPrice() }}" type="number" min="0" step="0.1" >
    </div>
    <div class="w-10">
        <input name="products[][nds_percent]" class="form-control form-control-sm nds_percent_elem" value="{{$product->pivot->nds_percent ?? 20}}" disabled type="number" >
    </div>
    <div class="w-10">
        <input name="products[][nds]" class="form-control form-control-sm nds_elem" value="{{$product->pivot->nds ?? 0.00}}" disabled type="number" >
    </div>
    <div class="w-10">
        <input name="products[][total_price]" class="form-control form-control-sm total_elem" value="{{$product->pivot->total ?? 0.00}}" disabled type="number">
    </div>
    <div class="w-5 remove_button">
        @if(isset($request['refer']) || isset($provider_order))
            <div onclick="{{ $request['refer'] ?? $class }}.removeItem({{ $product->id }});"></div>
        @endif
    </div>
</div>
