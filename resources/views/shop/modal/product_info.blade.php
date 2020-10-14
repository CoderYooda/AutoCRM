<div style="padding: 40px;">
    <h3>{{ $product->name }}</h3>
    <div class="description">{{ $product->sp_desc }}</div>

    @if(count($product->specifications))
        <h3>Характеристики</h3>
        <div class="characteristics">
            @foreach($product->specifications as $specification)
                <div class="item">
                    <div class="key">{{ $specification->label }}</div>
                    <div class="value">{{ $specification->value }}</div>
                </div>
            @endforeach
        </div>
    @endif
</div>
