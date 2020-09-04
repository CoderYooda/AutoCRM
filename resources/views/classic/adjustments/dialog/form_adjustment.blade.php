@if(!isset($inner) || !$inner)
    <div id="adjustmentDialog{{$adjustment->id ?? ''}}" @isset($adjustment) data-id="{{ $adjustment->id }}" @endif class="dialog adjustment_dialog" style="width:500px;">
@endif
        <div class="titlebar">{{ isset($adjustment) ? ('Корректировка №' . $adjustment->id) : ('Новая корректировка') }}</div>
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
        <form onsubmit="{{ $class }}.save(this)" class="AdjustmentStoredListner" action="{{ route('StoreAdjustment') }}" method="POST">

            <div class="box-body">
                @csrf

                <input type="hidden" name="id" value="{{ $adjustment->id ?? '' }}">

                <div class="form-group w-100">
                    <button type="button" onclick="{{ $class }}.selectProduct()" name="product_id" class="form-control text-left button_select" @if($adjustment) disabled @endif>Выбор продукта</button>
                </div>

                <div data-simplebar class="w-100" style="height: 300px;">
                    <div id="table-list" class="d-flex flex-column w-100">
                        @if(count($articles))
                            @foreach($articles as $article_id => $articleAttributes)
                                @include(get_template() . '.adjustments.dialog.product_elements')
                            @endforeach
                        @endif
                    </div>
                </div>

            </div>

            <div class="modal-footer">

                <button class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>

                @if(!isset($adjustment))
                    <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
                    <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
                @endif

            </div>

            <div class="system_message">
            </div>

        </form>
        @if(!isset($inner) || !$inner)
    </div>
@endif
