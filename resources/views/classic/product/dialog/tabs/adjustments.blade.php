<div class="tab-pane adjustments w-100" id="{{ $class }}_tab_adjustments" data-simplebar style="max-height: 280px;">

    <h3 class="mt-0 mb-10">Список корректировок и поступлений</h3>

    <div class="header">
        <div class="header_item">Дата</div>
        <div class="header_item">Цена</div>
        <div class="header_item">Количество</div>
    </div>

    <div class="body" data-simplebar style="max-height: 124px;">

        <div class="entrance copy d-none">
            <div class="field">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
            <div class="field with_input">
                <input type="number" min="0" name="adjustment_entrances[new][price]" value="0">
            </div>
            <div class="field with_input">
                <input type="number" min="0" name="adjustment_entrances[new][count]" value="0">
            </div>
        </div>

        @foreach($adjustmentEntrances as $adjustmentEntrance)
            <div class="entrance">
                <div class="field">{{ \Carbon\Carbon::parse($adjustmentEntrance->created_at)->format('d.m.Y') }}</div>
                <div class="field with_input">
                    <input type="number" min="0" name="adjustment_entrances[{{ $adjustmentEntrance->id }}][price]" value="{{ $adjustmentEntrance->price }}">
                </div>
                <div class="field with_input">
                    <input type="number" min="0" name="adjustment_entrances[{{ $adjustmentEntrance->id }}][count]" value="{{ $adjustmentEntrance->count }}">
                </div>
            </div>
        @endforeach

    </div>

    <div class="add_button" onclick="{{ $class }}.addAdjustmentField(this);">
        Добавить корректирующую позицию
    </div>

</div>
