<div class="tab-pane entrances" id="{{ $class }}_tab_entrances" data-simplebar style="max-height: 400px;">

    <h3 class="mt-0 mb-10">Список поступлений</h3>

    <div class="header">
        <div class="header_item">Дата</div>
        <div class="header_item">Цена</div>
        <div class="header_item">Количество</div>
    </div>

    <div data-simplebar class="body" style="max-height: 124px;">

        @forelse($entrances as $entrance)
            <div class="entrance">
                <div class="field">{{ $entrance->created_at->format('d.m.Y') }}</div>
                <div class="field with_input">
                    <input type="number" min="0" name="entrances[{{ $entrance->id }}][price]" value="{{ $entrance->pivot->price }}">
                </div>
                <div class="field with_input">
                    <input type="number" min="0" name="entrances[{{ $entrance->id }}][count]" value="{{ $entrance->pivot->count }}">
                </div>
            </div>

        @empty

            <div class="empty_table">
                Список поступлений пуст
            </div>

        @endforelse

    </div>

</div>
