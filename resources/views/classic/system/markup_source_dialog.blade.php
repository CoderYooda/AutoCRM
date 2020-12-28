<div id="markup_source_dialog" class="modal black-overlay fade" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">

            @isset($prices)
                @include(get_template() . '.system.includes.prices')
            @endisset

        </div>
    </div>
</div>
