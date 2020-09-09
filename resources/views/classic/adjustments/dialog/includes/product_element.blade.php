<div id="article_{{ $article_id }}" class="position">

    <div class="d-flex element">
        <div class="pl-10" style="width: 20%">{{ $article_id }}</div>
        <div style="width: 30%">{{ $articleAttributes['manufacturer'] }}</div>
        <div style="width: 40%">{{ $articleAttributes['name'] }}</div>
        <div style="width: 10%">
            <div class="d-flex pointer show-button" onclick="{{ $class }}.showEntrances(this, {{ $article_id }})">
                <i class="fa fa-angle-down fa-5" aria-hidden="true" style="margin: 0 auto; font-size: 18px;"></i>
            </div>
        </div>
    </div>

    @include(get_template() . '.adjustments.dialog.includes.product_element_inner')

</div>
