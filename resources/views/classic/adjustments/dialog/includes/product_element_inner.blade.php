<div class="entrances d-none">

    <div class="children_header d-flex">
        <div class="pl-10" style="width: 40%">Дата</div>
        <div style="width: 30%">Цена</div>
        <div style="width: 20%">Количество</div>
        <div style="width: 10%"></div>
    </div>

    <div class="children_body">

        @foreach($articleAttributes['entrances'] as $entrance_id => $entrance)

            <div class="children_element d-flex">
                <div class="pl-10" style="width: 40%">{{ $entrance['created_at'] }}</div>
                <div style="width: 30%"><input type="text" name="products[{{ $article_id }}][{{ $entrance_id }}][price]" value="{{ $entrance['price'] }}"></div>
                <div style="width: 20%"><input type="text" name="products[{{ $article_id }}][{{ $entrance_id }}][count]" value="{{ $entrance['count'] - $entrance['released_count'] }}"></div>
                <div style="width: 10%"></div>
            </div>

        @endforeach

        <div id="new_correct_{{ $article_id }}" class="children_element d-flex d-none">
            <div class="pl-10" style="width: 40%">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
            <div style="width: 30%"><input type="text" name="products[{{ $article_id }}][new][price]" value="100" disabled></div>
            <div style="width: 20%"><input type="text" name="products[{{ $article_id }}][new][count]" value="1" disabled></div>
            <div style="width: 10%">
                <img src="{{ asset('/images/dialog/remove-element.svg') }}" onclick="{{ $class }}.removeField(this)" />
            </div>
        </div>

        <div class="children_button pointer" onclick="{{ $class }}.addField(this, {{ $article_id }})">Добавить корректирующую позицию</div>

    </div>
</div>
