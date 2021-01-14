<div id="article_{{ $product_id }}" class="position">

    <div class="pointer d-flex element" onclick="{{ $class }}.showEntrances(this, {{ $product_id }})">
        <div class="pl-10" style="width: 120px;">{{ $productAttributes['article'] }}</div>
        <div style="width: 180px;">{{ $productAttributes['manufacturer'] }}</div>
        <div style="width: 45%;">{{ $productAttributes['name'] }}</div>
        <div>
            <div class="d-flex pointer show-button">
                <i class="fa fa-angle-down fa-5" aria-hidden="true" style="margin: 0 auto; font-size: 18px;"></i>
            </div>
        </div>
    </div>

    @include(get_template() . '.adjustments.dialog.includes.product_element_inner')

</div>
