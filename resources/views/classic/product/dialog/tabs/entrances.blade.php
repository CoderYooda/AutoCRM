<div class="tab-pane entrances" id="{{ $class }}_tab_entrances" data-simplebar style="max-height: 400px;">

    <h3 class="mt-0 mb-10">Список поступлений</h3>

    <div class="header">
        <div class="header_item">Дата</div>
        <div class="header_item">Цена</div>
        <div class="header_item">Количество</div>
    </div>

    <div data-simplebar class="body" style="max-height: 124px;">

        <div class="entrance copy d-none">
            <div class="field">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
            <div class="field with_input">
                <input type="number" min="0" name="entrances[new][price]" value="0">
            </div>
            <div class="field with_input">
                <input type="number" min="0" name="entrances[new][count]" value="0">
            </div>
        </div>

        @foreach($entrances as $entrance)
            <div class="entrance">
                <div class="field">{{ \Carbon\Carbon::parse($entrance->created_at)->format('d.m.Y') }}</div>
                <div class="field with_input">
                    <input type="number" min="0" name="entrances[{{ $entrance->id }}][price]" value="{{ $entrance->price }}">
                </div>
                <div class="field with_input">
                    <input type="number" min="0" name="entrances[{{ $entrance->id }}][count]" value="{{ $entrance->count }}">
                </div>
            </div>
        @endforeach

    </div>

    <div class="add_button" onclick="{{ $class }}.addAdjustmentField(this);">
        Добавить корректирующую позицию
    </div>

</div>
